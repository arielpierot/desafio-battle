import { iBattleModifiers, iStatus } from '../interfaces/characters.interfaces';
import { Character } from './character.entity';

export class Warrior extends Character {
  status: iStatus = {
    life: 20,
    power: 10,
    dexterity: 5,
    intelligence: 5,
  };
  battleModifiers: iBattleModifiers = {
    attack: {
      power: 0.8,
      dexterity: 0.2,
    },
    velocity: {
      dexterity: 0.6,
      intelligence: 0.2,
    },
  };

  constructor(name: string) {
    super(name);
    this.setLife(this.status.life);
    this.setType(Warrior.name);
  }
}
