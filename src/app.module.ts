import { Module } from '@nestjs/common';
import { BattlesModule } from './modules/battles/battles.module';
import { CharactersModule } from './modules/characters/characters.module';

@Module({
  imports: [CharactersModule, BattlesModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
