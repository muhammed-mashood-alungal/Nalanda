import { IUserService } from "@/services";
import { IUserController } from "./user.interface.controller";
import { Request, Response, NextFunction } from "express";
import { IFilterOptions } from "@/types";
import { successResponse } from "@/utils";
import { ReasonPhrases, StatusCodes } from "http-status-codes";

export class UserController implements IUserController {
  constructor(private _userServices: IUserService) {}

  async getUsers(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const options: unknown = req.query;
      const users = await this._userServices.getUsers(
        options as IFilterOptions
      );
      successResponse(res, StatusCodes.OK, ReasonPhrases.OK, users);
    } catch (error) {
      next(error);
    }
  }
  async getUserDetailsById(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { userId } = req.params;
      const user = await this._userServices.getUserDetailsById(
        userId as string
      );
      successResponse(res, StatusCodes.OK, ReasonPhrases.OK, user);
    } catch (error) {
      next(error);
    }
  }

  async deleteUser(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { userId } = req.params;
      await this._userServices.updateUserActiveState(userId!, false);
      successResponse(res, StatusCodes.NO_CONTENT, ReasonPhrases.NO_CONTENT);
    } catch (error) {
      next(error);
    }
  }
  async restoreUser(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { userId } = req.params;
      await this._userServices.updateUserActiveState(userId!, true);
      successResponse(res, StatusCodes.NO_CONTENT, ReasonPhrases.NO_CONTENT);
    } catch (error) {
      next(error);
    }
  }

  async updateUser(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const userId = req?.user?.id;
      const updateData = req.body;
      
      const updatedUser = await this._userServices.updateUser(
        userId,
        updateData
      );
      successResponse(res, StatusCodes.OK, ReasonPhrases.OK, updatedUser);
    } catch (error) {
      next(error);
    }
  }
}
