import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from "@nestjs/common";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

@Injectable()
export class SerializeInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        console.log("Before handler.");

        return next
            .handle()
            .pipe(
                map((data: any) => {
                    console.log("Before response sent out", data);
                }),
            );
    }
}
