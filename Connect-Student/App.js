import { PaperProvider } from "react-native-paper";
import StackNavigation from "./Navigation/StackNavigation";
import { NavigationContainer } from "@react-navigation/native";

export default function App() {
  return (
   <PaperProvider>
    <NavigationContainer>
      <StackNavigation/>
    </NavigationContainer>
   </PaperProvider>
  );
}

