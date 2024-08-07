import mongoose, { Schema, Document, Model } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
import { UserInterface } from "../interfaces";
import { RoleEnum } from "../enums";

const userSchema = new Schema<UserInterface>(
  {
    fullName: { type: String, required: true },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: Object.values(RoleEnum),
      required: true,
      default: RoleEnum.Customer,
    },
    image: { type: String },
    deletedAt: { type: Date, default: null },
  },
  { timestamps: true }
);

userSchema.plugin(mongoosePaginate);

interface UserModel<T extends Document> extends Model<T> {
  paginate: any;
}

export const UserModel = mongoose.model<UserInterface>(
  "User",
  userSchema
) as UserModel<UserInterface>;
