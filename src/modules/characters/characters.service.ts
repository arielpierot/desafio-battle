import {
  BadRequestException,
  Injectable,
  NotFoundException,
  OnApplicationBootstrap,
} from '@nestjs/common';
import { CreateCharacterDto } from './dto/characters.dto';
import { Character } from './entities/character.entity';
import { Mage } from './entities/mage.entity';
import { Thief } from './entities/thief.entity';
import { Warrior } from './entities/warrior.entity';

let characters = new Map<string, Character>();

@Injectable()
export class CharactersService implements OnApplicationBootstrap {
  onApplicationBootstrap() {
    const characterFirst = new Mage('Mage');
    characters.set(characterFirst.getName(), characterFirst);
    const characterSecond = new Warrior('Warrior');
    characters.set(characterSecond.getName(), characterSecond);
  }

  list(): Character[] {
    return Array.from(characters.values());
  }

  fetch(name: string): Character {
    const character = characters.get(name);
    if (!character) {
      throw new NotFoundException();
    }
    return characters.get(name);
  }

  create(createCharacterDto: CreateCharacterDto): Character {
    let character: Character;
    const characterName = createCharacterDto.name;
    if (characters.get(characterName)) {
      throw new BadRequestException('name found');
    }
    switch (createCharacterDto.profession) {
      case 'mage': {
        character = new Mage(characterName);
        break;
      }
      case 'thief': {
        character = new Thief(characterName);
        break;
      }
      case 'warrior': {
        character = new Warrior(characterName);
        break;
      }
      default: {
        throw new BadRequestException('class not found');
      }
    }
    if (character) {
      characters.set(character.getName(), character);
    }
    return character;
  }

  clearCharacters() {
    characters = new Map<string, Character>();
  }
}
