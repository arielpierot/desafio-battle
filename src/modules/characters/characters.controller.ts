import { Body, Controller, Get, Param, Patch, Post, Put } from '@nestjs/common';
import { CharacterService } from './characters.service';
import { BattleCharactersDto, CreateCharacterDto } from './dto/dto';
import { Character } from './entities/character.entity';

@Controller('characters')
export class CharacterController {
  constructor(private readonly characterService: CharacterService) { }

  @Get()
  list(): Array<Character> {
    return this.characterService.list();
  }

  @Get(':name')
  fetch(@Param('name') name: string): Character {
    return this.characterService.fetch(name);
  }

  @Post()
  create(@Body() createCharacterDto: CreateCharacterDto): Character {
    return this.characterService.create(createCharacterDto);
  }

  @Put()
  battle(@Body() battleCharactersDto: BattleCharactersDto): Array<string> {
    return this.characterService.battle(battleCharactersDto);
  }
}
