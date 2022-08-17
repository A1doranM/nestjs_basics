import {BadRequestException, Injectable} from "@nestjs/common";
import {CreateUserDto} from "./dtos/create-user.dto";
import {UsersService} from "../util-modules/users/users.service";
import {User} from "@prisma/client";
import {randomBytes, scrypt as _scrypt} from "crypto";
import {promisify} from "util";
import {CryptoService} from "../util-modules/crypto/crypto.service";

const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private cryptoService: CryptoService
    ) {
    }

    async signup(user: CreateUserDto): Promise<User> {
        const isUserExist = await this.usersService.findByEmail(user.email);
        if (isUserExist) {
            throw new BadRequestException("Email already in use.");
        }

        const hashedPassword = await this.cryptoService.hash(user.password);
        const newUser = await this.usersService.create(user.email, hashedPassword);

        return newUser;
    }

    async signin(user: CreateUserDto): Promise<User> {
        const foundUser = await this.usersService.findByEmail(user.email);
        if(!foundUser) {
            throw new BadRequestException("User does not exist.");
        }

        const isPasswordValid = this.cryptoService.verify(user.password, foundUser.password);

        if(!isPasswordValid) {
            throw new BadRequestException("Invalid password.");
        }

        return foundUser;
    }
}
