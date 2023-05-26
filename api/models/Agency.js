import mongoose from "mongoose";
const AgencySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
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
    users: {
      type: [String],
      default: [],
    },
  },
  { timestamps: true }
);

export default mongoose.model("Agency", AgencySchema);
