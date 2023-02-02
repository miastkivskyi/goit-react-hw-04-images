import React from 'react';
import PropTypes from 'prop-types';

import css from './Modal.module.css';

class Modal extends React.Component {
  static propTypes = {
    largeImageURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
    onModalClick: PropTypes.func.isRequired,
  };
  componentDidMount() {
    window.addEventListener('keydown', this.onEscClick);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.onEscClick);
  }

  onEscClick = e => {
    if (e.code === 'Escape') {
      this.props.onModalClick();
    }
  };

  onOverleyClick = e => {
    if (e.target === e.currentTarget) {
      this.props.onModalClick();
    }
  };

  render() {
    const { largeImageURL, tags } = this.props;
    return (
      <div className={css.overlay} onClick={this.onOverleyClick}>
        <div className={css.modal}>
          <img src={largeImageURL} alt={tags} />
        </div>
      </div>
    );
  }
}

export default Modal;
