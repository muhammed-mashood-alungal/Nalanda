import { ERROR } from "@/constants";
import z from "zod";

export const userRegisterSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, ERROR.USER.NAME_MIN_LENGTH)
    .max(50, ERROR.USER.NAME_MAX_LENGTH),
  email: z.string().email(ERROR.USER.VALID_EMAIL),
  password: z.string().trim().min(6, ERROR.USER.MIN_PASSWORD_LENGTH),
});

export const userLoginSchema = z.object({
  email: z.string().email(ERROR.USER.VALID_EMAIL),
  password: z.string().trim().min(6, ERROR.USER.MIN_PASSWORD_LENGTH),
});
