import Joi from "joi";
import { stringSchema, numberSchema } from "./schemas";
import { RatingAndReviewInterface } from "../interfaces";

const replySchema = Joi.object({
  userId: stringSchema.required().label("User ID"),
  reply: stringSchema.required().label("Reply"),
});

const createRatingAndReview = Joi.object<RatingAndReviewInterface>({
  user: stringSchema.required().label("User"),
  restaurant: stringSchema.required().label("Restaurant"),
  rating: numberSchema.required().min(0).max(5).label("Rating"),
  review: stringSchema.required().label("Review"),
});

const updateRatingAndReview = Joi.object({
  user: stringSchema.allow("", null).optional().label("User"),
  restaurant: stringSchema.allow("", null).optional().label("Restaurant"),
  rating: numberSchema.allow("", null).optional().min(0).max(5).label("Rating"),
  review: stringSchema.allow("", null).optional().label("Review"),
});

export { createRatingAndReview, updateRatingAndReview };
