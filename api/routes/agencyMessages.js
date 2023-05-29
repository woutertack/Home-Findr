import express from "express";

import {
  createAgencyMessage,
  deleteMessagesByAgencyId,
  deleteMessagesByPropertyId,
  deleteMessagesByUserId,
  getAgencyMessage,
  getAgencyMessages,
  getMatchingMessages,
  getUserMessages,
} from "../controllers/agencyMessageController.js";

const router = express.Router();

// create
router.post("/", createAgencyMessage);

// get
router.get("/:id", getAgencyMessage);

// get all matching messages where userId, propertyId, and agencyId matches
router.get("/", getMatchingMessages);

// get agency messages
router.get("/agency/:agencyId", getAgencyMessages);

// get user messages
router.get("/user/:userId", getUserMessages);

// delete messages when agency is deleted
router.delete("/agency/:agencyId", deleteMessagesByAgencyId);

// delete messages when property is deleted
router.delete("/property/:propertyId", deleteMessagesByPropertyId);

// delete messages when user is deleted
router.delete("/user/:userId", deleteMessagesByUserId);

export default router;
