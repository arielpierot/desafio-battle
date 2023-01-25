import { iBattleModifiers, iStatus } from '../interfaces/characters.interfaces';
import { Character } from './character.entity';

export class Thief extends Character {
  status: iStatus = {
    life: 15,
    power: 4,
    dexterity: 10,
    intelligence: 4,
  };
  battleModifiers: iBattleModifiers = {
    attack: {
      power: 0.25,
      dexterity: 1,
      intelligence: 0.25,
    },
    velocity: {
      dexterity: 0.8,
    },
  };

  constructor(name: string) {
    super(name);
    this.setLife(this.status.life);
    this.setType(Thief.name);
  }
}
