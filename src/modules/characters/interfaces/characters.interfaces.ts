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
