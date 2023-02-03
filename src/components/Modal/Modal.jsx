import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import css from './Modal.module.css';

const modal = document.querySelector('#modal-root');

export default function Modal({ onModalClick, largeImageURL, tags }) {
  useEffect(() => {
    const onEscClick = e => {
      if (e.code === 'Escape') {
        onModalClick();
      }
    };
    window.addEventListener('keydown', onEscClick);

    return () => {
      window.removeEventListener('keydown', onEscClick);
    };
  }, [onModalClick]);

  const onOverleyClick = e => {
    if (e.target === e.currentTarget) {
      onModalClick();
    }
  };

  return createPortal(
    <div className={css.overlay} onClick={onOverleyClick}>
      <div className={css.modal}>
        <img src={largeImageURL} alt={tags} loading="lazy" />
      </div>
    </div>,
    modal
  );
}

Modal.propTypes = {
  largeImageURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  onModalClick: PropTypes.func.isRequired,
};
