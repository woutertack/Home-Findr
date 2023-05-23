import express from "express";
import Favorite from "../models/Favorite.js";
import {
  createFavorite,
  deleteFavorite,
  getAllFavorite,
  getFavorite,
  getUserFavorites,
  updateFavorite,
} from "../controllers/favoriteController.js";

const router = express.Router();

// create
router.post("/", createFavorite);

// update
router.put("/:id", updateFavorite);

// delete
router.delete("/:id", deleteFavorite);

// get
router.get("/:id", getFavorite);

// get all
router.get("/", getAllFavorite);

// get user favorites
router.get("/user/:userId", getUserFavorites)
export default router;
