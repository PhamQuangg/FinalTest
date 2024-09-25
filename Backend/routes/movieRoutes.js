import express from 'express';
import { getMovies, addMovie, deleteMovie, updateMovie,searchMovies,sortMoviesByYear,upload, uploadMovieImage } from '../controllers/movieController.js';

const router = express.Router();

router.get('/movies', getMovies);
router.post('/movies', addMovie);
router.delete('/movies/:id', deleteMovie);
router.put('/movies/:id', updateMovie);  
router.get('/movies/search', searchMovies);
router.get('/movies/sort', sortMoviesByYear);
router.post('/movies/:id/upload', upload.single('image'), uploadMovieImage);

export default router;