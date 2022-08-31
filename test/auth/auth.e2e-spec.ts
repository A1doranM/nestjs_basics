import { Test, TestingModule } from "@nestjs/testing";
import { INestApplication } from "@nestjs/common";
import * as request from "supertest";
import {AppModule} from "../../dist/app.module";
import {FastifyAdapter, NestFastifyApplication} from "@nestjs/platform-fastify";

describe("Authentication System (e2e)", () => {
    let app: NestFastifyApplication;
    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication(new FastifyAdapter());
        await app.register(require("@fastify/secure-session"), {
            cookieName: "my-session-cookie",
            //TODO: move secret to config.
            key: Buffer.from("4fe91796c30bd989d95b62dc46c7c3ba0b6aa2df2187400586a4121c54c53b85", "hex")
        });
        await app.init();
    });

    it("/auth/signup FAIL (POST)", () => {
        return app
            .inject({
                method: "POST",
                url: "/auth/signup",
                payload: {
                    email: "medmmax@gmail.com",
                    password: "1q2w3e3e2w1q4r"
                }
            })
            .then((res) => {
                const { message } = JSON.parse(res.body);

                expect(res.statusCode).toEqual(400);

                expect(message).toEqual("Email already in use.");
            });
    });

    it("/auth/signup SUCCESS (POST)", () => {
        const testEmail = `asdasd${Math.random()}@gmail.com`;

        return app
            .inject({
                method: "POST",
                url: "/auth/signup",
                payload: {
                    email: testEmail,
                    password: "1q2w3e3e2w1q4r"
                }
            })
            .then((res) => {
                const { email } = JSON.parse(res.body);

                expect(res.statusCode).toEqual(201);

                expect(email).toEqual(testEmail);
            });
    });
});
