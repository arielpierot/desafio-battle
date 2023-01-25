import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { CharactersService } from '../characters/characters.service';
import { Character } from '../characters/entities/character.entity';
import { BattleCharactersDto } from './dto/battles.dto';
import { iResponseFirstAttacker } from './interfaces/battles.interfaces';

@Injectable()
export class BattlesService {
  @Inject()
  charactersService: CharactersService;

  battle(battleCharactersDto: BattleCharactersDto): Array<string> {
    let battleResponse = new Array<string>();
    const firstCharacter = this.charactersService.fetch(
      battleCharactersDto.character_name_first,
    );
    const secondCharacter = this.charactersService.fetch(
      battleCharactersDto.character_name_second,
    );

    if (!firstCharacter || !secondCharacter) {
      throw new BadRequestException('character not found');
    }

    if (firstCharacter.getDead() || secondCharacter.getDead()) {
      throw new BadRequestException('character dead');
    }
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
        firstAttackerVelocity: firstCharacterVelocity,
        firstDefenser: secondCharacter,
        firstDefenserVelocity: secondCharacterVelocity,
        response: `${firstCharacter.getName()} (${firstCharacterVelocity}) foi mais veloz que ${secondCharacter.getName()} (${secondCharacterVelocity}) e irá começar!`,
      };
    }
    return {
      firstAttacker: secondCharacter,
      firstAttackerVelocity: secondCharacterVelocity,
      firstDefenser: firstCharacter,
      firstDefenserVelocity: firstCharacterVelocity,
      response: `${secondCharacter.getName()} (${secondCharacterVelocity}) foi mais veloz que ${firstCharacter.getName()} (${firstCharacterVelocity}) e irá começar!`,
    };
  }
}
