import * as Font from 'expo-font';

export const useFonts = async () =>
  await Font.loadAsync({
    vt: require('../fonts/VT323-Regular.ttf'),
  });