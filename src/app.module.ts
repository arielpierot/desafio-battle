import { Module } from '@nestjs/common';
import { CharacterModule } from './modules/characters/characters.module';

@Module({
  imports: [CharacterModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
