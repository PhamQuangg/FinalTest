import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MovieCard from '../components/MovieCard';
import MovieModal from '../components/MovieModal';

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const moviesPerPage = 4;

  // Lấy dữ liệu phim từ API
  useEffect(() => {
    const fetchMovies = async () => {
      const res = await axios.get('http://localhost:8080/api/movies');
      setMovies(res.data);
    };
    fetchMovies();
  }, []);

  // Tính số trang
  const totalPages = Math.ceil(movies.length / moviesPerPage);
  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const startIndex = (currentPage - 1) * moviesPerPage;
  const displayedMovies = movies.slice(startIndex, startIndex + moviesPerPage);

  // Hiển thị pop-up khi click vào phim
  const openModal = (movie) => {
    setSelectedMovie(movie);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setSelectedMovie(null);
    setModalIsOpen(false);
  };

  return (
    <div className="home-page">
      <h1>Danh sách phim</h1>
      <div className="movie-grid">
        {displayedMovies.map((movie) => (
          <MovieCard key={movie._id} movie={movie} onClick={openModal} />
        ))}
      </div>
      <div className="pagination">
        {currentPage > 1 && <button onClick={handlePrev}>Previous</button>}
        {currentPage < totalPages && <button onClick={handleNext}>Next</button>}
      </div>
      <MovieModal movie={selectedMovie} isOpen={modalIsOpen} onClose={closeModal} />
    </div>
  );
};

export default HomePage;
