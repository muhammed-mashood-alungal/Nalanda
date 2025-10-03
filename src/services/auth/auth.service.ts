import { IUserRepository } from "@/repositories";
import { IAuthService } from "./auth.interface.service";
import {
  AuthResponseDto,
  UserLoginDto,
  UserRegisterDto,
  UserResponseDto,
} from "@/dtos";
import { ReasonPhrases, StatusCodes } from "http-status-codes";
import { ERROR } from "@/constants";
import {
  comparePassword,
  createHttpsError,
  generateAccesToken,
  generateRefreshToken,
  hashPassword,
  verifyRefreshToken,
} from "@/utils";
import { UserMapper } from "@/mappers";

export class AuthService implements IAuthService {
  constructor(private _userRepository: IUserRepository) {}

  async registerUser(userData: UserRegisterDto): Promise<AuthResponseDto> {
    const isUserExist = await this._userRepository.getUserByEmail(
      userData.email
    );
    if (isUserExist) {
      throw createHttpsError(StatusCodes.CONFLICT, ERROR.USER.USER_EXISTS);
    }

    const hashedPassword = await hashPassword(userData.password);
    userData.password = hashedPassword;

    const newUser = await this._userRepository.createUser(userData);

    const payload = {
      id: newUser._id.toString(),
      role: newUser.role,
    };
    const accessToken = generateAccesToken(payload);
    const refreshToken = generateRefreshToken(payload);

    return { user: UserMapper.toResponse(newUser), accessToken, refreshToken };
  }

  async loginUser(userData: UserLoginDto): Promise<AuthResponseDto> {
    const user = await this._userRepository.getUserByEmail(userData.email);
    if (!user) {
      throw createHttpsError(
        StatusCodes.UNAUTHORIZED,
        ERROR.USER.INVALID_CREDENTIALS
      );
    }
    if (!user.isActive) {
      throw createHttpsError(StatusCodes.FORBIDDEN, ERROR.USER.USER_BLOCKED);
    }

    const isMatch = await comparePassword(
      userData.password,
      user.password.toString()
    );
    if (!isMatch) {
      createHttpsError(
        StatusCodes.UNAUTHORIZED,
        ERROR.USER.INVALID_CREDENTIALS
      );
    }
    const payload = {
      id: user._id.toString(),
      role: user.role,
    };

    const accessToken = generateAccesToken(payload);
    const refreshToken = generateRefreshToken(payload);
    return { user: UserMapper.toResponse(user), accessToken, refreshToken };
  }

  async refreshAccessToken(refreshToken: string): Promise<AuthResponseDto> {
    const payload = await verifyRefreshToken(refreshToken);

    if (!payload) {
      throw createHttpsError(
        StatusCodes.UNAUTHORIZED,
        ReasonPhrases.UNAUTHORIZED
      );
    }

    const user = await this._userRepository.getUserById(payload.id);
    if (!user || !user.isActive) {
      throw createHttpsError(
        StatusCodes.UNAUTHORIZED,
        ReasonPhrases.UNAUTHORIZED
      );
    }
    const newPayload = {
      id: payload.id,
      role: payload.role,
    };
    const newAccessToken = await generateAccesToken(newPayload);
    const newRefreshToken = await generateRefreshToken(newPayload);

    return {
      user: UserMapper.toResponse(user),
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
    };
  }
  async authMe(userId: string): Promise<UserResponseDto> {
    const user = await this._userRepository.getUserById(userId);
    if (!user || !user.isActive) {
      throw createHttpsError(
        StatusCodes.UNAUTHORIZED,
        ReasonPhrases.UNAUTHORIZED
      );
    }
    return UserMapper.toResponse(user);
  }
}
