import { Injectable } from '@nestjs/common';
import { BattleCharactersDto, CreateCharacterDto } from './dto/dto';
import { Character } from './entities/character.entity';
import { Mage } from './entities/mage.entity';
import { Thief } from './entities/thief.entity';
import { Warrior } from './entities/warrior.entity';

const characters = new Map<string, Character>();

@Injectable()
export class CharacterService {
    list(): Character[] {
        return Array.from(characters.values());
    }

    fetch(name: string): Character {
        return characters.get(name);
    }

    create(createCharacterDto: CreateCharacterDto): Character | string {
        let character: Character;
        const characterName = createCharacterDto.name;
        if (characters.get(characterName)) {
            return 'create failed';
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
                return 'não existe essa classe';
            }
        }
        if (character) {
            characters.set(characterName, character);
        }
        return character;
    }

    battle(battleCharactersDto: BattleCharactersDto): Character {
        let firstCharacter = characters.get(
            battleCharactersDto.character_name_first,
        );
        let secondCharacter = characters.get(
            battleCharactersDto.character_name_second,
        );
        let champion: Character;

        let firstAttacker = this.firstCharacterToAttack(
            firstCharacter,
            secondCharacter,
        );

        if (firstAttacker.getName() == firstCharacter.getName()) {
            champion = this.challenge(firstCharacter, secondCharacter);
        }
        champion = this.challenge(secondCharacter, firstCharacter);
        console.log("%s venceu.", champion.getName())
        return champion;
    }

    challenge(firstCharacter: Character, secondCharacter: Character): Character {
        if (!firstCharacter.getDead() && !secondCharacter.getDead()) {
            secondCharacter = this.attack(firstCharacter, secondCharacter)
            this.challenge(secondCharacter, firstCharacter)
        }
        if (firstCharacter.getDead()) {
            return secondCharacter
        }
        return firstCharacter;
    }

    attack(attacker: Character, defenser: Character): Character {
        let calculateAttack = attacker.calculateAttack()
        let life = defenser.getLife() - calculateAttack;
        console.log("%s atacou o %s em %d - sobrou apenas %d de vida", attacker.getName(), defenser.getName(), calculateAttack, life)
        if (life <= 0) {
            defenser.setDead(true);
            console.log("%s morreu.", defenser.getName())
            life = 0
        }
        defenser.setLife(life);
        return defenser;
    }

    firstCharacterToAttack(
        firstCharacter: Character,
        secondCharacter: Character,
    ): Character {
        var firstCharacterVelocity: number;
        var secondCharacterVelocity: number;
        while (firstCharacterVelocity == secondCharacterVelocity) {
            firstCharacterVelocity = firstCharacter.calculateVelocity();
            secondCharacterVelocity = secondCharacter.calculateVelocity();
        }
        if (
            firstCharacterVelocity > secondCharacterVelocity
        ) {
            return firstCharacter;
        } else if (
            firstCharacterVelocity < secondCharacterVelocity
        ) {
            return secondCharacter;
        }
    }
}
