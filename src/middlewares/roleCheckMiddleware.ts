import { Request, Response, NextFunction } from "express";
import { RoleEnum } from "../enums";
import { CustomRequest } from ".";
export const isAdmin = () => {
  return (req: CustomRequest, res: Response, next: NextFunction) => {
    const empRole = req.userRole;
    if (empRole === RoleEnum.Admin) {
      next();
    } else {
      res
        .status(401)
        .json({ message: "Unauthorized - Insufficient Privilege" });
    }
  };
};

export const isOwner = () => {
  return (req: CustomRequest, res: Response, next: NextFunction) => {
    const empRole = req.userRole;
    if (empRole === RoleEnum.Owner) {
      next();
    } else {
      res
        .status(401)
        .json({ message: "Unauthorized - Insufficient Privilege" });
    }
  };
};
