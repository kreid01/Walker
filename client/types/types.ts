import { GrowthRateExperienceLevel } from "pokenode-ts";

export type IShopItem = {
    id: number;
    name: string;
    price: number;
    filterValue: string
}


export type Pokemon = {
    id: number;
    name: string;
    moves: IPokemonMove[]
    type: string;
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
    level: number
    baseAttack: number,
    baseHp: number;
    baseSpecialAttack: number;
    baseDefence: number;
    baseSpecialDefence: number;
    baseSpeed: number
    height: number
    currentMoves: IPokemonMove[]
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