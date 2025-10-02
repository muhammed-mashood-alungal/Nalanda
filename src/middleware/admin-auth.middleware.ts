import { errorResponse } from "@/utils";
import { RequestHandler } from "express";
import { ReasonPhrases, StatusCodes } from "http-status-codes";

export const authorizeAdmin: RequestHandler = async (req, res, next) => {
  if (req?.user?.role != "admin") {
    errorResponse(res, StatusCodes.UNAUTHORIZED, ReasonPhrases.UNAUTHORIZED);
    return;
  }
  next();
};
