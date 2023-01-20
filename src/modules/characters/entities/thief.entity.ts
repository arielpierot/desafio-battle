import { iBattleModifiers, iStatus } from "../interfaces/interfaces";
import { Character } from "./character.entity";

export class Thief extends Character {
    status: iStatus = {
        life: 15,
        power: 4,
        dexterity: 10,
        intelligence: 4,
    }
    battle_modifiers: iBattleModifiers = {
        attack: {
            power: 25,
            dexterity: 100,
            intelligence: 25,
        }, velocity: {
            dexterity: 80,
        }
    };

    constructor(name: string) {
        super(name);
        super.type = Thief.name
    }

    public calculateAttack(): number {
        return 10
    }

    public calculateVelocity(): number {
        return 10
    }
}