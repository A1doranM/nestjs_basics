import {Injectable} from "@nestjs/common";
import {PrismaClient} from "@prisma/client";
import {ConfigService} from "@nestjs/config";

@Injectable()
export class PrismaService extends PrismaClient {
    constructor(private configService: ConfigService) {
        super({
            datasources: {
                db: {
                    //TODO: refactor with env variables.
                    url: configService.get<string>("DATABASE_URL")
                }
            }
        });
    }
}
