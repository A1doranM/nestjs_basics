import {
    Body,
    Controller,
    Get,
    Param,
    Post, Req
} from "@nestjs/common";
import {CreateUserDto} from "./dtos/create-user.dto";
import {AuthService} from "./auth.service";
import {UserDto} from "./dtos/user.dto";
import {Serialize} from "../interceptors/serialize.interceptor";
import {FastifyRequest} from "fastify";
import {Session} from "../util-modules/decorators/session.decorator";
import {CurrentUser} from "../util-modules/decorators/current-user.decorator";

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
        session.userId = user.id;
        return JSON.stringify(newUser);
    }

    @Post("/signin")
    async signin(@Body() user: CreateUserDto, @Session() session: any) {
        const newUser = await this.authService.signin(user);
        session.userId = user.id;
        return JSON.stringify(newUser);
    }

    @Post("/signout")
    async signout(@Session() session: any) {
        session.userId = null;
    }


    @Get("whoami")
    whoAmI(@CurrentUser() user: string) {
        return user;
    }

    @Get("/colors/:color")
    setColor(@Param("color") color: string, @Req() request: FastifyRequest) {
        console.log("Color: ", color, request["session"]);
        request["session"].set("color", color);
    }

    @Get("/colors")
    getColor(@Req() request: FastifyRequest) {
        return request["session"].get("color");
    }

    //
    // @Get("/:id")
    // async findUser(@Param("id") id: string) {
    //     const user = await this.usersService.findById(parseInt(id, 10));
    //     if (!user) {
    //         throw new NotFoundException("User not found!");
    //     }
    //     return user;
    // }
    //
    // @Get()
    // findAllUsers(@Query("email") email: string) {
    //     return this.usersService.findByEmail(email);
    // }
    //
    // @Delete("/:id")
    // deleteUser(@Param("id") id: string) {
    //     return this.usersService.removeById(parseInt(id, 10));
    // }
    //
    // @Patch("/:id")
    // updateUser(@Param("id") id: string, @Body() body: UpdateUserDto) {
    //     return this.usersService.updateById(parseInt(id, 10), body);
    // }
}
