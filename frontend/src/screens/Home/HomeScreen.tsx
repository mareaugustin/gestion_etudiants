import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../../pages/Home/Home";
import Details from "../../pages/Home/Details";


const homeStack = createNativeStackNavigator()

export default function HomeScreen(){
    return(
        <homeStack.Navigator
            screenOptions={{headerShown: false}}
        >
            <homeStack.Screen name="home" component={Home} />
            <homeStack.Screen name="details" component={Details} />
        </homeStack.Navigator>
    )
}