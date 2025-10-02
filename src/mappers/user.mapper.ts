import { UserResponseDto } from "@/dtos";
import { IUserDocument } from "@/models";

export class UserMapper {
    static toResponse(user : IUserDocument) : UserResponseDto{
        return {
            id : user._id?.toString(),
            email : user.email,
            isActive : user.isActive,
            membershipDate : user.membershipDate?.toISOString(),
        }
    }
}