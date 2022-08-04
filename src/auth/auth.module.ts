import {Module} from "@nestjs/common";
import {AuthController} from "./auth.controller";
import {AuthService} from "./auth.service";
import {UsersModule} from "../util-modules/users/users.module";
import {UsersService} from "../util-modules/users/users.service";

@Module({
    providers: [AuthService, UsersService],
    controllers: [AuthController]
})
export class AuthModule {
}
