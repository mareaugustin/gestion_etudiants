import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Ajout from "../../pages/Ajout/Ajout";

const ajoutStack = createNativeStackNavigator()

export default function AjoutScreen(){
    return(
        
        <ajoutStack.Navigator
            screenOptions={{headerShown: false}}
        >
            <ajoutStack.Screen name="ajout" component={Ajout} />
        </ajoutStack.Navigator>
    )
}