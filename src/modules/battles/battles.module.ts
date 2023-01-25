import { Module } from '@nestjs/common';
import { CharactersService } from '../characters/characters.service';
import { BattlesController } from './battles.controller';
import { BattlesService } from './battles.service';

@Module({
  imports: [],
  controllers: [BattlesController],
  providers: [BattlesService, CharactersService],
})
export class BattlesModule {}
