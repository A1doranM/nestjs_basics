import {Injectable} from "@nestjs/common";
import {CreateUserDto} from "./dtos/create-user.dto";
import {UsersService} from "../util-modules/users/users.service";
import {User} from "@prisma/client";

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService) {
    }

    async create(user: CreateUserDto): Promise<User> {
        const newUser = await this.usersService.create(user);

        return newUser;
    }
}
