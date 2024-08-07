import { ModelTimestampExtend, PaginationOrderSearchExtend } from ".";
import { Types, Document } from "mongoose";

export interface InputRestaurantInterface {
  name: string;
  description: string;
  address: string;
  location?: string;
  phoneNumber?: string;
  averageRating: number;
  owner?: Types.ObjectId;
  logo?: string;
  bannerImage: string;
  image?: string[];
}

export interface RestaurantInterface
  extends Document,
    ModelTimestampExtend,
    InputRestaurantInterface {
  _id: Types.ObjectId;
}
export interface ArgsRestaurantInterface extends PaginationOrderSearchExtend {}
