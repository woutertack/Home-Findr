import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import authRoute from './routes/auth.js';
import usersRoute from './routes/users.js';
import propertiesRoute from './routes/properties.js';
import agenciesRoute from './routes/agencies.js';
import favoritesRoute from './routes/favorites.js';

const app = express();
dotenv.config();

const connect = async () => {
  try{
    await mongoose.connect(process.env.MONGO)
    console.log('Connected to MongoDB');
  } catch (error)  {
    console.log(error);
  }
}

mongoose.connection.on('disconnected', () => {
  console.log('MongoDB disconnected!');
  
});

//middleware
app.use(express.json());

app.use('/api/auth', authRoute);
app.use('/api/users', usersRoute);
app.use('/api/properties', propertiesRoute);
app.use('/api/agencies', agenciesRoute);
app.use('/api/favorites', favoritesRoute);

app.listen(8800, () => {
  connect()
  console.log('Server started!');
});