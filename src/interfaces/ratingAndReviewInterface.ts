import { ModelTimestampExtend, PaginationOrderSearchExtend } from ".";
import { Types, Document } from "mongoose";

export type Reply = {
  userId: Types.ObjectId;
  reply: string;
};
export interface InputRatingAndReviewInterface {
  user: Types.ObjectId;
  restaurant: Types.ObjectId;
  rating: number;
  review: string;
  reply?: Reply[];
}

export interface RatingAndReviewInterface
  extends Document,
    ModelTimestampExtend,
    InputRatingAndReviewInterface {
  _id: Types.ObjectId;
}
export interface ArgsRatingAndReviewInterface
  extends PaginationOrderSearchExtend {}
