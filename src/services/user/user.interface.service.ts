import { UserResponseDto, UserUpdateDto } from "@/dtos";
import { IFilterOptions, IPagination } from "@/types";

export interface IUserService {
  updateUserActiveState(id: string, status: boolean): Promise<void>;
  getUserDetailsById(id: string): Promise<UserResponseDto>;
  getUsers(options?: IFilterOptions): Promise<IPagination<UserResponseDto>>;
  updateUser(
      userId: string,
      update: UserUpdateDto
    ): Promise<UserResponseDto>
}
