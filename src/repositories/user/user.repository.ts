import { IUserDocument, User } from "@/models";
import { BaseRepository } from "../base.repository";
import { IUserRepository } from "./user.interface.repository";
import { UserRegisterDto } from "@/dtos";

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
}
