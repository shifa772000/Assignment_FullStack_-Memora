import mongoose from "mongoose";
import cors from "cors";
import express from "express";
import personRoutes from './routes/personRoutes.js';
import 'dotenv/config'; 
import userRoutes from './routes/userRoutes.js';



const app = express();
const PORT = process.env.PORT || 5000; 


app.use(cors());
app.use(express.json());



//mongodb+srv://shifa12345:Sh12345@cluster0.5evfrus.mongodb.net/Memora

//mongodb+srv://shifa68978:SHIFAsh121212@cluster0.5evfrus.mongodb.net/Memora?appName=Cluster0


const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://shifa68978:SHIFAsh121212@cluster0.5evfrus.mongodb.net/Memora?appName=Cluster0';

app.use('/api/auth', userRoutes)
app.use('/api/persons', personRoutes);
app.use('/api/people', personRoutes);

mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('The MongoDB database connection was successfully established!');
    app.listen(PORT, () => {
      console.log(`The server is operating on port: 5000 ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('faild:', err.message);
    process.exit(1);
  });