import { IUserDocument, User } from "@/models";
import { BaseRepository } from "../base.repository";
import { IUserRepository } from "./user.interface.repository";
import { UserRegisterDto } from "@/dtos";
import { FilterQuery, UpdateQuery } from "mongoose";
import { IFilterOptions } from "@/types";

export class UserRepository
  extends BaseRepository<IUserDocument>
  implements IUserRepository
{
  constructor() {
    super(User);
  }

  async createUser(userData: UserRegisterDto): Promise<IUserDocument> {
    return await this.create(userData);
  }
  async getUserByEmail(email: string): Promise<IUserDocument | null> {
    return await this.findOne({ email });
  }
  async getUserById(id: string): Promise<IUserDocument | null> {
    return await this.findById(id);
  }

  async updateUserActiveState(id: string, newStatus: boolean): Promise<void> {
    await this.findByIdAndUpdate(id, { isActive: newStatus });
  }

  async getUsers(
    options?: IFilterOptions
  ): Promise<{ users: IUserDocument[]; totalCount: number }> {
    const filter: FilterQuery<IUserDocument> = {};
    if (options?.search) {
      filter.name = { $regex: options.search, $options: "i" };
      filter.email = { $regex: options.search, $options: "i" };
    }
    if (options?.status != undefined) {
      filter.isActive = options.status;
    }

    const [users, totalCount] = await Promise.all([
      this.findAndpaginate(filter),
      this.count(filter),
    ]);

    return { users, totalCount };
  }

  async updateUser(
    userId: string,
    update: UpdateQuery<IUserDocument>
  ): Promise<IUserDocument | null> {
    return await this.updateUser(userId, update);
  }
}
