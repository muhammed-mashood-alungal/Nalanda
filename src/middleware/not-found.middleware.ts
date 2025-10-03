import { NextFunction, Request, Response } from "express";
import { createHttpsError } from "../utils";
import { StatusCodes } from "http-status-codes";
import { ERROR } from "@/constants";

export const routeNotFound = (
  _req: Request,
  _res: Response,
  next: NextFunction
) => {
  next(createHttpsError(StatusCodes.NOT_FOUND, ERROR.COMMON.END_POINT_NOT_FOUND));
};
