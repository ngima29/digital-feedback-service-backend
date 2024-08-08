import { Request, Response, NextFunction, RequestHandler } from "express";
import { Token } from "../utils";
import { UserService } from "../services";
import { Types } from "mongoose";
export interface CustomRequest extends Request {
  userId?: Types.ObjectId | any;
  userRole?: string | null;
  restaurantId?: string | Types.ObjectId;
}

export const authenticateToken = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const reqToken = req.headers.authorization as string;
    let user;
    if (!reqToken) {
      return res.status(401).json({ message: "Unauthorized - Token missing" });
    }
    let token = reqToken.replace("Bearer ", "");
    try {
      const decodedToken = Token.verifyAccessToken(token);
      if (decodedToken) {
        user = await new UserService().getUser(decodedToken.id);
      }
    } catch (error: any) {
      return res.status(403).json({ message: `${error.message}` });
    }
    if (!user) {
      return res.status(404).json({
        message: "Unauthorized - user with that token is not found!!",
      });
    }
    req.userId = user?._id || null;
    req.userRole = user?.role || null;

    next();
  } catch (error) {
    console.log(
      `middleware error ----------------------------------------- ${error}`
    );
  }
};
