import { IUserRepository } from "@/repositories";
import { IUserService } from "./user.interface.service";
import { UserResponseDto } from "@/dtos";
import { createHttpsError, paginate } from "@/utils";
import { StatusCodes } from "http-status-codes";
import { ERROR } from "@/constants";
import { UserMapper } from "@/mappers";
import { IFilterOptions, IPagination } from "@/types";

export class UserService implements IUserService {
  constructor(private _userRepository: IUserRepository) {}

  async getUserDetailsById(id: string): Promise<UserResponseDto> {
    const user = await this._userRepository.getUserById(id);
    if (!user) {
      throw createHttpsError(StatusCodes.NOT_FOUND, ERROR.USER.NOT_FOUND);
    }
    return UserMapper.toResponse(user);
  }

  async getUsers(
    options?: IFilterOptions
  ): Promise<IPagination<UserResponseDto>> {
    const { users, totalCount } = await this._userRepository.getUsers(options);

    const mappedUsers = users.map(UserMapper.toResponse);

    const paginatedData = paginate(
      mappedUsers,
      totalCount,
      Number(options?.page),
      Number(options?.limit)
    );

    return paginatedData;
  }
  async updateUserActiveState(id: string, status: boolean): Promise<void> {
    await this._userRepository.updateUserActiveState(id, status);
  }
}
