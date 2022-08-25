import {Test} from "@nestjs/testing";
import {User} from "@prisma/client";
import {CryptoService} from "../crypto.service";
import {log} from "util";



describe("Testing Auth Service", () => {
    let service: CryptoService;

    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers: [
                CryptoService,
            ]
        }).compile();

        service = module.get(CryptoService);
    });

    test("Service creation", async () => {

        expect(service).toBeDefined();
    });

    test("Password hash", async () => {
        expect(service.hash("ProgerNum1")).toBeDefined();
    });
});
