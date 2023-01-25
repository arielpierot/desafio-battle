import { Body, Controller, Post } from '@nestjs/common';
import { BattlesService } from './battles.service';
import { BattleCharactersDto } from './dto/battles.dto';

@Controller('battles')
export class BattlesController {
  constructor(private readonly battlesService: BattlesService) {}

  @Post()
  battle(@Body() battleCharactersDto: BattleCharactersDto): Array<string> {
    return this.battlesService.battle(battleCharactersDto);
  }
}
