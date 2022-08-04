import {Injectable} from '@nestjs/common';
import {PrismaService} from "../dal/prisma/prisma.service";
import {CreateUserDto} from "./dtos/create-user.dto";

@Injectable()
export class AuthService {
    constructor(private repo: PrismaService) {
    }

    async create(user: CreateUserDto) {
        const newUser = await this.repo.user.create({
            data: {
                email: user.email
            }
        })

        return newUser;
    }
}
