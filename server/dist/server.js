"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const pokenode_ts_1 = require("pokenode-ts");
const fs = require("fs");
const api = new pokenode_ts_1.PokemonClient();
const getPokemon = () => __awaiter(this, void 0, void 0, function* () {
    const pokemon = (yield api.listPokemons(0, 151)).results;
    const data = yield Promise.all(pokemon.map((p) => __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield api.getPokemonByName(p.name);
            const stats = response.stats;
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
            };
        }
        catch (err) {
            console.log(err);
        }
    })));
    writeToFile(JSON.stringify(data), "pokemon.json");
});
const getPokemonSpecies = () => __awaiter(this, void 0, void 0, function* () {
    const species = (yield api.listPokemonSpecies(0, 2000)).results;
    const data = yield Promise.all((species).map((species) => __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield api.getPokemonSpeciesByName(species.name);
            return {
                id: response.id,
                name: response.name,
                generation: response.generation,
                growthRate: response.growth_rate,
                isMythical: response.is_mythical,
                isLegendary: response.is_mythical,
                isBaby: response.is_baby,
                evolutionChain: response.evolution_chain,
            };
        }
        catch (err) {
            console.log(err);
        }
    })));
    writeToFile(JSON.stringify(data), "species.json");
});
const getGrowthRates = () => __awaiter(this, void 0, void 0, function* () {
    const species = (yield api.listGrowthRates(0, 2000)).results;
    const data = yield Promise.all((species).map((species) => __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield api.getGrowthRateByName(species.name);
            return {
                name: response.name,
                id: response.id,
                levels: response.levels
            };
        }
        catch (err) {
            console.log(err);
        }
    })));
    writeToFile(JSON.stringify(data), "growthRates.json");
});
const getMoves = () => __awaiter(this, void 0, void 0, function* () {
    const moveApi = new pokenode_ts_1.MoveClient();
    const species = (yield moveApi.listMoves(0, 10000)).results;
    const data = yield Promise.all((species).map((species) => __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield moveApi.getMoveByName(species.name);
            return {
                name: response.name,
                power: response.power,
                pp: response.power,
                accuracy: response.accuracy,
                id: response.accuracy,
                effectChange: response.effect_changes,
                type: response.type,
                statChanges: response.stat_changes,
            };
        }
        catch (err) {
            console.log(err);
        }
    })));
    writeToFile(JSON.stringify(data), "moves.json");
});
const getItems = () => __awaiter(this, void 0, void 0, function* () {
    const items = new pokenode_ts_1.ItemClient();
    const species = (yield items.listItems(0, 10000)).results;
    const data = yield Promise.all((species).map((species) => __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield items.getItemByName(species.name);
            return {
                id: response.id,
                name: response.id,
                image: response.sprites.default,
                cost: response.cost,
                category: response.category,
                flingPower: response.fling_power,
                flingEffect: response.fling_effect,
                attributes: response.attributes
            };
        }
        catch (err) {
        }
    })));
    writeToFile(JSON.stringify(data), "items.json");
});
getPokemon();
const writeToFile = (data, file) => {
    fs.writeFile(file, data, (error) => {
        if (error) {
            throw error;
        }
        console.log("data.json written correctly");
    });
};
//# sourceMappingURL=server.js.map