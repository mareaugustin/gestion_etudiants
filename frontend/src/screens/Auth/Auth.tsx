import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "../../pages/Auth/Login";

const authStack = createNativeStackNavigator()

export default function AuthScreen(){
    return(
        <authStack.Navigator
            screenOptions={{headerShown: false}}
        >
            <authStack.Screen name="login" component={Login} />
        </authStack.Navigator >
    )
}