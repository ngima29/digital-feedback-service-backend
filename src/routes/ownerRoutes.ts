import { RouterClass } from "../classes";
import {
  userController,
  RestaurantController,
  RatingAndReviewController,
} from "../controllers";
import { Validator } from "../middlewares";
import exceptionHandler from "../middlewares/exceptionHandler";
import { createUser, updateUser } from "../validators";

export class OwnerRouter extends RouterClass {
  constructor() {
    super();
  }

  define(): void {
    this.router.get(
      "/restaurant",
      exceptionHandler(RestaurantController.myRestaurant)
    );
  }
}
