import { IAuthService } from "@/services";
import { IAuthController } from "./auth.interface.controller";
import { Request, Response, NextFunction } from "express";
import {
  clearCookie,
  setAccessToken,
  setRefreshToken,
  successResponse,
} from "@/utils";
import { ReasonPhrases, StatusCodes } from "http-status-codes";
import { SUCCESS } from "@/constants";

export class AuthController implements IAuthController {
  constructor(private _authService: IAuthService) {}

  async register(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const userData = req.body;
      const authResponse = await this._authService.registerUser(userData);

      setAccessToken(res, authResponse.accessToken);
      setRefreshToken(res, authResponse.refreshToken);

      successResponse(
        res,
        StatusCodes.CREATED,
        SUCCESS.AUTH.SIGNUP_SUCCESS,
        authResponse
      );
    } catch (error) {
      next(error);
    }
  }

  async login(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const loginData = req.body;
      const authResponse = await this._authService.loginUser(loginData);

      setAccessToken(res, authResponse.accessToken);
      setRefreshToken(res, authResponse.refreshToken);

      successResponse(
        res,
        StatusCodes.OK,
        SUCCESS.AUTH.LOGIN_SUCCESS,
        authResponse
      );
    } catch (error) {
      next(error);
    }
  }
  async logout(
    _req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      clearCookie(res, "accessToken");
      clearCookie(res, "refreshToken");
      successResponse(
        res,
        StatusCodes.OK,
        SUCCESS.AUTH.LOGGED_OUT,
        ReasonPhrases.OK
      );
    } catch (error) {
      next(error);
    }
  }

  async refreshAccessToken(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const authResponse = await this._authService.refreshAccessToken(
        req.body.refreshToken
      );

      setAccessToken(res, authResponse.accessToken);
      setRefreshToken(res, authResponse.refreshToken);
      successResponse(
        res,
        StatusCodes.OK,
        SUCCESS.AUTH.LOGIN_SUCCESS,
        authResponse
      );
    } catch (error) {
      next(error);
    }
  }

  async authMe(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const userId = req.user?.id;
      const user = await this._authService.authMe(userId!);
      successResponse(res, StatusCodes.OK, ReasonPhrases.OK, user);
    } catch (error) {
      next(error);
    }
  }
}
