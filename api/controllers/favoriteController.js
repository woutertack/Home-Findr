import Favorite from "../models/Favorite.js";

export const createFavorite = async (req, res, next) => {
  const newFavorite = new Favorite(req.body);

  try {
    const savedFavorite = await newFavorite.save();
    res.status(200).json(savedFavorite);
  } catch (err) {
    next(err);
  }
};

export const updateFavorite = async (req, res, next) => {
  const updatedFavorite = await Favorite.findByIdAndUpdate(
    req.params.id,
    {
      $set: req.body,
    },
    { new: true }
  );

  try {
    const savedFavorite = await updatedFavorite.save();
    res.status(200).json(savedFavorite);
  } catch (err) {
    next(err);
  }
};

export const deleteFavorite = async (req, res, next) => {
  try {
    await Favorite.findByIdAndDelete(req.params.id);
    res.status(200).json("Favorite deleted");
  } catch (err) {
    next(err);
  }
};

export const getFavorite = async (req, res, next) => {
  try {
    const favorite = await Favorite.findById(req.params.id);
    res.status(200).json(favorite);
  } catch (err) {
    next(err);
  }
};

export const getAllFavorite = async (req, res, next) => {
  try {
    const favorites = await Favorite.find();
    res.status(200).json(favorites);
  } catch (err) {
    next(err);
  }
};

export const getUserFavorites = async (req, res, next) => {
  const userId = req.params.userId;

  try {
    const favorites = await Favorite.find({ user: userId }).populate(
      "property"
    );
    res.status(200).json(favorites);
  } catch (err) {
    next(err);
  }
};


export const deleteFavoritesByPropertyId = async (req, res, next) => {
  const propertyId = req.params.propertyId;

  try {
    await Favorite.deleteMany({ property: propertyId });
    res.status(200).json("Favorites deleted");
  } catch (err) {
    next(err);
  }
};