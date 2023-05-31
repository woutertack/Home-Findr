import express from "express";
import {
  deleteUser,
  deleteUserAgency,
  getAllUser,
  getUser,
  updateUser,
} from "../controllers/userController.js";

const router = express.Router();

// update
router.put("/:id", updateUser);

// delete
router.delete("/:id", deleteUser);

// delete all users of an agency
router.delete("/delete/:id", deleteUserAgency);

// get
router.get("/:id", getUser);

// get all
router.get("/", getAllUser);

export default router;
