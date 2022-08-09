import {
    Body,
    ClassSerializerInterceptor,
    Controller,
    Delete,
    Get,
    NotFoundException,
    Param,
    Patch,
    Post,
    Query, UseInterceptors
} from "@nestjs/common";
import {CreateUserDto} from "./dtos/create-user.dto";
import {AuthService} from "./auth.service";
import {UsersService} from "../util-modules/users/users.service";
import {UpdateUserDto} from "./dtos/update-user.dto";
import {SerializeInterceptor} from "../interceptors/serialize.interceptor";

@Controller("auth")
export class AuthController {
    private service: AuthService = null;
    private usersService: UsersService = null;

    constructor(service: AuthService, usersService: UsersService) {
        this.usersService = usersService;
    }

    @Post("/signup")
    async createUser(@Body() user: CreateUserDto) {
        const newUser = await this.usersService.create(user);
        console.log("createUser: ", newUser);
        return JSON.stringify(newUser);
    }

    @UseInterceptors(SerializeInterceptor)
    @Get("/:id")
    async findUser(@Param("id") id: string) {
        const user = await this.usersService.findById(parseInt(id, 10));
        if (!user) {
            throw new NotFoundException("User not found!");
        }
        return user;
    }

    @Get()
    findAllUsers(@Query("email") email: string) {
        return this.usersService.findByEmail(email);
    }

    @Delete("/:id")
    deleteUser(@Param("id") id: string) {
        return this.usersService.removeById(parseInt(id, 10));
    }

    @Patch("/:id")
    updateUser(@Param("id") id: string, @Body() body: UpdateUserDto) {
        return this.usersService.updateById(parseInt(id, 10), body);
    }
}
