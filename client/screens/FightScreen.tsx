import { useIsFocused } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { Fight } from "../components/battle/Fight";


export const FightScreen = ({ navigation, route }) => {
  const { starterPokemonId, fusion } = route.params
  const [focused, setIsFocused] = useState(false)
  const isFocused = useIsFocused();

  useEffect(() => {
    setIsFocused(isFocused)
  }, [isFocused])

  return (
    focused && <Fight navigation={navigation} starterPokemonId={starterPokemonId} fusion={fusion} />
  )
}
