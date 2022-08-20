import {Injectable, NestInterceptor, ExecutionContext, CallHandler, UseInterceptors} from "@nestjs/common";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import {plainToInstance} from "class-transformer";
import {UsersService} from "../users/users.service";

@Injectable()
export class CurrentUserInterceptor implements NestInterceptor {
    constructor(private usersService: UsersService) {
    }

    async intercept(context: ExecutionContext, next: CallHandler) {
        const request = context.switchToHttp().getRequest();
        const {userId} = request.session || {};

        if (userId) {
            const user = await this.usersService.findById(userId);
            request.currentUser = user;
        }

        return next.handle();
    }
}
