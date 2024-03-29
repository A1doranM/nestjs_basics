import {
    Body,
    Controller,
    Get,
    Post, UseGuards
} from "@nestjs/common";
import {CreateUserDto} from "./dtos/create-user.dto";
import {AuthService} from "./auth.service";
import {UserDto} from "./dtos/user.dto";
import {Serialize} from "../util-modules/interceptors/serialize.interceptor";
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
        session.set("userId", newUser.id);
        return JSON.stringify(newUser);
    }

    @Post("/signin")
    async signin(@Body() user: CreateUserDto, @Session() session: any) {
        const signedInUser = await this.authService.signin(user);
        session.set("userId", signedInUser.id);
        return JSON.stringify(signedInUser);
    }

    @Post("/signout")
    async signout(@Session() session: any) {
        session.userId = null;
    }


    @Get("whoami")
    @UseGuards(AuthGuard)
    whoAmI(@CurrentUser() user: string) {
        return user;
    }

}
