import { Module } from "@nestjs/common";
import {CryptoService} from "./crypto.service";

@Module({
    exports: [CryptoService],
    providers: [CryptoService],
    controllers: []
})
export class CryptoModule {}
