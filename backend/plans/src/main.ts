import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const PORT = process.env.PORT || 3001;

  app.enableCors();
  await app.listen(PORT, () =>
    console.log(`Server has been started http://localhost:${PORT}`),
  );
}
bootstrap();
