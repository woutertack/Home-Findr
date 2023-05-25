import express from "express";
import Message from "../models/Message.js";
import {
  createMessage,
  deleteMessage,
  getMatchingMessages,
  getMessage,
  updateMessage,
  getUserMessages,
  deleteMessagesByAgencyId,
  deleteMessagesByPropertyId,
} from "../controllers/messageController.js";

const router = express.Router();

// create
router.post("/", createMessage);

// update
router.put("/:id", updateMessage);

// delete
router.delete("/:id", deleteMessage);

// get
router.get("/:id", getMessage);

// get all matching messages where userId, propertyId, and agencyId matches
router.get("/", getMatchingMessages);

// get user messages
router.get("/user/:userId", getUserMessages);

// delete messages when agency is deleted
router.delete("/agency/:agencyId", deleteMessagesByAgencyId);

// delete messages when property is deleted
router.delete("/property/:propertyId", deleteMessagesByPropertyId);

export default router;
