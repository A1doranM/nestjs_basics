import {MessagesRepository} from "./messages.repository";
import {Injectable} from "@nestjs/common";

@Injectable()
export class MessagesService {
    messagesRepo: MessagesRepository;

    constructor(messagesRepo: MessagesRepository) {
        this.messagesRepo = messagesRepo;
    }

    async findAll() {
        return this.messagesRepo.findAll();
    }

    async findOne(id: string) {
        return this.messagesRepo.findOne(id);
    }

    async create(content: string) {
        await this.messagesRepo.create(content);
    }
}
