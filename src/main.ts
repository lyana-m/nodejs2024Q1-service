import { NestFactory } from '@nestjs/core';
import { SwaggerModule, OpenAPIObject } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { getApiFile } from './utils/get-api-file';

import 'dotenv/config';

async function bootstrap() {
  const PORT = process.env.PORT || 4000;

  const app = await NestFactory.create(AppModule);

  const apiFile = getApiFile() as OpenAPIObject;
  SwaggerModule.setup('doc', app, apiFile);

  await app.listen(PORT, () =>
    console.log(`Server is listening on port: ${PORT}`),
  );
}
bootstrap();
