import mongoose, { Schema } from "mongoose";
import { RestaurantInterface } from "../interfaces";

const restaurantSchema = new Schema<RestaurantInterface>(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    address: { type: String, required: true },
    location: { type: String },
    phoneNumber: { type: String },
    averageRating: { type: Number, min: 0, max: 5 },
    owner: { type: Schema.Types.ObjectId, ref: "User" },
    logo: { type: String },
    bannerImage: { type: String },
    image: [{ type: String }],
    deletedAt: { type: Date, default: null },
  },
  {
    timestamps: true,
  }
);

export const RestaurantModel = mongoose.model<RestaurantInterface>(
  "Restaurant",
  restaurantSchema
);
