import { RouterClass } from "../classes";
import { userController } from "../controllers";
import { Validator } from "../middlewares";
import exceptionHandler from "../middlewares/exceptionHandler";

import {
  createUser,
  updateUser,
  login,
  changePassword,
  forgotPassword,
  confirmForgotPassword,
  updatePassword,
} from "../validators";

export class AuthRouter extends RouterClass {
  constructor() {
    super();
  }

  define(): void {
    this.router.post(
      "/signup",
      Validator.check(createUser),
      exceptionHandler(userController.singUp)
    );

    this.router.post(
      "/login",
      Validator.check(login),
      exceptionHandler(userController.login)
    );

    // this.router.post(
    //   "/change-password",
    //   Validator.check(changePassword),
    //   exceptionHandler(userController.changePassword)
    // );

    // this.router.post(
    //   "/forgot-password",
    //   Validator.check(forgotPassword),
    //   exceptionHandler(userController.forgotPassword)
    // );

    // this.router.post(
    //   "/confirm-forgot-password",
    //   Validator.check(confirmForgotPassword),

    //   exceptionHandler(userController.confirmForgotPassword)
    // );
  }
}
