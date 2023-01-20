export interface iProfession {
    status: iStatus
    battle_modifiers: iBattleModifiers
    calculateAttack(): number;
    calculateVelocity(): number;
}

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