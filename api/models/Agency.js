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
      default: "house.webp",
    },
    phone: {
      type: String,
      required: true,
    },
    users: {
      type: [ mongoose.Schema.Types.ObjectId ],
      ref: "User",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Agency", AgencySchema);
