import express from "express";
import Property from "../models/Property.js";
import { createError } from "../error/error.js";
import {
  createProperty,
  deletePropertiesByAgencyId,
  deleteProperty,
  getAllProperties,
  getProperty,
  updateProperty,
} from "../controllers/propertyController.js";
import { verifyAdmin } from "../auth/verifyToken.js";

const router = express.Router();

// create
router.post("/", createProperty);

// update
router.put("/:id", updateProperty);

// delete
router.delete("/:id", deleteProperty);

// get
router.get("/:id", getProperty);

// get all
router.get("/", getAllProperties);

// delete properties from an agency
router.delete("/agency/:agencyId", deletePropertiesByAgencyId);

export default router;
