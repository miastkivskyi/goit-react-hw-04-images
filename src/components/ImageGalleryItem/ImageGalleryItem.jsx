import css from './ImageGalleryItem.module.css';
import PropTypes from 'prop-types';

const ImageGalleryItem = ({ tags, webformatURL, largeImageURL, openModal }) => {
  return (
    <li className={css.galleryItem}>
      <img
        className={css.galleryItem__image}
        src={webformatURL}
        onClick={() => openModal(largeImageURL, tags)}
        alt={tags}
      />
    </li>
  );
};

ImageGalleryItem.propTypes = {
  tags: PropTypes.string.isRequired,
  webformatURL: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  openModal: PropTypes.func.isRequired,
};

export default ImageGalleryItem;
