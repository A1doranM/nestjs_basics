import {Module} from "@nestjs/common";
import {UsersModule} from "./users/users.module";
import {ReportsModule} from "./reports/reports.module";
import { PrismaModule } from './dal/prisma/prisma.module';
import {AuthModule} from "./auth/auth.module";

@Module({
    imports: [UsersModule, ReportsModule, AuthModule, PrismaModule],
    controllers: [],
    providers: [],
})
export class AppModule{}
