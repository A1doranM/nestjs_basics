import {
    Body,
    Controller,
    Delete,
    Get,
    NotFoundException,
    Param,
    Patch,
    Post,
    Query,
} from "@nestjs/common";
import {CreateUserDto} from "./dtos/create-user.dto";
import {AuthService} from "./auth.service";
import {UsersService} from "../util-modules/users/users.service";
import {UpdateUserDto} from "./dtos/update-user.dto";
import {UserDto} from "./dtos/user.dto";
import {Serialize} from "../interceptors/serialize.interceptor";

@Controller("auth")
@Serialize(UserDto)
export class AuthController {
    private authService: AuthService = null;
    private usersService: UsersService = null;

    constructor(authService: AuthService, usersService: UsersService) {
        this.usersService = usersService;
        this.authService = authService;
    }

    @Post("/signup")
    async signup(@Body() user: CreateUserDto) {
        const newUser = await this.authService.signup(user);
        console.log("createUser: ", newUser);
        return JSON.stringify(newUser);
    }

    @Post("/signin")
    async signin(@Body() user: CreateUserDto) {
        const newUser = await this.authService.signin(user);
        console.log("createUser: ", newUser);
        return JSON.stringify(newUser);
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
