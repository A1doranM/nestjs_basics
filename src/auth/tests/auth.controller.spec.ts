import {UsersController} from "../../util-modules/users/users.controller";
import {UsersService} from "../../util-modules/users/users.service";
import {AuthService} from "../auth.service";
import {Test, TestingModule} from "@nestjs/testing";
import {AuthController} from "../auth.controller";
import {CreateUserDto} from "../dtos/create-user.dto";
import { User } from "@prisma/client";


describe("UsersController", () => {
    let controller: AuthController;
    let fakeAuthService: Partial<AuthService>;

    beforeEach(async () => {
        fakeAuthService = {
            async signin(user: CreateUserDto): Promise<User> {
                return Promise.resolve({id: 1, email: "test@test.com", password: "1q2w3e4r"} as User);
            },
            async signup(user: CreateUserDto): Promise<User> {
                return Promise.resolve({id: 1, email: "test@test.com", password: "1q2w3e"} as User);
            }
        };

        const module: TestingModule = await Test.createTestingModule({
            controllers: [AuthController]
        }).compile();

    });
});
