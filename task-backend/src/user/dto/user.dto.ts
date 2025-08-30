import { IsNumber, IsOptional, Min, Max, IsString, IsEmail, MinLength } from 'class-validator';

export class PomodoroSettingsDto {
    @IsNumber()
    @IsOptional()
    @Min(1)
    workInterval?: number;

    @IsNumber()
    @IsOptional()
    @Min(1)
    breakInterval?: number;

    @IsNumber()
    @IsOptional()
    @Min(1)
    @Max(10)
    intervalsCount?: number;

}

export class UserDto extends PomodoroSettingsDto {
    @IsEmail()
    @IsOptional()
    email?: string;

    @IsString()
    @IsOptional()
    name?: string;

    @IsOptional()
    @MinLength(6,{message: 'Password must be at least 6 characters long'})
    @IsString()
    password?: string;
}