import {NestFactory} from "@nestjs/core";
import {FastifyAdapter, NestFastifyApplication} from "@nestjs/platform-fastify";
import {AppModule} from "./app.module";

async function bootstrap() {
    const app = await NestFactory.create<NestFastifyApplication>(
        AppModule,
        new FastifyAdapter()
    );
    await app.register(require("@fastify/secure-session"), {
        cookieName: "my-session-cookie",
        //TODO: move secret to config.
        key: Buffer.from("4fe91796c30bd989d95b62dc46c7c3ba0b6aa2df2187400586a4121c54c53b85", "hex"),
        cookie: {
            secure: false
        },
    });
    await app.listen(3000);
}

bootstrap();
