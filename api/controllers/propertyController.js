import Property from "../models/Property.js";

export const createProperty = async (req, res, next) => {
  const newProperty = new Property(req.body);

  try {
    const savedProperty = await newProperty.save();
    res.status(200).json(savedProperty);
  } catch (err) {
    console.log(err);
    next(err);
  }
};

export const updateProperty = async (req, res, next) => {
  const updatedProperty = await Property.findByIdAndUpdate(
    req.params.id,
    {
      $set: req.body,
    },
    { new: true }
  );

  try {
    const savedProperty = await updatedProperty.save();
    res.status(200).json(savedProperty);
  } catch (err) {
    next(err);
  }
};

export const deleteProperty = async (req, res, next) => {
  try {
    await Property.findByIdAndDelete(req.params.id);
    res.status(200).json("Property deleted");
  } catch (err) {
    next(err);
  }
};

export const getProperty = async (req, res, next) => {
  try {
    const property = await Property.findById(req.params.id);
    res.status(200).json(property);
  } catch (err) {
    next(err);
  }
};

export const getAllProperties = async (req, res, next) => {
  const { min, max, ...others } = req.query;
  try {
    const property = await Property.find({
      ...others,
      price: { $gte: min || 1, $lte: max || 5000000 },
    }).limit(req.query.limit);
    res.status(200).json(property);
  } catch (err) {
    next(err);
  }
};

export const deletePropertiesByAgencyId = async (req, res, next) => {
  const agencyId = req.params.agencyId;

  try {
    await Property.deleteMany({ agency: agencyId });
    res.status(200).json("Properties deleted");
  } catch (err) {
    next(err);
  }
};
