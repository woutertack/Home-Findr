import express from 'express';
import Agency from '../models/Agency.js';

const router = express.Router();

// create
router.post('/', async (req, res) => {

  const newAgency = new Agency(req.body);

  try {
    const savedAgency = await newAgency.save();
    res.status(200).json(savedAgency);
  } catch (error) {
    res.status(500).json(error);
  }
})

export default router;