import {MiddlewareConsumer, Module, ValidationPipe} from "@nestjs/common";
import {UsersModule} from "./util-modules/users/users.module";
import {ReportsModule} from "./reports/reports.module";
import {PrismaModule} from "./dal/prisma/prisma.module";
import {AuthModule} from "./auth/auth.module";
import {APP_PIPE} from "@nestjs/core";
import {ConfigModule} from "@nestjs/config";

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: `.env.${process.env.NODE_ENV}`
        }),
        UsersModule,
        ReportsModule,
        AuthModule,
        PrismaModule
    ],
    controllers: [],
    providers: [
        {
            provide: APP_PIPE,
            useValue: new ValidationPipe({
                whitelist: true
            })
        },
    ],
})
export class AppModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply();
    }
}
