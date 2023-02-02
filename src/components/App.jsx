import React from 'react';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import ImageGallery from './ImageGallery/ImageGallery';
import Searchbar from './Searchbar/Searchbar';
import Loader from './Loader/Loader';
import Button from './Button/Button';
import Modal from './Modal/Modal';

import { Api } from '../services/api';
import css from './App.module.css';

const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

class App extends React.Component {
  state = {
    searchText: '',
    page: 1,
    images: [],
    error: null,
    status: Status.IDLE,
    totalHits: null,
    isLoading: false,
  };

  handleFormSubmit = searchText => {
    this.setState({
      searchText,
      page: 1,
      images: [],
      status: Status.IDLE,
      totalHits: null,
    });
  };

  loadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  componentDidUpdate(prevProps, prevState) {
    const prevName = prevState.searchText;
    const nextName = this.state.searchText;
    const prevPage = prevState.page;
    const nextPage = this.state.page;

    if (prevName !== nextName || prevPage !== nextPage) {
      this.markupGallery();
    }
  }

  markupGallery = async () => {
    const { searchText, page } = this.state;
    this.setState({ isLoading: false, status: Status.PENDING });
    try {
      const { hits, totalHits } = await Api(searchText, page);

      if (totalHits === 0) {
        this.setState({ status: Status.IDLE });
        return toast.warn('No images on your query!');
      }

      const newImages = this.result(hits);

      if (page >= 2) {
        return this.setState(({ images }) => ({
          images: [...images, ...newImages],
          totalHits,
        }));
      }

      this.setState({
        status: Status.RESOLVED,
        images: newImages,
        totalHits: totalHits,
      });
    } catch (error) {
      this.setState({ error, status: Status.REJECTED });
      toast.error('This is an error!');
    } finally {
      this.setState({ isLoading: false, status: Status.IDLE });
    }
  };

  isShowButtonLoadMore = () => {
    const ShowBtn = this.state.totalHits - this.state.page * 12;
    /* console.log(ShowBtn);*/
    if (ShowBtn > 0) {
      return !this.state.isLoading;
    }
    return false;
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  openModal = (largeImageURL, tags) => {
    this.toggleModal();
    this.setState({
      largeImageURL,
      tags,
    });
  };

  result = data => {
    return data.map(({ id, tags, largeImageURL, webformatURL }) => ({
      id,
      tags,
      largeImageURL,
      webformatURL,
    }));
  };

  render() {
    const { images, status, largeImageURL, tags, showModal, isLoading } =
      this.state;
    return (
      <div className={css.app}>
        {isLoading && <Loader />}
        <Searchbar onSubmit={this.handleFormSubmit} />
        {images.length > 0 && (
          <ImageGallery
            images={images}
            openModal={this.openModal}
          ></ImageGallery>
        )}
        {status === 'pending' && <Loader />}
        {this.isShowButtonLoadMore() && (
          <Button onLoadMore={this.loadMore}></Button>
        )}
        {showModal && (
          <Modal
            onModalClick={this.toggleModal}
            largeImageURL={largeImageURL}
            tags={tags}
          />
        )}
        <ToastContainer
          position="top-center"
          autoClose={2500}
          theme="colored"
        />
      </div>
    );
  }
}

export default App;
