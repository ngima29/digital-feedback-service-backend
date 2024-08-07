import { Router } from "express";
import { IRouteInterface } from "../interfaces";
// import { authenticateToken } from "../middlewares";

// import routes
import { AuthRouter } from "./authRoutes";
import { UserRouter } from "./userRout";

class ProxyRouter {
  private static instance: ProxyRouter;
  private router: Router = Router();
  private readonly customerRoutes = { segment: "/", provider: UserRouter };
  private readonly authRoute = { segment: "/", provider: AuthRouter };
  private readonly superAdminRoutes = [];
  private readonly adminRoutes = [];

  private constructor() {}

  static get(): ProxyRouter {
    if (!ProxyRouter.instance) {
      ProxyRouter.instance = new ProxyRouter();
    }
    return ProxyRouter.instance;
  }

  superAdmin(): Router {
    this.superAdminRoutes.forEach((route: IRouteInterface) => {
      const instance = new route.provider() as { router: Router };
      this.router.use(route.segment, instance.router);
    });
    return this.router;
  }
  admin(): Router {
    this.adminRoutes.forEach((route: IRouteInterface) => {
      const instance = new route.provider() as { router: Router };
      this.router.use(route.segment, instance.router);
    });
    return this.router;
  }
  customer(): Router {
    const authRoute = this.customerRoutes;
    const instance = new authRoute.provider() as { router: Router };
    return instance.router;
  }
  auth(): Router {
    const authRoute = this.authRoute;
    const instance = new authRoute.provider() as { router: Router };
    return instance.router;
  }
}

const proxyRouter = ProxyRouter.get();

export { proxyRouter as ProxyRouter };
