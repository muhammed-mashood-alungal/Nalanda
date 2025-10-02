import { UserRegisterDto } from "@/dtos";
import { IUserDocument } from "@/models";
import { IFilterOptions } from "@/types";
import { UpdateQuery } from "mongoose";

export interface IUserRepository {
  createUser(userData: UserRegisterDto): Promise<IUserDocument>;
  getUserByEmail(email: string): Promise<IUserDocument | null>;
  getUserById(id: string): Promise<IUserDocument | null>;
  updateUserActiveState(id: string, newStatus: boolean): Promise<void>;
  getUsers(
    options?: IFilterOptions
  ): Promise<{ users: IUserDocument[]; totalCount: number }>;
  updateUser(
    userId: string,
    update: UpdateQuery<IUserDocument>
  ): Promise<IUserDocument | null>;
}
