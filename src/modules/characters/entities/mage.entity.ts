import { iBattleModifiers, iStatus } from "../interfaces/interfaces";
import { Character } from "./character.entity";

export class Mage extends Character {
    readonly status: iStatus = {
        life: 12,
        power: 5,
        dexterity: 6,
        intelligence: 10,
    }
    readonly battle_modifiers: iBattleModifiers = {
        attack: {
            power: 20,
            dexterity: 50,
            intelligence: 150,
        }, velocity: {
            power: 20,
            dexterity: 50,
        }
    };

    constructor(name: string) {
        super(name);
        super.type = Mage.name
    }

    public calculateAttack(): number {
        return 10
    }

    public calculateVelocity(): number {
        return 10
    }

    public getLife(): number {
        return this.status.life;
    }

    public setLife(life: number) {
        this.status.life = life;
    }
}