import { iBattleModifiers, iStatus } from '../interfaces/interfaces';
import { Character } from './character.entity';

export class Mage extends Character {
  status: iStatus = {
    life: 12,
    power: 5,
    dexterity: 6,
    intelligence: 10,
  };
  battleModifiers: iBattleModifiers = {
    attack: {
      power: 0.2,
      dexterity: 0.5,
      intelligence: 1.5,
    },
    velocity: {
      power: 0.2,
      dexterity: 0.5,
    },
  };

  constructor(name: string) {
    super(name);
    super.type = Mage.name;
  }
}
