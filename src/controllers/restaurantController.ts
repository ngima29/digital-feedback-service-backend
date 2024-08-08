import { Request, Response } from "express";
import { RestaurantService } from "../services";
import { successResponseData, errorResponse } from "../utils";
import { SortEnum } from "../enums";
import { defaultOrder, defaultSort, pgMinLimit, defaultPage } from "../config";
import { HttpStatusEnum } from "../enums";
import { Token } from "../utils";
export class RestaurantController {
  constructor() {}

  static async create(req: Request, res: Response): Promise<void> {
    const data = req.body;

    try {
      const result = await new RestaurantService().create(data);

      return successResponseData({
        data: result,
        message: "Restaurant Successfully Created",
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
      const updated = await new RestaurantService().update(id, updates);

      return successResponseData({
        data: updated,
        message: "Restaurant update Successfully",
        res,
      });
    } catch (error: any) {
      return errorResponse({ error, res, statusCode: 404 });
    }
  }

  static async remove(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    try {
      const isDeleted = await new RestaurantService().delete(id);

      return successResponseData({
        message: "Restaurant deleted.",
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
      const result = await new RestaurantService().findAndCountAll({
        limit: parsedLimit,
        page: parsedPage,
        sort: validatedSort,
        order,
        query,
      });

      return successResponseData({
        data: result,
        message: "All restaurant retrieved.",
        res,
      });
    } catch (error: any) {
      return errorResponse({ error, res, statusCode: 400 });
    }
  }
}
