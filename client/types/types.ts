import { GrowthRateExperienceLevel } from "pokenode-ts";

export type IShopItem = {
    id: number;
    name: string;
    price: number;
    filterValue: string
    levelRequired: number;
}


export type Pokemon = {
    id: number;
    name: string;
    moves: IPokemonMove[]
    types: string[];
    growthRate: GrowthRateExperienceLevel[]
    front: string;
    back: string;
    hp: number;
    currentHp: number
    attack: number;
    defence: number;
    specialAttack: number;
    specialDefence: number;
    speed: number;
    dexEntry: string;
    xp: number;
    fusion: boolean
    level: number
    baseAttack: number,
    baseHp: number;
    baseSpecialAttack: number;
    baseDefence: number;
    baseSpecialDefence: number;
    baseSpeed: number
    height: number
    currentMoves: IPokemonMove[];
    attackLevel: number;
    defenceLevel: number;
    hpLevel: number;
    specialAttackLevel: number;
    specialDefenceLevel: number;
    speedLevel: number;
}


export type IPokemonMove = {
    name: string;
    level: number;
    power: number;
    accuracy: number;
    pp: number;
    type: string;
    learnMethod: string
}