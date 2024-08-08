import mongoose, { Schema, Document, Model } from "mongoose";
import { RestaurantInterface } from "../interfaces";
import mongoosePaginate from "mongoose-paginate-v2";

const restaurantSchema = new Schema<RestaurantInterface>(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true },
    description: { type: String, required: false },
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
restaurantSchema.plugin(mongoosePaginate);
interface RestaurantModel<T extends Document> extends Model<T> {
  paginate: any;
}

export const RestaurantModel = mongoose.model<RestaurantInterface>(
  "Restaurant",
  restaurantSchema
) as RestaurantModel<RestaurantInterface>;
