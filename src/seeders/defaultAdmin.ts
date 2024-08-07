import * as dotenv from "dotenv";
dotenv.config();
const mongoose = require("mongoose");
import { UserModel } from "../models";
import { Password } from "../utils";
import { RoleEnum } from "../enums";
const url = process.env.MONGO_URL!;

export const seedDefaultAdmin = async () => {
  try {
    mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    // default admin
    const password = "Admin@123";
    const defaultHashedPassword = await Password.generate(password);

    const userDate = {
      fullName: "digital feedback service",
      email: "digitalfeedbackservice@gmail.com",
      password: defaultHashedPassword,
      role: RoleEnum.Admin,
    };
    await UserModel.create(userDate);

    console.log("default Admin seeded successfully!");
  } catch (error) {
    console.error("Error seeding default user:", error);
  } finally {
    mongoose.disconnect();
  }
};

seedDefaultAdmin();
