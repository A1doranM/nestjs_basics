import {Module} from "@nestjs/common";
import {AuthController} from "./auth.controller";
import {AuthService} from "./auth.service";
import {UsersService} from "../util-modules/users/users.service";
import {CryptoService} from "../util-modules/crypto/crypto.service";

@Module({
    providers: [AuthService, UsersService, CryptoService],
    controllers: [AuthController]
})
export class AuthModule {
}
