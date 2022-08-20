import {IsEmail, IsNotEmpty, IsString} from "class-validator";

export class CreateUserDto {
    id: string

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsString()
    password: string;
}
