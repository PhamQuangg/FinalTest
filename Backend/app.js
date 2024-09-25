import express from 'express';
import movieRoutes from './routes/movieRoutes.js';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors'
const app = express();

await mongoose.connect(
    "mongodb+srv://quang125zxc:quang125zxc@cluster0.a6r7f.mongodb.net/Cluster0?retryWrites=true&w=majority&appName=Cluster0"
  );
  
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
app.use('/api', movieRoutes);

app.listen(8080, () => {
    console.log("Server is running!");
  });
  