import express from "express";
import Property from "../models/Property.js";
import { createError } from "../error/error.js";
import {
  createProperty,
  deleteProperty,
  getAllProperties,
  getProperty,
  updateProperty,
} from "../controllers/propertyController.js";
import { verifyAdmin } from "../auth/verifyToken.js";

const router = express.Router();

// create
router.post("/", verifyAdmin, createProperty);

// update
router.put("/:id",verifyAdmin, updateProperty);

// delete
router.delete("/:id",verifyAdmin, deleteProperty);

// get
router.get("/:id", getProperty);

// get all
router.get("/", getAllProperties,);

// router.get("/sale", getAllSaleProperties);

export default router;
