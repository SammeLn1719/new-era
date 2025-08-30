import { IsNumber, IsOptional, Min, Max, IsString, IsEmail, MinLength, IsEnum, IsBoolean } from 'class-validator';
import { Priority } from 'generated/prisma';
import { Transform } from 'class-transformer';

export class PomodoroSessionDto {
    @IsBoolean()
    @IsOptional()
    isCompleted: boolean;
}   