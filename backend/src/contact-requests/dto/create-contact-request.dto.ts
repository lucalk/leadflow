import { IsEmail, IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator'

export class CreateContactRequestDto{
    @IsString()
    @IsNotEmpty()
    @MinLength(2)
    @MaxLength(100)
    name!: string

    @IsEmail()
    @IsNotEmpty()
    @MaxLength(150)
    email!: string

    @IsString()
    @IsNotEmpty()
    @MinLength(10)
    @MaxLength(2000)
    message!: string
}