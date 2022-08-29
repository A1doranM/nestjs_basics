import {Test} from "@nestjs/testing"
import {User} from "@prisma/client";
import {CryptoService} from "../crypto.service";



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
        const password = "ProgerNum1"
        const hashedPassword = await service.hash(password);
        expect(await service.verify(password, hashedPassword)).toBe(true);
    });
});
