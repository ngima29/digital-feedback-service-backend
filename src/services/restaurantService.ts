import {
  RestaurantInterface,
  ArgsRestaurantInterface,
  InputRestaurantInterface,
} from "../interfaces";
import { RestaurantModel, RatingAndReviewModel } from "../models";
import slug from "slug";
export class RestaurantService {
  async create(input: InputRestaurantInterface): Promise<RestaurantInterface> {
    const slugData = `${input.name} ${input.address}`;
    const inputSlug = slug(slugData);
    const dataExists = await RestaurantModel.findOne({
      slug: inputSlug,
      deletedAt: null,
    });
    if (dataExists) {
      throw new Error(` ${input.name} is already exists!`);
    }
    if (!input.owner) {
      input.owner = undefined;
    }
    if (input.phoneNumber) {
      const phoneExists = await RestaurantModel.findOne({
        phoneNumber: input.phoneNumber,
        deletedAt: null,
      });
      if (phoneExists) {
        throw new Error(` ${input.phoneNumber} is already exists!`);
      }
    }
    input.slug = inputSlug;
    const created = await RestaurantModel.create(input);
    return created;
  }

  async update(
    id: string,
    updates: Partial<InputRestaurantInterface>
  ): Promise<RestaurantInterface | null> {
    const dataExists = await RestaurantModel.findOne({
      _id: id,
      deletedAt: null,
    });
    if (!dataExists) {
      throw new Error(`Given id: ${id} is not found or already deleted`);
    }
    if (!updates.owner) {
      updates.owner = undefined;
    }
    if (updates.name && updates.address) {
      const slugData = `${updates.name} ${updates.address}`;
      const inputSlug = slug(slugData);
      const dataExists = await RestaurantModel.findOne({
        _id: { $ne: id },
        slug: inputSlug,
        deletedAt: null,
      });
      if (dataExists) {
        throw new Error(` ${updates.name} is already exists!`);
      }
    }
    if (updates.phoneNumber) {
      const phoneExists = await RestaurantModel.findOne({
        _id: { $ne: id },
        phoneNumber: updates.phoneNumber,
        deletedAt: null,
      });
      if (phoneExists) {
        throw new Error(` ${updates.phoneNumber} is already exists!`);
      }
    }
    const updatedData = await RestaurantModel.findByIdAndUpdate(id, updates, {
      new: true,
    });
    if (!updatedData) {
      throw new Error(`Failed to update id : ${id} `);
    }

    return updatedData;
  }

  async delete(id: string): Promise<any> {
    const dataExist = await RestaurantModel.findOne({
      _id: id,
      deletedAt: null,
    });
    if (!dataExist) {
      throw new Error(`Given id: ${id} is not found or already deleted`);
    }

    const deleted = await RestaurantModel.findByIdAndUpdate(
      id,
      { $set: { deletedAt: new Date() } },
      { new: true }
    );
    await RatingAndReviewModel.updateMany(
      {
        restaurant: id,
        deletedAt: null,
      },
      {
        $set: {
          deletedAt: new Date(),
        },
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
  }: ArgsRestaurantInterface): Promise<RestaurantInterface[]> {
    try {
      const filter: any = { deletedAt: null };

      if (query) {
        filter.name = { $regex: query, $options: "i" };
      }

      const options = {
        page: page,
        limit: limit,
        select: "-deletedAt -password",
        sort: { averageRating: -1 },
        lean: true,
        leanWithId: false,
      };

      const result = await RestaurantModel.paginate(filter, options);
      return result;
    } catch (error: any) {
      throw error;
    }
  }
  async getMyRestaurant(ownerId: string) {
    const dataExists = await RestaurantModel.findOne({
      owner: ownerId,
      deletedAt: null,
    });
    if (!dataExists) {
      console.log("Restaurant Does not exist");
    }
    return dataExists;
  }
}
