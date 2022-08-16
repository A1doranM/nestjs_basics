import {Injectable, NotFoundException} from "@nestjs/common";
import {PrismaService} from "../../dal/prisma/prisma.service";
import {CreateUserDto} from "../../auth/dtos/create-user.dto";
import {User} from "@prisma/client";

@Injectable()
export class UsersService {
    constructor(private repo: PrismaService) {
    }

    async create(email: string, password: string): Promise<User> {
        const newUser = await this.repo.user.create({
            data: {
                email: email
            }
        });

        return newUser;
    }

    async findById(id: number): Promise<User> {
        return await this.repo.user.findFirst({
            where: {
                id: id
            }
        });
    }

    async findByEmail(email: string): Promise<Array<User>> {
        return await this.repo.user.findMany({
            where: {
                email: email
            }
        });
    }

    async updateById(id: number, payload: Partial<User>): Promise<User> {
        const user = await this.findById(id);
        if (!user) {
            throw new NotFoundException("User not found!");
        }

        Object.assign(user, payload);

        const updatedUser = await this.repo.user.update({
            where: {id: id},
            data: user
        })

        return updatedUser;
    }

    async removeById(id: number): Promise<User> {
        const user = await this.findById(id);
        if (!user) {
            throw new NotFoundException("User not found!");
        }

        const result = await this.repo.user.delete({
            where: {id: id}
        });

        return result;
    }
}
