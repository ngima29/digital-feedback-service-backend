import { RouterClass } from "../classes";
import {
  userController,
  RatingAndReviewController,
  RestaurantController,
} from "../controllers";
import { Validator } from "../middlewares";
import exceptionHandler from "../middlewares/exceptionHandler";
import {
  updatePassword,
  updateUser,
  createRatingAndReview,
} from "../validators";

export class CustomerRouter extends RouterClass {
  constructor() {
    super();
  }

  define(): void {
    this.router.post(
      "/rating-and-review",
      Validator.check(createRatingAndReview),
      exceptionHandler(RatingAndReviewController.create)
    );
    this.router
      .route("/rating-and-review/:id")
      .patch(
        Validator.check(updateUser),
        exceptionHandler(RatingAndReviewController.update)
      )
      .delete(exceptionHandler(RatingAndReviewController.remove));

    /// profile
    this.router.patch(
      "/update-password/:id",
      Validator.check(updatePassword)
      //  exceptionHandler(userController.)
    );
    // restaurant
    this.router.get(
      "/restaurant",
      exceptionHandler(RestaurantController.findAll)
    );
  }
}
