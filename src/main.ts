import { NestFactory } from '@nestjs/core';
import { CharacterModule } from './modules/characters/characters.module';
import { Character } from './modules/characters/entities/character.entity';

async function bootstrap() {
  const app = await NestFactory.create(CharacterModule);
  await app.listen(3000);
}
bootstrap();
