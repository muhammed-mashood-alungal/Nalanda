import { UserResponseDto } from "@/dtos";

export type AuthResponseDto = {
  user: UserResponseDto;
  accessToken: string;
  refreshToken: string;
};
