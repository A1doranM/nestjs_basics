import {Module} from "@nestjs/common";
import {UsersModule} from "./users/users.module";
import {ReportsModule} from "./reports/reports.module";
import { PrismaModule } from './dal/prisma/prisma.module';

@Module({
    imports: [UsersModule, ReportsModule, PrismaModule],
    controllers: [],
    providers: [],
})
export class AppModule{}
