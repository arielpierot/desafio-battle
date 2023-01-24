export interface iProfession {
  status: iStatus;
  battleModifiers: iBattleModifiers;
  calculateAttack(): void;
  calculateVelocity(): void;
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
