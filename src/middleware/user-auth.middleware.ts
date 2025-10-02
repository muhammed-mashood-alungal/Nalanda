import { RequestHandler } from "express";
import { errorResponse, verifyAccessToken } from "@/utils";
import { ReasonPhrases, StatusCodes } from "http-status-codes";

export const authenticateUser: RequestHandler = async (req, res, next) => {
  const accessToken = req.cookies.accessToken;
  if (!accessToken) {
    errorResponse(res, StatusCodes.UNAUTHORIZED, ReasonPhrases.UNAUTHORIZED);
    return;
  }
  try {
    const decoded = await verifyAccessToken(accessToken);
    if (!decoded) {
      return errorResponse(
        res,
        StatusCodes.UNAUTHORIZED,
        ReasonPhrases.UNAUTHORIZED
      );
    }
    req.user = decoded;
    next();
  } catch {
    return errorResponse(
      res,
      StatusCodes.UNAUTHORIZED,
      ReasonPhrases.UNAUTHORIZED
    );
  }
};
