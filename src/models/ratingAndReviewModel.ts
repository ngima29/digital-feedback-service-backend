import mongoose, { Schema, Types } from "mongoose";
import { RatingAndReviewInterface, Reply } from "../interfaces";

const replySchema = new Schema<Reply>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    reply: { type: String, required: true },
  },
  { _id: false }
);

const ratingAndReviewSchema = new Schema<RatingAndReviewInterface>(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    restaurant: {
      type: Schema.Types.ObjectId,
      ref: "Restaurant",
      required: true,
    },
    rating: { type: Number, required: true, min: 0, max: 5 },
    review: { type: String, required: true },
    reply: [{ type: replySchema, required: false }],
    deletedAt: { type: Date, default: null },
  },
  {
    timestamps: true,
  }
);

export const RatingAndReviewModel = mongoose.model<RatingAndReviewInterface>(
  "RatingAndReview",
  ratingAndReviewSchema
);
