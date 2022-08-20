import {Module} from "@nestjs/common";
import {AuthController} from "./auth.controller";
import {AuthService} from "./auth.service";
import {UsersService} from "../util-modules/users/users.service";
import {CryptoService} from "../util-modules/crypto/crypto.service";
import {CurrentUserInterceptor} from "../util-modules/interceptors/current-user.interceptor";
import {APP_INTERCEPTOR} from "@nestjs/core";

@Module({
    providers: [
        AuthService,
        UsersService,
        CryptoService,
        {
            provide: APP_INTERCEPTOR,
            useClass: CurrentUserInterceptor
        }
    ],
    controllers: [AuthController]
})
export class AuthModule {
}
