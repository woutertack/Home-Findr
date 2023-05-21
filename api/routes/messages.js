import express from "express";
import Message from "../models/Message.js";
import {
  createMessage,
  deleteMessage,
  getAllMessage,
  getMessage,
  updateMessage,
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

// get all
router.get("/", getAllMessage);

export default router;
