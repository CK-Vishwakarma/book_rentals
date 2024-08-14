import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator"
import { Role } from "src/Enums/UserEnum";

export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsString()
    @IsNotEmpty()
    password: string;

    @IsEnum(Role)
    @IsOptional()
    role: Role = Role.MEMBER
}