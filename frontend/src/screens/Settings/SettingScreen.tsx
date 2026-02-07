import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Setting from "../../pages/Settings/Setting";

const settingStack = createNativeStackNavigator()

export default function SettingScreen(){
    return(
        
        <settingStack.Navigator
            screenOptions={{headerShown: false}}
        >
            <settingStack.Screen name="params" component={Setting} />
        </settingStack.Navigator>
    )
}