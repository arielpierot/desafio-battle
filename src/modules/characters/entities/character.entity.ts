import { iBattleModifiers, iStatus } from '../interfaces/interfaces';

export abstract class Character {
  private name: string;
  private dead: boolean;
  private life: number;
  private type: string;
  readonly status: iStatus;
  readonly battleModifiers: iBattleModifiers;

  constructor(name: string) {
    this.name = name;
    this.dead = false;
  }

  calculateAttack(): number {
    let attack = 0;
    if (this.battleModifiers.attack.power)
      attack = attack + this.battleModifiers.attack.power * this.status.power;
    if (this.battleModifiers.attack.dexterity)
      attack =
        attack + this.battleModifiers.attack.dexterity * this.status.dexterity;
    if (this.battleModifiers.attack.intelligence)
      attack =
        attack +
        this.battleModifiers.attack.intelligence * this.status.intelligence;
    return Math.floor(Math.random() * attack);
  }

  calculateVelocity(): number {
    let velocity = 0;
    if (this.battleModifiers.velocity.power)
      velocity =
        velocity + this.battleModifiers.velocity.power * this.status.power;
    if (this.battleModifiers.velocity.dexterity)
      velocity =
        velocity +
        this.battleModifiers.velocity.dexterity * this.status.dexterity;
    if (this.battleModifiers.velocity.intelligence)
      velocity =
        velocity +
        this.battleModifiers.velocity.intelligence * this.status.intelligence;
    return Math.floor(Math.random() * velocity);
  }

  public getName() {
    return this.name;
  }

  public getDead() {
    return this.dead;
  }

  public setDead(dead: boolean) {
    this.dead = dead;
  }

  public getLife(): number {
    return this.life;
  }

  public setLife(life: number) {
    this.life = life;
  }

  public getType() {
    return this.type;
  }

  public setType(type: string) {
    this.type = type.toLocaleLowerCase();
  }
}
