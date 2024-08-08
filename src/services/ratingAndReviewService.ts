import {
  RatingAndReviewInterface,
  ArgsRatingAndReviewInterface,
  InputRatingAndReviewInterface,
} from "../interfaces";
import { RatingAndReviewModel, RestaurantModel } from "../models";
export class RatingAndReviewService {
  async create(
    input: InputRatingAndReviewInterface //ratingAndReview
  ): Promise<RatingAndReviewInterface> {
    const dataExists = await RatingAndReviewModel.findOne({
      user: input.user,
      restaurant: input.restaurant,
      deletedAt: null,
    });
    if (dataExists) {
      throw new Error(`You have already given rating for this restaurant!`);
    }
    const created = await RatingAndReviewModel.create(input);
    const result = await RatingAndReviewModel.aggregate([
      {
        $match: { restaurant: created.restaurant },
      },
      {
        $group: {
          _id: "$restaurant",
          averageRating: { $avg: "$rating" },
        },
      },
    ]);
    const avgRating =
      result.length === 0 ? 0 : Math.ceil(result[0].averageRating);
    await RestaurantModel.findByIdAndUpdate(
      created.restaurant,
      { averageRating: avgRating },
      {
        new: true,
      }
    );

    return created;
  }

  async update(
    id: string,
    updates: Partial<InputRatingAndReviewInterface>
  ): Promise<RatingAndReviewInterface | null> {
    const dataExists = await RatingAndReviewModel.findOne({
      _id: id,
      deletedAt: null,
    });
    if (!dataExists) {
      throw new Error(`Given id: ${id} is not found or already deleted`);
    }

    const updatedData = await RatingAndReviewModel.findByIdAndUpdate(
      id,
      updates,
      {
        new: true,
      }
    );
    if (!updatedData) {
      throw new Error(`Failed to update id : ${id} `);
    }
    if (dataExists.rating !== updates.rating) {
      const result = await RatingAndReviewModel.aggregate([
        {
          $match: { restaurant: dataExists.restaurant },
        },
        {
          $group: {
            _id: "$restaurant",
            averageRating: { $avg: "$rating" },
          },
        },
      ]);
      const avgRating =
        result.length === 0 ? 0 : Math.ceil(result[0].averageRating);
      await RestaurantModel.findByIdAndUpdate(
        dataExists.restaurant,
        { averageRating: avgRating },
        {
          new: true,
        }
      );
    }
    return updatedData;
  }

  async delete(id: string): Promise<any> {
    const dataExist = await RatingAndReviewModel.findOne({
      _id: id,
      deletedAt: null,
    });
    if (!dataExist) {
      throw new Error(`Given id: ${id} is not found or already deleted`);
    }

    const deleted = await RatingAndReviewModel.findByIdAndUpdate(
      id,
      { $set: { deletedAt: new Date() } },
      { new: true }
    );
    const result = await RatingAndReviewModel.aggregate([
      {
        $match: { restaurant: dataExist.restaurant },
      },
      {
        $group: {
          _id: "$restaurant",
          averageRating: { $avg: "$rating" },
        },
      },
    ]);
    const avgRating =
      result.length === 0 ? 0 : Math.ceil(result[0].averageRating);
    await RestaurantModel.findByIdAndUpdate(
      dataExist.restaurant,
      { averageRating: avgRating },
      {
        new: true,
      }
    );
    return deleted;
  }

  async findAndCountAll({
    page,
    limit,
    query,
    sort,
    order,
  }: ArgsRatingAndReviewInterface): Promise<RatingAndReviewInterface[]> {
    try {
      const filter: any = { deletedAt: null };

      if (query) {
        filter.fullName = { $regex: query, $options: "i" };
      }

      const options = {
        page: page,
        limit: limit,
        select: "-deletedAt -password",
        sort: { createdAt: -1 },
        lean: true,
        leanWithId: false,
        populate: [
          { path: "restaurant" },
          { path: "user" },
          { path: "reply.userId", select: "fullName" },
        ],
      };

      const result = await RatingAndReviewModel.paginate(filter, options);
      return result;
    } catch (error: any) {
      throw error;
    }
  }

  async myRestaurantRatingAndReview({
    page,
    limit,
    query,
    sort,
    order,
    ownerId,
  }: ArgsRatingAndReviewInterface): Promise<RatingAndReviewInterface[]> {
    try {
      const filter: any = { deletedAt: null };

      if (query) {
        filter.fullName = { $regex: query, $options: "i" };
      }

      const options = {
        page: page,
        limit: limit,
        select: "-deletedAt -password",
        sort: { createdAt: -1 },
        lean: true,
        leanWithId: false,
      };

      const result = await RatingAndReviewModel.paginate(filter, options);
      return result;
    } catch (error: any) {
      throw error;
    }
  }

  async getRestaurantRatingAndReview(
    restaurantId: string
  ): Promise<RatingAndReviewInterface[]> {
    try {
      const result = await RatingAndReviewModel.find({
        restaurant: restaurantId,
        deletedAt: null,
      })
        .populate("user")
        .populate("restaurant")
        .populate("reply");

      return result;
    } catch (error: any) {
      throw error;
    }
  }
}
