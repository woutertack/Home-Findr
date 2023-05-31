import express from "express";
import {
  createAgency,
  deleteAgency,
  getAgency,
  getAgencyMembers,
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

// get agency members
router.get("/members/:id", getAgencyMembers);

export default router;
