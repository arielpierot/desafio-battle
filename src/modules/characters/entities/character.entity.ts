import { iBattleModifiers, iProfession, iStatus } from "../interfaces/interfaces";
import { Mage } from "./mage.entity";
import { Thief } from "./thief.entity";
import { Warrior } from "./warrior.entity";

export abstract class Character implements iProfession {
    private name: string;
    private dead: boolean;
    type: string;
    status: iStatus;
    battle_modifiers: iBattleModifiers;

    abstract calculateAttack(): number;
    abstract calculateVelocity(): number;

    public getName() {
        return this.name;
    }

    public getDead() {
        return this.dead;
    }

    public setDead(dead: boolean) {
        this.dead = dead;
    }

    constructor(name: string) {
        this.name = name;
        this.dead = false;
    }
}