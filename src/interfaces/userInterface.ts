import { ModelTimestampExtend, PaginationOrderSearchExtend } from ".";
import { Types, Document } from "mongoose";
import { RoleEnum } from "../enums";
export interface InputUserInterface {
  fullName: string;
  email: string;
  password: string;
  role: RoleEnum;
  image?: string;
}

export interface UserInterface
  extends Document,
    ModelTimestampExtend,
    InputUserInterface {
  _id: Types.ObjectId;
}
export interface ArgsUserInterface extends PaginationOrderSearchExtend {}

export interface UserLogin {
  email: string;
  password: string;
}

export interface ChangePassword {
  email: string;
  oldPassword: string;
  newPassword: string;
}
