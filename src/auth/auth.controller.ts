import {
    Body,
    Controller,
    Get,
    Param,
    Post, Req, UseGuards
} from "@nestjs/common";
import {CreateUserDto} from "./dtos/create-user.dto";
import {AuthService} from "./auth.service";
import {UserDto} from "./dtos/user.dto";
import {Serialize} from "../interceptors/serialize.interceptor";
import {FastifyRequest} from "fastify";
import {Session} from "../util-modules/decorators/session.decorator";
import {CurrentUser} from "../util-modules/decorators/current-user.decorator";
import {AuthGuard} from "./guards/auth.guard";

@Controller("auth")
@Serialize(UserDto)
export class AuthController {
    private authService: AuthService = null;

    constructor(authService: AuthService) {
        this.authService = authService;
    }

    @Post("/signup")
    async signup(@Body() user: CreateUserDto, @Session() session: any) {
        const newUser = await this.authService.signup(user);
        session.userId = newUser.id;
        return JSON.stringify(newUser);
    }

    @Post("/signin")
    async signin(@Body() user: CreateUserDto, @Session() session: any) {
        const signedInUser = await this.authService.signin(user);
        session.userId = signedInUser.id;
        return JSON.stringify(signedInUser);
    }

    @Post("/signout")
    async signout(@Session() session: any) {
        session.userId = null;
    }


    @Get("whoami")
    @UseGuards(AuthGuard)
    whoAmI(@CurrentUser() user: string, @Session() session: any) {
        return user;
    }

}
