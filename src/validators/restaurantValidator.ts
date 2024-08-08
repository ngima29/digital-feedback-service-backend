import Joi from "joi";
import { stringSchema, numberSchema } from "./schemas";
import { RestaurantInterface } from "../interfaces";

const createRestaurant = Joi.object<RestaurantInterface>({
  name: stringSchema.max(100).required().label("Name"),
  description: stringSchema.allow("", null).optional().label("Description"),
  address: stringSchema.max(200).required().optional().label("Address"),
  location: stringSchema.allow("", null).optional().label("Location"),
  phoneNumber: stringSchema
    .min(9)
    .max(12)
    .allow("", null)
    .optional()
    .label("Phone Number"),
  owner: stringSchema.allow("", null).optional().label("Owner"),
  logo: stringSchema.allow("", null).optional().label("Logo"),
  bannerImage: stringSchema.allow("", null).label("Banner Image"),
  image: Joi.array()
    .items(stringSchema.allow("", null))
    .optional()
    .label("Image"),
});

const updateRestaurant = Joi.object({
  name: stringSchema.max(100).allow("", null).optional().label("Name"),
  description: stringSchema.allow("", null).optional().label("Description"),
  address: stringSchema.max(200).allow("", null).optional().label("Address"),
  location: stringSchema.allow("", null).optional().label("Location"),
  phoneNumber: stringSchema
    .min(9)
    .max(12)
    .allow("", null)
    .optional()
    .label("Phone Number"),
  averageRating: numberSchema
    .allow("", null)
    .optional()
    .min(0)
    .max(5)
    .label("Average Rating"),
  owner: stringSchema.allow("", null).optional().label("Owner"),
  logo: stringSchema.allow("", null).optional().label("Logo"),
  bannerImage: stringSchema.allow("", null).optional().label("Banner Image"),
  image: Joi.array()
    .items(stringSchema.allow("", null))
    .optional()
    .label("Image"),
});

export { createRestaurant, updateRestaurant };
