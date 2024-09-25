import React from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root');

const MovieModal = ({ movie, isOpen, onClose }) => {
  return (
    <Modal isOpen={isOpen} onRequestClose={onClose} contentLabel="Movie Details" className="movie-modal" overlayClassName="overlay">
      <button className="close-btn" onClick={onClose}>X</button>
      {movie && (
        <div className="modal-content">
          <img src={`${movie.image}`} alt={movie.name} className="modal-image" />
          <div className="modal-details">
            <h2>{movie.name}</h2>
            <p>{movie.time} min {movie.year}</p>
            <p>{movie.introduce}</p>
            <button className="play-btn">▶ Play Movie</button>
          </div>
        </div>
      )}
    </Modal>
  );
};

export default MovieModal;
