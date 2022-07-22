import {readFile, writeFile} from "fs/promises";
import {Injectable} from "@nestjs/common";

@Injectable()
export class MessagesRepository {
    async findAll() {
        const contents = await readFile("messages.json", "utf8");
        return JSON.parse(contents);
    }

    async findOne(id: string) {
        const messages = await this.findAll();
        return messages[id];
    }

    async create(content: string) {
        const messages = await this.findAll();
        const id = Math.floor(Math.random() * 999);

        messages[id] = {id: id, content: content};

        await writeFile("messages.json", JSON.stringify(messages));
    }
}
