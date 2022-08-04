import {Body, Controller, Post} from '@nestjs/common';
import {CreateUserDto} from "./dtos/create-user.dto";
import {AuthService} from "./auth.service";

@Controller('auth')
export class AuthController {
    private service: AuthService = null;

    constructor(service: AuthService) {
        this.service = service;
    }

    @Post('/signup')
    async createUser(@Body() user: CreateUserDto) {
        const newUser = await this.service.create(user);
        console.log('createUser: ', newUser);
        return JSON.stringify(newUser);
    }

}
