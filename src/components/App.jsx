import { useState, useEffect } from 'react';

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

export default function App() {
  const [searchText, setSearchText] = useState('');
  const [page, setPage] = useState(1);
  const [images, setImages] = useState([]);
  const [status, setStatus] = useState(Status.IDLE);
  const [totalHits, setTotalHits] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [tags, setTags] = useState('');
  const [largeImageURL, setLargeImageURL] = useState('');

  const handleFormSubmit = newSearchText => {
    if (searchText === newSearchText) {
      return toast.warn('We have already found this result');
    }
    setSearchText(newSearchText);
    setPage(1);
    setImages([]);
    setStatus(Status.IDLE);
    setTotalHits(null);
  };

  const loadMore = () => {
    setPage(pages => pages + 1);
  };

  useEffect(() => {
    if (!searchText) {
      return;
    }
    const markupGallery = async () => {
      setStatus(Status.PENDING);
      setIsLoading(false);

      try {
        const { hits, totalHits } = await Api(searchText, page);

        if (totalHits === 0) {
          setStatus(Status.IDLE);
          return toast.warn('No images on your query!');
        }

        const newImages = result(hits);

        if (page >= 2) {
          return setImages(images => [...images, ...newImages], totalHits);
        }
        setImages(newImages);
        setStatus(Status.RESOLVED);
        setTotalHits(totalHits);
      } catch (error) {
        setStatus(Status.REJECTED);
        toast.error('This is an error!');
      } finally {
        setIsLoading(false);
        setStatus(Status.IDLE);
      }
    };
    markupGallery();
  }, [page, searchText]);

  const isShowButtonLoadMore = () => {
    const ShowBtn = totalHits - page * 12;
    /* console.log(ShowBtn);*/
    if (ShowBtn > 0) {
      return !isLoading;
    }
    return false;
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const openModal = (largeImageURL, tags) => {
    toggleModal();
    setTags(tags);
    setLargeImageURL(largeImageURL);
  };

  const result = data => {
    return data.map(({ id, tags, largeImageURL, webformatURL }) => ({
      id,
      tags,
      largeImageURL,
      webformatURL,
    }));
  };

  return (
    <div className={css.app}>
      {isLoading && <Loader />}
      <Searchbar onSubmit={handleFormSubmit} />
      {images.length > 0 && (
        <ImageGallery images={images} openModal={openModal}></ImageGallery>
      )}
      {status === 'pending' && <Loader />}
      {isShowButtonLoadMore() && <Button onLoadMore={loadMore}></Button>}
      {showModal && (
        <Modal
          onModalClick={toggleModal}
          largeImageURL={largeImageURL}
          tags={tags}
        />
      )}
      <ToastContainer position="top-center" autoClose={2500} theme="colored" />
    </div>
  );
}
