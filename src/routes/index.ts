import { Router } from "express";
import { IRouteInterface } from "../interfaces";
import { authenticateToken } from "../middlewares";

// import routes
import { AdminRouter } from "./adminRoutes";
import { AuthRouter } from "./authRoutes";
import { CustomerRouter } from "./customerRout";
import { OwnerRouter } from "./ownerRoutes";

class ProxyRouter {
  private static instance: ProxyRouter;
  private router: Router = Router();
  private readonly AdminRoutes = {
    segment: "/",
    provider: AdminRouter,
  };
  private readonly AuthRoute = { segment: "/", provider: AuthRouter };
  private readonly CustomerRoutes = { segment: "/", provider: CustomerRouter };
  private readonly OwnerRouters = {
    segment: "/",
    provider: OwnerRouter,
  };

  private constructor() {}

  static get(): ProxyRouter {
    if (!ProxyRouter.instance) {
      ProxyRouter.instance = new ProxyRouter();
    }
    return ProxyRouter.instance;
  }
  admin(): Router {
    const adminRoute = this.AdminRoutes;
    const instance = new adminRoute.provider() as { router: Router };
    return instance.router;
  }

  auth(): Router {
    const authRoute = this.AuthRoute;
    const instance = new authRoute.provider() as { router: Router };
    return instance.router;
  }

  customer(): Router {
    const authRoute = this.CustomerRoutes;
    const instance = new authRoute.provider() as { router: Router };
    return instance.router;
  }

  owner(): Router {
    const authRoute = this.OwnerRouters;
    const instance = new authRoute.provider() as { router: Router };
    return instance.router;
  }
}

const proxyRouter = ProxyRouter.get();

export { proxyRouter as ProxyRouter };
