import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import 'dotenv/config';

async function bootstrap() {
  const PORT = process.env.PORT || 4000;

  const app = await NestFactory.create(AppModule);
  await app.listen(PORT, () =>
    console.log(`Server is listening on port: ${PORT}`),
  );
}
bootstrap();
