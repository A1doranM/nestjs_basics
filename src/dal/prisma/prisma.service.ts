import {Injectable} from "@nestjs/common";
import {PrismaClient} from "@prisma/client";

@Injectable()
export class PrismaService extends PrismaClient {
    constructor() {
        super({
            datasources: {
                db: {
                    //TODO: refactor with env variables.
                    url: "postgresql://postgres:1q2w3e3e2w1q4r@localhost:5433/nestjs-basics?schema=public"
                }
            }
        });
    }
}
