import {
  userLoginSchema,
  userRegisterSchema,
  userUpdationSchema,
} from "@/validations";
import z from "zod";

export type UserRegisterDto = z.infer<typeof userRegisterSchema>;
export type UserLoginDto = z.infer<typeof userLoginSchema>;
export type UserUpdateDto = z.infer<typeof userUpdationSchema>;


export interface UserResponseDto {
  id: string;
  email: string;
  isActive: boolean;
  membershipDate: string;
}
