import Agency from "../models/Agency.js";

export const createAgency = async (req, res, next) => {
  const newAgency = new Agency(req.body);

  try {
    const savedAgency = await newAgency.save();
    res.status(200).json(savedAgency);
  } catch (err) {
    next(err);
  }
};

export const updateAgency = async (req, res, next) => {
  const updatedAgency = await Agency.findByIdAndUpdate(
    req.params.id,
    {
      $set: req.body,
    },
    { new: true }
  );

  try {
    const savedAgency = await updatedAgency.save();
    res.status(200).json(savedAgency);
  } catch (err) {
    next(err);
  }
};

export const deleteAgency = async (req, res, next) => {
  try {
    await Agency.findByIdAndDelete(req.params.id);
    res.status(200).json("Agency deleted");
  } catch (err) {
    next(err);
  }
};

export const getAgency = async (req, res, next) => {
  try {
    const agency = await Agency.findById(req.params.id);
    res.status(200).json(agency);
  } catch (err) {
    next(err);
  }
};

export const getAllAgency = async (req, res, next) => {
  try {
    const agencies = await Agency.find();
    res.status(200).json(agencies);
  } catch (err) {
    next(err);
  }
};
