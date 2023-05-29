import express from "express";
import User from "../models/User.js";
import {
  deleteUser,
  deleteUserAgency,
  getAllUser,
  getUser,
  updateUser,
} from "../controllers/userController.js";
import { get } from "mongoose";
import { verifyAdmin, verifyToken, verifyUser } from "../auth/verifyToken.js";

const router = express.Router();

// router.get("/checkauth", verifyToken, (req, res, next) => {
//   res.send("You are authenticated");
// });

// router.get("/checkuser/:id", verifyUser, (req, res, next) => {
//   res.send("you are logged in and you can delete your account");
// });

// router.get("/checkadmin/:id", verifyAdmin, (req, res, next) => {
//   res.send("you are admin in and you can delete all accounts");
// });

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
