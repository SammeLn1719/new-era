import { IsNumber, IsOptional, Min, Max, IsString, IsEmail, MinLength, IsEnum, IsBoolean } from 'class-validator';
import { Priority } from 'generated/prisma';
import { Transform } from 'class-transformer';

export class PomodoroRoundDto {
    @IsNumber()
    totalSeconds: number;

    @IsOptional()
    @IsBoolean()
    IsCompleted: boolean;
}   