import mongoose from "mongoose";

const MessageSchema = new mongoose.Schema(
  {
    sender: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    senderName: {
      type: String,
      required: true,
    },
    senderImg: {
      type: String,
      required: true,
    },
    receiver: {
      type: mongoose.Types.ObjectId,
      ref: "Agency",
      required: true,
    },
    agencyName: {
      type: String,
      required: true,
    },
    agencyImg: {
      type: String,
      required: true,
    },

    property: {
      type: mongoose.Types.ObjectId,
      ref: "Property",
      required: true,
    },
    propertyTitle: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    read: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Message", MessageSchema);
