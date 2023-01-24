import { Injectable, Logger, OnApplicationBootstrap } from '@nestjs/common';
import { BattleCharactersDto, CreateCharacterDto } from './dto/dto';
import { Character } from './entities/character.entity';
import { Mage } from './entities/mage.entity';
import { Thief } from './entities/thief.entity';
import { Warrior } from './entities/warrior.entity';

const characters = new Map<string, Character>();

@Injectable()
export class CharacterService implements OnApplicationBootstrap {

    onApplicationBootstrap() {
        let characterFirst = new Mage('Ariel');
        characters.set(characterFirst.getName(), characterFirst);
        let characterSecond = new Warrior('Ariel2');
        characters.set(characterSecond.getName(), characterSecond);
    }

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
            characters.set(character.getName(), character);
        }
        return character;
    }

    battle(battleCharactersDto: BattleCharactersDto): Array<string> {
        let firstCharacter = characters.get(
            battleCharactersDto.character_name_first,
        );
        let secondCharacter = characters.get(
            battleCharactersDto.character_name_second,
        );
        let battleResponse = new Array<string>();

        let firstAttacker = this.firstCharacterToAttack(
            firstCharacter,
            secondCharacter,
            battleResponse,
        );

        if (firstAttacker.getName() == firstCharacter.getName()) {
            this.challenge(firstCharacter, secondCharacter, battleResponse)
            return battleResponse;
        }
        this.challenge(secondCharacter, firstCharacter, battleResponse)
        return battleResponse;
    }

    challenge(firstCharacter: Character, secondCharacter: Character, battleResponse: Array<string>) {
        if (firstCharacter.getDead() || secondCharacter.getDead()) {
            return;
        }
        this.attack(firstCharacter, secondCharacter, battleResponse);
        this.challenge(secondCharacter, firstCharacter, battleResponse)
    }

    attack(attacker: Character, defenser: Character, battleResponse: Array<string>) {
        let calculateAttack = attacker.calculateAttack()
        let life = defenser.getLife() - calculateAttack;
        if (life <= 0) {
            life = 0
            defenser.setDead(true);
        }
        defenser.setLife(life);
        battleResponse.push(`${attacker.getName()} atacou ${defenser.getName()} com ${calculateAttack} de dano, ${defenser.getName()} com ${life} pontos de vida restantes;`)
        if (defenser.getDead()) {
            battleResponse.push(`${attacker.getName()} venceu a batalha! ${attacker.getName()} ainda tem ${attacker.getLife()} pontos de vida restantes!`)
        };
        return;
    }

    firstCharacterToAttack(
        firstCharacter: Character,
        secondCharacter: Character,
        battleResponse: Array<string>
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
            battleResponse.push(`${firstCharacter.getName()} (${firstCharacterVelocity}) foi mais veloz que ${secondCharacter.getName()} (${secondCharacterVelocity}) e irá começar!`);
            return firstCharacter;
        } else if (
            firstCharacterVelocity < secondCharacterVelocity
        ) {
            battleResponse.push(`${secondCharacter.getName()} (${secondCharacterVelocity}) foi mais veloz que ${firstCharacter.getName()} (${firstCharacterVelocity}) e irá começar!`);
            return secondCharacter;
        }
    }
}
