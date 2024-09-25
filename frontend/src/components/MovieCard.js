import React from 'react';

const MovieCard = ({ movie, onClick }) => {
  return (
    <div className="movie-card" onClick={() => onClick(movie)}>
      <img src={`${movie.image}`} alt={movie.name} />
      <h3>{movie.name}</h3>
      <p>{movie.year}</p>
    </div>
  );
};

export default MovieCard;