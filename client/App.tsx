import React from "react";
import "./styles";
import { QueryClientProvider, QueryClient } from "react-query"
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { ShopScreen } from "./screens/ShopScreen";
import { Inventory } from "./screens/InventoryScreen";
import { FightScreen } from "./screens/FightScreen";
import { StatusBar } from "react-native";
import { Provider, useCreateStore } from 'tinybase/ui-react';
import { createStore } from "tinybase/store";
import { useFonts } from "./hooks/useFonts";

   export const store = createStore()
      .setTablesSchema({
        pokemon: {
        name: {type: "string"},
        image: {type: "string"}
        }
      })


export default function App() {
  const queryClient = new QueryClient()
  
  const LoadFonts = async () => {
    await useFonts();
  };
  

LoadFonts();

  return (
    <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <StatusBar barStyle="light-content" translucent />
      <NavigationContainer>
        <MyTabs />
      </NavigationContainer>
    </QueryClientProvider>
    </Provider>
  );
}

const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: { display: "none" },
      }}
      initialRouteName="Fight"
    >
      <Tab.Screen
        name="Inventory"
        options={{ headerShown: false }}
        component={Inventory}
      />
      <Tab.Screen
        name="Fight"
        options={{ headerShown: false }}
        component={FightScreen}
      />
      <Tab.Screen
        name="Shop"
        component={ShopScreen}
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  );
}

