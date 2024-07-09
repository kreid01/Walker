import { useQuery } from "react-query";
import { getPokemonById, getPokemonByIdQuery, getPokemonImageQuery } from "../repositories/pokemonRepository";
import { TouchableOpacity, Image } from "react-native";

export const ActivePokemon = ({ pokemonId, setActivePokemon }) => {
    const { data, isSuccess } = useQuery(["activePokemon", pokemonId], getPokemonImageQuery);

    return (
        isSuccess &&
        <TouchableOpacity onPress={() => setActivePokemon(pokemonId)} className="bg-white h-20 w-20 rounded-full ">
            <Image source={{ uri: data?.front }} className="h-20 w-20" />
        </TouchableOpacity>
    );
};
