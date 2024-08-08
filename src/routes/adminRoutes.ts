import { RouterClass } from "../classes";
import {
  userController,
  RatingAndReviewController,
  RestaurantController,
} from "../controllers";
import { Validator } from "../middlewares";
import exceptionHandler from "../middlewares/exceptionHandler";
import {
  createUser,
  updateUser,
  createRestaurant,
  updateRestaurant,
} from "../validators";

export class AdminRouter extends RouterClass {
  constructor() {
    super();
  }

  define(): void {
    /// User
    this.router
      .route("/user")
      .get(exceptionHandler(userController.findAll))
      .post(
        Validator.check(createUser),
        exceptionHandler(userController.singUp)
      );
    this.router
      .route("/user/:id")
      .patch(
        Validator.check(updateUser),
        exceptionHandler(userController.update)
      )
      .delete(exceptionHandler(userController.remove));

    // Restaurant
    this.router
      .route("/restaurant")
      .get(exceptionHandler(RestaurantController.findAll))
      .post(
        Validator.check(createRestaurant),
        exceptionHandler(RestaurantController.create)
      );
    this.router
      .route("/restaurant/:id")
      .patch(
        Validator.check(updateRestaurant),
        exceptionHandler(RestaurantController.update)
      )
      .delete(exceptionHandler(RestaurantController.remove));

    /// Rating and Review
    this.router.get(
      "/rating-and-review",
      exceptionHandler(RatingAndReviewController.findAll)
    );
    this.router.delete(
      "/rating-and-review/:id",
      exceptionHandler(RatingAndReviewController.remove)
    );
  }
}
