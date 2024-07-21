import { write } from "fs";
import { ItemClient, MoveClient, PokemonClient } from "pokenode-ts";

const fs = require("fs");
const api = new PokemonClient();

const getPokemon = async () => {
    const pokemon = (await api.listPokemons(0, 151)).results
    const data = await Promise.all(pokemon.map(async (p) => {
        try {
            const response = await api.getPokemonByName(p.name)
            const stats = response.stats

            return {
                name: response.name,
                id: response.id,
                type: response.types,
                front: response.sprites.front_default,
                back: response.sprites.back_default,
                baseAttack: stats[1].base_stat,
                baseDefence: stats[2].base_stat,
                baseSpecialAttack: stats[3].base_stat,
                baseSpecialDefence: stats[4].base_stat,
                baseSpeed: stats[5].base_stat,
                height: response.height,
                moves: response.moves,
            }
        } catch (err) { console.log(err) }
    }))
    writeToFile(JSON.stringify(data), "pokemon.json")
}

const getPokemonSpecies = async () => {
    const species = (await api.listPokemonSpecies(0, 2000)).results
    const data = await Promise.all((species).map(async (species) => {
        try {
            const response = await api.getPokemonSpeciesByName(species.name)
            return {
                id: response.id,
                name: response.name,
                generation: response.generation,
                growthRate: response.growth_rate,
                isMythical: response.is_mythical,
                isLegendary: response.is_mythical,
                isBaby: response.is_baby,
                evolutionChain: response.evolution_chain,
            }

        } catch (err) {
            console.log(err)
        }
    }))

    writeToFile(JSON.stringify(data), "species.json")
}

const getGrowthRates = async () => {
    const species = (await api.listGrowthRates(0, 2000)).results
    const data = await Promise.all((species).map(async (species) => {
        try {
            const response = await api.getGrowthRateByName(species.name)
            return {
                name: response.name,
                id: response.id,
                levels: response.levels
            }
        } catch (err) {
            console.log(err)
        }
    }))

    writeToFile(JSON.stringify(data), "growthRates.json")
}

const getMoves = async () => {
    const moveApi = new MoveClient()
    const species = (await moveApi.listMoves(0, 10000)).results
    const data = await Promise.all((species).map(async (species) => {
        try {
            const response = await moveApi.getMoveByName(species.name)
            return {
                name: response.name,
                power: response.power,
                pp: response.power,
                accuracy: response.accuracy,
                id: response.accuracy,
                effectChange: response.effect_changes,
                type: response.type,
                statChanges: response.stat_changes,
            }
        } catch (err) {
            console.log(err)
        }
    }))

    writeToFile(JSON.stringify(data), "moves.json")
}

const getItems = async () => {
    const items = new ItemClient();
    const species = (await items.listItems(0, 10000)).results
    const data = await Promise.all((species).map(async (species) => {
        try {
            const response = await items.getItemByName(species.name)
            return {
                id: response.id,
                name: response.id,
                image: response.sprites.default,
                cost: response.cost,
                category: response.category,
                flingPower: response.fling_power,
                flingEffect: response.fling_effect,
                attributes: response.attributes
            }
        } catch (err) {
        }
    }))

    writeToFile(JSON.stringify(data), "items.json")
}

getPokemon();
//getPokemonSpecies()
//getGrowthRates();
//getMoves()
//getItems();



const writeToFile = (data: any, file: string) => {
    fs.writeFile(file, data, (error) => {
        if (error) {
            throw error;
        }
        console.log("data.json written correctly");
    });
}

