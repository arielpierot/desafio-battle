import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CharactersService } from './characters.service';
import { CreateCharacterDto } from './dto/characters.dto';
import { Character } from './entities/character.entity';

@Controller('characters')
export class CharactersController {
  constructor(private readonly charactersService: CharactersService) {}

  @Get()
  list(): Array<Character> {
    return this.charactersService.list();
  }

  @Get(':name')
  fetch(@Param('name') name: string): Character {
    return this.charactersService.fetch(name);
  }

  @Post()
  create(@Body() createCharacterDto: CreateCharacterDto): Character {
    return this.charactersService.create(createCharacterDto);
  }
}
