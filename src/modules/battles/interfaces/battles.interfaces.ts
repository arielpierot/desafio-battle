import { Character } from 'src/modules/characters/entities/character.entity';

export interface iResponseFirstAttacker {
  firstAttacker: Character;
  firstAttackerVelocity: number;
  firstDefenser: Character;
  firstDefenserVelocity: number;
  response: string;
}
