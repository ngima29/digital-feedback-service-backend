import { Request, Response } from "express";
import { UserService } from "../services";
import { successResponseData, errorResponse } from "../utils";
import { SortEnum } from "../enums";
import { defaultOrder, defaultSort, pgMinLimit, defaultPage } from "../config";
import { HttpStatusEnum } from "../enums";
import { Token } from "../utils";
export class userController {
  constructor() {}

  static async singUp(req: Request, res: Response): Promise<void> {
    const data = req.body;

    try {
      const result = await new UserService().create(data);

      return successResponseData({
        data: result,
        message: "Successfully Signup",
        res,
      });
    } catch (error: any) {
      return errorResponse({ error, res, statusCode: 400 });
    }
  }
  static async login(req: Request, res: Response): Promise<void> {
    const loginData = req.body;
    try {
      const result = await new UserService().login(loginData);
      const payload = {
        id: result._id,
        Name: result.fullName,
      };
      const accessToken = Token.createAccessToken(payload);
      const refreshToken = Token.createRefreshToken(payload);
      const data = { result, accessToken, refreshToken } as object;
      return successResponseData({
        data,
        message: "Successfully login",
        res,
      });
    } catch (error: any) {
      return errorResponse({ error, res, statusCode: 400 });
    }
  }
  static async update(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const updates = req.body;
    try {
      const updated = await new UserService().update(id, updates);

      return successResponseData({
        data: updated,
        message: "User update Successfully",
        res,
      });
    } catch (error: any) {
      return errorResponse({ error, res, statusCode: 404 });
    }
  }
  static async changePassword(req: Request, res: Response): Promise<void> {
    const data = req.body;
    try {
      const result = await new UserService().changePassword(data);
      return successResponseData({
        data: result,
        message: "Password change Successfully",
        res,
      });
    } catch (error: any) {
      return errorResponse({ error, res, statusCode: 400 });
    }
  }

  static async remove(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    try {
      const isDeleted = await new UserService().delete(id);

      return successResponseData({
        message: "user deleted.",
        res,
      });
    } catch (error: any) {
      return errorResponse({ error, res, statusCode: 404 });
    }
  }

  static async findAll(req: Request, res: Response): Promise<void> {
    let { limit, sort, order, query, page } = req.query;
    sort = sort || defaultSort;
    query = query ? query.toString() : undefined;
    order = order ? order.toString() : defaultOrder.toString();
    const validatedSort: SortEnum = sort as SortEnum;
    const parsedLimit = limit ? parseInt(limit as string) : pgMinLimit;
    const parsedPage = page ? parseInt(page as string) : defaultPage;
    try {
      const result = await new UserService().findAndCountAll({
        limit: parsedLimit,
        page: parsedPage,
        sort: validatedSort,
        order,
        query,
      });

      return successResponseData({
        data: result,
        message: "All user retrieved.",
        res,
      });
    } catch (error: any) {
      return errorResponse({ error, res, statusCode: 400 });
    }
  }
}
