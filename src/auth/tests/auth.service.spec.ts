import {Test} from "@nestjs/testing";
import {AuthService} from "../auth.service";
import {User} from "@prisma/client";
import {UsersService} from "../../util-modules/users/users.service";
import {CryptoService} from "../../util-modules/crypto/crypto.service";

const userServiceMock: Partial<UsersService> = {
    create: (email: string, password: string) => Promise.resolve({
        id: 1,
        email: "test@test.com",
        password: "1q2w3e"
    } as User),

    findById: (id: number) => Promise.resolve({id: 1, email: "test@test.com", password: "1q2w3e"} as User),

    findByEmail: (email: string) => Promise.resolve({id: 1, email: "test@test.com", password: "1q2w3e"} as User),

    updateById: (id: number, payload: Partial<User>) => Promise.resolve({
        id: 1,
        email: "test@test.com",
        password: "1q2w3e"
    } as User),
}

const cryptoServiceMock: Partial<CryptoService> = {
    hash: (password: string) => Promise.resolve("2131231232323asdsad"),
    verify: (password: string, hash: string) => Promise.resolve(true)
}

describe("Testing Auth Service", () => {
    let service: AuthService;

    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers: [
                AuthService,
                {
                    provide: UsersService,
                    useValue: userServiceMock
                },
                {
                    provide: CryptoService,
                    useValue: cryptoServiceMock
                }
            ]
        }).compile();

        service = module.get(AuthService);
    });

    test("Service creation", async () => {

        expect(service).toBeDefined();
    });

    test("Signin user", async () => {
        const user = await service.signin({
            email: "@asd.com",
            password: "1q2w3e4r"
        });
        expect(service).toBeDefined();
    });

    test("Signup user with email already in use", async () => {
        const user = await service.signup({
            email: "aldoran.ua@gmail.com",
            password: "1q2w3e3e2w1q4r"
        });
        expect(service).toBeDefined();
    });
});
