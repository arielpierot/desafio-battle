import { Character } from '../entities/character.entity';

export interface iBattleModifiers {
  attack: iStatus;
  velocity: iStatus;
}

export interface iStatus {
  life?: number;
  power?: number;
  dexterity?: number;
  intelligence?: number;
}

export interface iResponseFirstAttacker {
  firstAttacker: Character;
  firstAttackerVelocity: number;
  firstDefenser: Character;
  firstDefenserVelocity: number;
  response: string;
}
