import React, {useState} from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/Home/HomeScreen";
import AjoutScreen from "../screens/Ajout/AjoutScreen";
import SettingScreen from "../screens/Settings/SettingScreen";
import { StyleSheet } from "react-native";
// import Icon from 'react-native-vector-icons'
import Icone from "../components/common/Icon";


const tabStack = createBottomTabNavigator()


export default function Tabs(){

    // const [activeTab, setActiveTab] = useState('home')

    return(
        <tabStack.Navigator
            screenOptions = {({ route }) => ({
                tabBarIcon: ({ size, color }) => {
                    let iconName

                    if(route.name === 'Accueil') iconName = 'home'

                    if(route.name === 'Ajouter') iconName = 'plus'

                    if(route.name === 'Parametres') iconName = 'gear'

                    return <Icone nom={iconName} taille={size} color={color} style={styles.icon}/>
                },
                headerShown: false,
                tabBarActiveTintColor: '#007aff',
                tabBarInactiveTintColor: 'gray',
                tabBarStyle: { height: 90, },
                tabBarLabelStyle: { fontSize: 13 },
                tabBarItemStyle: { padding: 10 }
            })}
        >
            <tabStack.Screen name="Accueil" component={HomeScreen} />
            <tabStack.Screen name="Ajouter" component={AjoutScreen} />
            <tabStack.Screen name="Parametres" component={SettingScreen} />
        </tabStack.Navigator>
    )
}


const styles = StyleSheet.create({
    icon:{}
})