import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateBookDto {
    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    @IsNotEmpty()
    description: string;

    @IsString()
    @IsNotEmpty()
    author: string;

    @IsNumber()
    @IsNotEmpty()
    publishedYear: number;

    @IsNumber()
    @IsNotEmpty()
    quantity: number;
}
