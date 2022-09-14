import {Injectable, NestInterceptor, ExecutionContext, CallHandler} from "@nestjs/common";
import {UsersService} from "../users/users.service";

@Injectable()
export class CurrentUserInterceptor implements NestInterceptor {
    constructor(private usersService: UsersService) {
    }

    async intercept(context: ExecutionContext, next: CallHandler) {
        const request = context.switchToHttp().getRequest();
        const userId = request.session.get("userId");

        if (userId) {
            const user = await this.usersService.findById(userId);
            request.currentUser = user;
        }

        return next.handle();
    }
}
