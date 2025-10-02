import { UserRegisterDto } from "@/dtos";
import { IUserDocument } from "@/models";

export interface IUserRepository {
  createUser(userData: UserRegisterDto): Promise<IUserDocument>;
  getUserByEmail(email: string): Promise<IUserDocument | null>;
  getUserById(id: string): Promise<IUserDocument | null>;
}
