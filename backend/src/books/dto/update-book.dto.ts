import { IsOptional, IsString, IsNumber, IsNotEmpty } from 'class-validator';

export class UpdateBookDto {
    @IsOptional()
    @IsString()
    @IsNotEmpty()
    title?: string;

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    description?: string;

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    author?: string; 

    @IsOptional()
    @IsNumber()
    @IsNotEmpty()
    publishedYear?: number;

    @IsOptional()
    @IsNumber()
    @IsNotEmpty()
    quantity?: number;
}
