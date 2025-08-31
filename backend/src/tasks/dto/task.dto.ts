import { IsNumber, IsOptional, Min, Max, IsString, IsEmail, MinLength, IsEnum } from 'class-validator';
import { Priority } from 'generated/prisma';
import { Transform } from 'class-transformer';

export class TaskDto {
    @IsString()
    @IsOptional()
    name: string;

    @IsString()
    @IsOptional()
    isCompleted?: boolean;

    @IsString()
    @IsOptional()
    createdAt?: Date;

    @IsEnum(Priority)
    @IsOptional()
    @Transform(({value}) => ('' + value).toLowerCase())
    priority?: Priority;
}