import { RouterClass } from "../classes";
import {
  userController,
  RestaurantController,
  RatingAndReviewController,
} from "../controllers";
import { Validator } from "../middlewares";
import exceptionHandler from "../middlewares/exceptionHandler";

import {
  signup,
  login,
  forgotPassword,
  confirmForgotPassword,
} from "../validators";

export class AuthRouter extends RouterClass {
  constructor() {
    super();
  }

  define(): void {
    this.router.post(
      "/signup",
      Validator.check(signup),
      exceptionHandler(userController.singUp)
    );

    this.router.post(
      "/login",
      Validator.check(login),
      exceptionHandler(userController.login)
    );

    this.router.get(
      "/restaurants",
      exceptionHandler(RestaurantController.findAll)
    );

    this.router.get(
      "/rating-and-review/:id",
      exceptionHandler(RatingAndReviewController.getRestaurantRatingsAndReviews)
    );

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
