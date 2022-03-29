import { NestFactory } from "@nestjs/core";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";
import { ApplicationModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(ApplicationModule, { cors: true });

  const config = new DocumentBuilder()
    .setTitle("Plug API")
    .setDescription("Plug got tokens")
    .setVersion("1.0")
    .addTag("plug")
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api", app, document);

  await app.listen(3000);
}

bootstrap();
