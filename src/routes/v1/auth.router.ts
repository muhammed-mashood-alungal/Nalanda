import { AuthController } from "@/controllers";
import { authenticateUser, validateSchema } from "@/middleware";
import { UserRepository } from "@/repositories";
import { AuthService } from "@/services";
import { userLoginSchema, userRegisterSchema } from "@/validations";
import { Router } from "express";

export const authRouter = Router();

const userRepository = new UserRepository();
const authServices = new AuthService(userRepository);
const authController = new AuthController(authServices);

authRouter.post(
  "/register",
  validateSchema(userRegisterSchema),
  authController.register.bind(authController)
);
authRouter.post(
  "/login",
  validateSchema(userLoginSchema),
  authController.login.bind(authController)
);

authRouter.post("/logout", authController.logout.bind(authController));

authRouter.get(
  "/me",
  authenticateUser,
  authController.authMe.bind(authController)
);

authRouter.post(
  "/refresh-token",
  authController.refreshAccessToken.bind(authController)
);
