import Joi from "joi";
import { stringSchema, emailSchema, numberSchema } from "./schemas";
import { UserInterface } from "../interfaces";
import { RoleEnum } from "../enums";
import { list } from "../utils";
const createUser = Joi.object<UserInterface>({
  fullName: stringSchema.min(3).max(50).required().label("Full Name"),
  email: emailSchema.required().label("Email"),
  role: stringSchema
    .required()
    .label("Role")
    .valid(...list(RoleEnum)),
  password: stringSchema.min(4).max(12).required().label("Password"),
  image: stringSchema.allow("", null).optional().label("Image"),
});

const updateUser = Joi.object({
  fullName: stringSchema
    .min(3)
    .max(50)
    .allow("", null)
    .optional()
    .label("Full Name"),
  email: emailSchema.allow("", null).optional().label("Email"),
  password: stringSchema
    .min(4)
    .max(12)
    .allow("", null)
    .optional()
    .label("Password"),
  image: stringSchema.allow("", null).optional().label("Image"),
});

const login = Joi.object({
  email: emailSchema.label("Email").required().trim(),
  password: stringSchema.label("Password").required(),
});

const signup = Joi.object<UserInterface>({
  fullName: stringSchema.min(3).max(50).required().label("Full Name"),
  email: emailSchema.required().label("Email"),
  password: stringSchema.min(4).max(12).required().label("Password"),
  image: stringSchema.allow("", null).optional().label("Image"),
});

const changePassword = Joi.object({
  email: emailSchema.label("Email").required().trim(),
  oldPassword: stringSchema.label("Old Password").required(),
  newPassword: stringSchema
    .label("New Password")
    .not(Joi.ref("oldPassword"))
    .label("New Password")
    .required(),
});

const forgotPassword = Joi.object({
  email: emailSchema.label("Email").required().trim(),
});
const confirmForgotPassword = Joi.object({
  email: emailSchema.label("Email").required().trim(),
  otp: numberSchema.label("OTP").required(),
  newPassword: stringSchema.label("New Password").required(),
});
const updatePassword = Joi.object({
  oldPassword: stringSchema.label("Old Password").required(),
  newPassword: stringSchema
    .label("New Password")
    .not(Joi.ref("oldPassword"))
    .label("New Password")
    .required(),
});

export {
  createUser,
  updateUser,
  login,
  changePassword,
  forgotPassword,
  confirmForgotPassword,
  updatePassword,
  signup,
};
