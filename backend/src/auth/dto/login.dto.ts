import { IsEmail, IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";

export class LoginDto {
    @IsEmail()
    @IsNotEmpty()
    @MaxLength(150)
    email: string

    @IsString()
    @IsNotEmpty()
    @MinLength(6)
    @MaxLength(100)
    password: string
}