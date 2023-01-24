import {
  BadRequestException,
  Injectable,
  OnApplicationBootstrap,
} from '@nestjs/common';
import { BattleCharactersDto, CreateCharacterDto } from './dto/dto';
import { Character } from './entities/character.entity';
import { Mage } from './entities/mage.entity';
import { Thief } from './entities/thief.entity';
import { Warrior } from './entities/warrior.entity';
import { iResponseFirstAttacker } from './interfaces/interfaces';

const characters = new Map<string, Character>();

@Injectable()
export class CharacterService implements OnApplicationBootstrap {
  onApplicationBootstrap() {
    const characterFirst = new Mage('Ariel');
    characters.set(characterFirst.getName(), characterFirst);
    const characterSecond = new Warrior('Ariel2');
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

  battle(battleCharactersDto: BattleCharactersDto): Array<string> {
    let battleResponse = new Array<string>();
    const firstCharacter = characters.get(
      battleCharactersDto.character_name_first,
    );
    const secondCharacter = characters.get(
      battleCharactersDto.character_name_second,
    );
    const responseCompareVelocity = this.compareCharacterVelocity(
      firstCharacter,
      secondCharacter,
    );

    battleResponse = battleResponse.concat(responseCompareVelocity.response);
    this.challenge(
      responseCompareVelocity.firstAttacker,
      responseCompareVelocity.firstDefenser,
      battleResponse,
    );
    return battleResponse;
  }

  challenge(
    firstCharacter: Character,
    secondCharacter: Character,
    battleResponse: Array<string>,
  ) {
    if (firstCharacter.getDead() || secondCharacter.getDead()) {
      return;
    }
    this.attack(firstCharacter, secondCharacter).forEach((value) =>
      battleResponse.push(value),
    );
    this.challenge(secondCharacter, firstCharacter, battleResponse);
  }

  attack(attacker: Character, defenser: Character): Array<string> {
    const battleResponse = new Array<string>();
    const calculateAttack = attacker.calculateAttack();
    let life = defenser.getLife() - calculateAttack;
    if (life <= 0) {
      life = 0;
      defenser.setDead(true);
    }
    defenser.setLife(life);
    battleResponse.push(
      `${attacker.getName()} atacou ${defenser.getName()} com ${calculateAttack} de dano, ${defenser.getName()} com ${life} pontos de vida restantes;`,
    );
    if (defenser.getDead()) {
      battleResponse.push(
        `${attacker.getName()} venceu a batalha! ${attacker.getName()} ainda tem ${attacker.getLife()} pontos de vida restantes!`,
      );
    }
    return battleResponse;
  }

  compareCharacterVelocity(
    firstCharacter: Character,
    secondCharacter: Character,
  ): iResponseFirstAttacker {
    let firstCharacterVelocity: number;
    let secondCharacterVelocity: number;
    while (firstCharacterVelocity == secondCharacterVelocity) {
      firstCharacterVelocity = firstCharacter.calculateVelocity();
      secondCharacterVelocity = secondCharacter.calculateVelocity();
    }
    if (firstCharacterVelocity > secondCharacterVelocity) {
      return {
        firstAttacker: firstCharacter,
        firstDefenser: secondCharacter,
        response: `${firstCharacter.getName()} (${firstCharacterVelocity}) foi mais veloz que ${secondCharacter.getName()} (${secondCharacterVelocity}) e irá começar!`,
      };
    } else if (firstCharacterVelocity < secondCharacterVelocity) {
      return {
        firstAttacker: secondCharacter,
        firstDefenser: firstCharacter,
        response: `${secondCharacter.getName()} (${secondCharacterVelocity}) foi mais veloz que ${firstCharacter.getName()} (${firstCharacterVelocity}) e irá começar!`,
      };
    }
  }
}
