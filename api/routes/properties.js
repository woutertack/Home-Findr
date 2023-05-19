import express from 'express';
import Property from '../models/Property.js';

const router = express.Router();

// create
router.post('/', async (req, res) => {

  const newProperty = new Property(req.body);

  try {
    const savedProperty = await newProperty.save();
    res.status(200).json(savedProperty);
  } catch (error) {
    res.status(500).json(error);
  }
})

// update
router.put('/:id', async (req, res) => {

  const updatedProperty = await Property.findByIdAndUpdate(req.params.id, {
    $set: req.body,
  }, { new: true })

  try {
    const savedProperty = await updatedProperty.save();
    res.status(200).json(savedProperty);
  } catch (error) {
    res.status(500).json(error);
  }
})

// delete
router.delete('/:id', async (req, res) => {
  try {
    await Property.findByIdAndDelete(req.params.id)
    res.status(200).json("Property deleted");
  } catch (error) {
    res.status(500).json(error);
  }
})

// get
router.get('/:id', async (req, res) => {
  try {
    const property = await Property.findById(req.params.id)
    res.status(200).json(property);
  } catch (error) {
    res.status(500).json(error);
  }
})

// get all
router.get('/', async (req, res) => {
  try {
    const properties = await Property.find()
    res.status(200).json(properties);
  } catch (error) {
    res.status(500).json(error);
  }
})


export default router;