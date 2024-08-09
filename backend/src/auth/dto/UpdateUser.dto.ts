import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator"
import { Role } from "src/Enums/UserEnum";

export class UpdateUserDto {

    @IsNumber()
    @IsNotEmpty()
    id: number

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    email?: string;

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    password?: string;

    @IsOptional()
    @IsEnum(Role)
    role?: Role = Role.MEMBER
}