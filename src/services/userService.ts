import {
  UserInterface,
  ArgsUserInterface,
  InputUserInterface,
  UserLogin,
  ChangePassword,
} from "../interfaces";
import { UserModel, RatingAndReviewModel, RestaurantModel } from "../models";
import { Password } from "../utils";
import { RoleEnum } from "../enums";
export class UserService {
  async create(input: InputUserInterface): Promise<UserInterface> {
    const dataExists = await UserModel.findOne({
      email: input.email,
      deletedAt: null,
    });
    if (dataExists) {
      throw new Error(`Email: ${input.email} is already exists!`);
    }
    const hashedPassword = await Password.generate(input.password);
    input.password = hashedPassword;
    const created = await UserModel.create(input);
    return created;
  }
  async login(input: UserLogin): Promise<UserInterface> {
    try {
      const emailExist = await UserModel.findOne({
        email: input.email,
        deletedAt: null,
      })
        .select("-deletedAt")
        .lean();

      if (!emailExist) throw new Error(`${input.email} does not exist`);

      const isMatch = await Password.validate(
        input.password,
        emailExist.password
      );
      if (!isMatch) throw new Error("Incorrect password!");
      return emailExist;
    } catch (error: any) {
      throw new Error(`${error.message}`);
    }
  }
  async changePassword(input: ChangePassword): Promise<UserInterface> {
    const emailExist = await UserModel.findOne({
      officeEmail: input.email,
      deletedAt: null,
    });
    if (!emailExist) throw new Error(`${input.email} does not exist`);

    const isMatch = await Password.validate(
      input.oldPassword,
      emailExist.password
    );
    if (!isMatch) throw new Error("incorrect password!!! try agin");
    const hashedPassword = await Password.generate(input.newPassword);
    const updates = {
      password: hashedPassword,
      isDefault: false,
    };
    const updatedEmployee = await UserModel.findByIdAndUpdate(
      emailExist._id,
      updates,
      { new: true }
    ).select("-password -deletedAt -otp -secret");
    if (!updatedEmployee) throw new Error(`Failed to change password `);
    return updatedEmployee;
  }
  async update(
    id: string,
    updates: Partial<InputUserInterface>
  ): Promise<UserInterface | null> {
    const dataExists = await UserModel.findOne({
      _id: id,
      deletedAt: null,
    });
    if (!dataExists) {
      throw new Error(`Given id: ${id} is not found or already deleted`);
    }

    const updatedData = await UserModel.findByIdAndUpdate(id, updates, {
      new: true,
    });
    if (!updatedData) {
      throw new Error(`Failed to update id : ${id} `);
    }

    return updatedData;
  }

  async delete(id: string): Promise<any> {
    const dataExist = await UserModel.findOne({
      _id: id,
      deletedAt: null,
    });
    if (!dataExist) {
      throw new Error(`Given id: ${id} is not found or already deleted`);
    }

    const deleted = await UserModel.findByIdAndUpdate(
      id,
      { $set: { deletedAt: new Date() } },
      { new: true }
    );
    if (dataExist.role === RoleEnum.Customer) {
      await RatingAndReviewModel.updateMany(
        {
          user: id,
          deletedAt: null,
        },
        {
          $set: {
            deletedAt: new Date(),
          },
        }
      );
    }
    if (dataExist.role === RoleEnum.Owner) {
      await RestaurantModel.updateMany(
        {
          owner: id,
          deletedAt: null,
        },
        {
          $set: {
            owner: undefined,
          },
        }
      );
    }

    return deleted;
  }

  async getUser(id: string): Promise<UserInterface> {
    try {
      const dataExist = await UserModel.findOne({
        _id: id,
        deletedAt: null,
      });

      if (!dataExist) {
        throw new Error(`User id : ${id} is not found`);
      }
      return dataExist;
    } catch (error: any) {
      throw new Error(`Error fetching user: ${error.message}`);
    }
  }

  async findAndCountAll({
    page,
    limit,
    query,
    sort,
    order,
  }: ArgsUserInterface): Promise<UserInterface[]> {
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

      const result = await UserModel.paginate(filter, options);
      return result;
    } catch (error: any) {
      throw error;
    }
  }
}
