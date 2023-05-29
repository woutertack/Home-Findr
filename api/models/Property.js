import mongoose from "mongoose";

const PropertySchema = new mongoose.Schema(
  {
    agency: {
      type: mongoose.Types.ObjectId,
      ref: "Agency",
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: ["house", "apartment", "garage", "office", "other"],
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
    saleType: {
      type: String,
      enum: ["sale", "rent"],
      required: true,
    },
    img: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    province: {
      type: String,
      enum: [
        "West Flanders",
        "East Flanders",
        "Antwerp",
        "Limburg",
        "Flemish Brabant",
      ],
      required: true,
    },
    zipcode: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    buildyear: {
      type: Number,
      required: true,
      min: 1700,
    },

    sqmeters: {
      type: Number,
      required: true,
      min: 15,
    },
    sold: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Property", PropertySchema);
