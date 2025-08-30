import { IsNumber, IsOptional, Min, Max, IsString, IsEmail, MinLength, IsEnum } from 'class-validator';
import { Priority } from 'generated/prisma';
import { Transform } from 'class-transformer';

export class TimeBlockDto {
    @IsString()
	name: string

	@IsOptional()
	@IsString()
	color?: string

	@IsNumber()
	duration: number

	@IsNumber()
	@IsOptional()
	order: number
}