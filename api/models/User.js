import mongoose from "mongoose";
const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    profileImg: {
      type: String,
      default: "defaultUser.png",
    },

    phone: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    agency: {
      type: mongoose.Types.ObjectId,
      ref: "Agency",
      
    },
  },
  { timestamps: true }
);

export default mongoose.model("User", UserSchema);
