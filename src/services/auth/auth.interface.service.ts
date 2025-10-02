import {
  UserRegisterDto,
  UserLoginDto,
  AuthResponseDto,
  UserResponseDto,
} from "@/dtos";

export interface IAuthService {
  registerUser(userData: UserRegisterDto): Promise<AuthResponseDto>;
  loginUser(userData: UserLoginDto): Promise<AuthResponseDto>;
  authMe(userId: string): Promise<UserResponseDto>;
  refreshAccessToken(refreshToken: string): Promise<AuthResponseDto>;
}
