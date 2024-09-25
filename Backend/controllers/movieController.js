import Movie from "../models/MovieModel.js";
import multer from 'multer';

export const getMovies = async (req, res) => {
  try {
    const movies = await Movie.find();
    res.json(movies);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const addMovie = async (req, res) => {
  const { name, time, year, image, introduce } = req.body;
  const newMovie = new Movie({ name, time, year, image, introduce });

  try {
    const savedMovie = await newMovie.save();
    res.status(201).json(savedMovie);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


export const updateMovie = async (req, res) => {
    const { name, time, year, image, introduce } = req.body;
  
    try {
      const updatedMovie = await Movie.findByIdAndUpdate(
        req.params.id,
        { name, time, year, image, introduce },
        { new: true }
      );
  
      if (!updatedMovie) {
        return res.status(404).json({ message: 'Movie not found' });
      }
  
      res.json(updatedMovie);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };


export const deleteMovie = async (req, res) => {
  try {
    await Movie.findByIdAndDelete(req.params.id);
    res.json({ message: 'Movie deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const searchMovies = async (req, res) => {
    const { name } = req.query; 
  
    try {
      const movies = await Movie.find({ name: new RegExp(name, 'i') });
      res.json(movies);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

export const sortMoviesByYear = async (req, res) => {
    const { order = 'asc' } = req.query; 
  
    try {
      const movies = await Movie.find().sort({ year: order === 'asc' ? 1 : -1 });
      res.json(movies);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); 
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });


export const uploadMovieImage = async (req, res) => {
  const movieId = req.params.id;
  
  try {
    const movie = await Movie.findById(movieId);
    if (!movie) {
      return res.status(404).json({ message: 'Movie not found' });
    }

    movie.image = `/uploads/${req.file.filename}`;  
    await movie.save();

    res.json(movie);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { upload }; 