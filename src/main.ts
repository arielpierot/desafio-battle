import { NestFactory } from '@nestjs/core';
import { CharacterModule } from './modules/characters/characters.module';

async function bootstrap() {
  const app = await NestFactory.create(CharacterModule);
  await app.listen(3000);
}
bootstrap();
