import { Injectable } from '@nestjs/common';
import { CreateCharacterDto } from './dto/dto';
import { Character } from './entities/character.entity';
import { Mage } from './entities/mage.entity';
import { Thief } from './entities/thief.entity';
import { Warrior } from './entities/warrior.entity';

let characters = new Map<string, Character>();

@Injectable()
export class CharacterService {
    list(): Character[] {
        return Array.from(characters.values());
    }

    fetch(name: string): Character {
        return characters.get(name);
    }

    create(createCharacterDto: CreateCharacterDto): Character | String {
        let character: Character;
        let characterName = createCharacterDto.name
        if (characters.get(characterName)) {
            return "create failed"
        }
        switch (createCharacterDto.profession) {
            case "mage": {
                character = new Mage(characterName);
                break;
            }
            case "thief": {
                character = new Thief(characterName);
                break;
            }
            case "warrior": {
                character = new Warrior(characterName);
                break;
            }
            default: {
                return "não existe essa classe";
            }
        }
        if (character) {
            characters.set(characterName, character);
        }
        return character;
    }
}
