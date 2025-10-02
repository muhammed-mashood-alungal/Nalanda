import { userLoginSchema, userRegisterSchema } from "@/validations";
import z from "zod";

export type UserRegisterDto = z.infer<typeof userRegisterSchema>;
export type UserLoginDto = z.infer<typeof userLoginSchema>;

export interface UserResponseDto {
  id: string;
  email: string;
  isActive: boolean;
  membershipDate: string;
}

