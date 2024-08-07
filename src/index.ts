import cors from "cors";
import express, { Express } from "express";
import * as errorHandler from "./middlewares/errorHandler";
import globalError from "./middlewares/globalErrorHandler";
import { Database, port, hostUrl } from "./config";
import path from "path";
import { ProxyRouter } from "./routes";
class Server {
  app: Express;
  constructor() {
    this.app = express();
    this.configuration();
  }

  private configuration() {
    this.app.set("port", port);
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.static("public"));

    // Set up hbs as the view engine
    this.app.set("view engine", "ejs");
    const viewsPath = path.join(__dirname, "email_templates");
    this.app.set("views", viewsPath);

    //API Routes
    this.app.use("/api/auth", ProxyRouter.auth());
    this.app.use("/api/customer", ProxyRouter.customer());
    this.app.use("/api/admin", ProxyRouter.admin());
    this.app.use("/api/super-admin", ProxyRouter.superAdmin());

    this.app.get("/", (req, res) => {
      res.send(`Welcome To Digital-Feedback-Service-Backend`);
    });

    //Error Handler
    this.app.use(errorHandler.genericErrorHandler);
    this.app.use(errorHandler.methodNotAllowed);
    this.app.use(errorHandler.notFound);
    this.app.use(globalError);
  }

  private async connectDB() {
    await Database.connect();
  }

  public start() {
    this.connectDB();
    this.app.listen(this.app.get("port"), () =>
      console.log(`App running on PORT ${port}, Host URL:${hostUrl}`)
    );
  }
}

const server = new Server();
server.start();
