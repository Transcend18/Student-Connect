import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "../Screens/LoginScreen";
import SignUp from "../Screens/SignUp";
import Users from "../Screens/Users";
import ChatScreen from "../Screens/ChatScreen";
const Stack = createStackNavigator()

export default function StackNavigation(){
    return(
        <Stack.Navigator initialRouteName="Users" screenOptions={{headerShown: false}}>
            <Stack.Screen component={LoginScreen} name="Login"/>
            <Stack.Screen component={SignUp} name="SignUp"/>
            <Stack.Screen component={Users} name="Users"/>
            <Stack.Screen component={ChatScreen} name="Chat"/>
        </Stack.Navigator>
    )
}