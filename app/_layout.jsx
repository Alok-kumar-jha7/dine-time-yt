import { Stack } from "expo-router";
import "../global.css";
import { useFonts } from "expo-font";
import Toast from "react-native-toast-message";
export default function RootLayout() {
  useFonts({
    'outfit': require('../assets/fonts/Outfit-Regular.ttf'),
    'outfit-bold': require('../assets/fonts/Outfit-Bold.ttf'),
    
    
  });

  return (
    <Stack screenOptions={{ headerShown: false }} >
      <Toast />
    <Stack.Screen name="index" />
   
  </Stack>
);
}
