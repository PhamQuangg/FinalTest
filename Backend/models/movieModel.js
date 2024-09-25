import mongoose from 'mongoose';

const movieSchema = new mongoose.Schema({
  name: { type: String, required: true },
  time: { type: Number, required: true },
  year: { type: Number, required: true },
  image: { type: String },
  introduce: { type: String }
});

const Movie = mongoose.model('Movie', movieSchema);

export default Movie;