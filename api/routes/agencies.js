import express from "express";
import Agency from "../models/Agency.js";
import {
  createAgency,
  deleteAgency,
  getAgency,
  getAllAgency,
  updateAgency,
} from "../controllers/agencyController.js";

const router = express.Router();

// create
router.post("/", createAgency);

// update
router.put("/:id", updateAgency);

// delete
router.delete("/:id", deleteAgency);

// get
router.get("/:id", getAgency);

// get all
router.get("/", getAllAgency);

export default router;
