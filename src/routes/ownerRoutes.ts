import { RouterClass } from "../classes";
import { userController } from "../controllers";
import { Validator } from "../middlewares";
import exceptionHandler from "../middlewares/exceptionHandler";
import { createUser, updateUser } from "../validators";

export class OwnerRouter extends RouterClass {
  constructor() {
    super();
  }

  define(): void {
    this.router.post(
      "/signup",
      Validator.check(createUser),
      exceptionHandler(userController.singUp)
    );

    this.router
      .route("/")
      .get(exceptionHandler(userController.findAll))
      .post(
        Validator.check(createUser),
        exceptionHandler(userController.singUp)
      );

    this.router
      .route("/:id")
      .patch(
        Validator.check(updateUser),
        exceptionHandler(userController.update)
      )
      .delete(exceptionHandler(userController.remove));
  }
}
