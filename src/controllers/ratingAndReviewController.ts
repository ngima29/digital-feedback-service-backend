import { Request, Response } from "express";
import { RatingAndReviewService } from "../services";
import { successResponseData, errorResponse } from "../utils";
import { SortEnum } from "../enums";
import { defaultOrder, defaultSort, pgMinLimit, defaultPage } from "../config";
import { CustomRequest } from "../middlewares";
export class RatingAndReviewController {
  constructor() {}

  static async create(req: CustomRequest, res: Response): Promise<void> {
    const data = req.body;

    try {
      const userId = req.userId;
      data.user = userId;
      const result = await new RatingAndReviewService().create(data);

      return successResponseData({
        data: result,
        message: "Thank you for your rating and review ",
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
      const updated = await new RatingAndReviewService().update(id, updates);

      return successResponseData({
        data: updated,
        message: "rating and review  update Successfully",
        res,
      });
    } catch (error: any) {
      return errorResponse({ error, res, statusCode: 404 });
    }
  }

  static async remove(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    try {
      const isDeleted = await new RatingAndReviewService().delete(id);

      return successResponseData({
        message: "rating and review  deleted.",
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
      const result = await new RatingAndReviewService().findAndCountAll({
        limit: parsedLimit,
        page: parsedPage,
        sort: validatedSort,
        order,
        query,
      });

      return successResponseData({
        data: result,
        message: "All rating and review  retrieved.",
        res,
      });
    } catch (error: any) {
      return errorResponse({ error, res, statusCode: 400 });
    }
  }
}
