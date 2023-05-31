import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { createError } from "../error/error.js";

export const register = async (req, res, next) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(req.body.password, salt);

    const newUser = new User({
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      password: hashedPassword,
      agency: req.body.agency,
    });

    const { password, isAdmin, ...others } = newUser._doc;

    await newUser.save();
    res.status(200).json({ ...others });
  } catch (err) {
    next(err);
  }
};

// login, also checks if user is admin/agency or visitor and updates the cookie accordingly
export const login = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) return next(createError(404, "Email does not exist"));

    const checkPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!checkPassword)
      return next(createError(400, "Invalid user or password"));

    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN_HOURS * 60 * 60 }
    );

    const { password, isAdmin, agency, ...others } = user._doc;

    if (user.isAdmin) {
      res
        .cookie("access_token", token, {})
        .status(200)
        .json({ ...others, isAdmin: true });
    } else {
      if (user.agency) {
        res
          .cookie("access_token", token, {})
          .status(200)
          .json({ ...others, agency });
      } else {
        res
          .cookie("access_token", token, {})
          .status(200)
          .json({ ...others });
      }
    }
  } catch (err) {
    next(err);
  }
};
