import { iBattleModifiers, iStatus, iProfession } from "../interfaces/interfaces";
import { Character } from "./character.entity";

export class Warrior extends Character {
    status: iStatus = {
        life: 20,
        power: 10,
        dexterity: 5,
        intelligence: 5,
    }
    battle_modifiers: iBattleModifiers = {
        attack: {
            power: 80,
            dexterity: 20,
        }, velocity: {
            dexterity: 60,
            intelligence: 20,
        }
    };

    constructor(name: string) {
        super(name);
        super.type = Warrior.name
    }

    public calculateAttack(): number {
        return 10
    }

    public calculateVelocity(): number {
        return 10
    }
}