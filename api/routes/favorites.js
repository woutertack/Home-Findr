import express from 'express';
import Favorite from '../models/Favorite.js';

const router = express.Router();

// create
router.post('/', async (req, res) => {

  const newFavorites = new User(req.body);

  try {
    const savedFavorites = await newFavorites.save();
    res.status(200).json(savedFavorites);
  } catch (error) {
    res.status(500).json(error);
  }
})

export default router;