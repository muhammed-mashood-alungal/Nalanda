import { UserController } from "@/controllers";
import { authenticateUser, validateSchema } from "@/middleware";
import { authorizeAdmin } from "@/middleware";
import { UserRepository } from "@/repositories";
import { UserService } from "@/services";
import { userUpdationSchema } from "@/validations";
import { Router } from "express";

export const userRouter = Router();

const userRepository = new UserRepository();
const userServices = new UserService(userRepository);
const userController = new UserController(userServices);

userRouter.get(
  "/",
  authenticateUser,
  authorizeAdmin,
  userController.getUsers.bind(userController)
);
userRouter.delete(
  "/:userId",
  authenticateUser,
  authorizeAdmin,
  userController.deleteUser.bind(userController)
);
userRouter.put(
  "/:userId/restore",
  authenticateUser,
  authorizeAdmin,
  userController.restoreUser.bind(userController)
);

userRouter.get(
  "/:userId",
  authenticateUser,
  userController.getUserDetailsById.bind(userController)
);

userRouter.put(
  "/:userId",
  validateSchema(userUpdationSchema),
  userController.updateUser.bind(userController)
);
