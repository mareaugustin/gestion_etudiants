import React, {useEffect} from "react";
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useNavigation } from "@react-navigation/native";

export function useCheckAuth({navigation}){
    useEffect(() =>{
        async function checkAuth(){
            try{
                const statut = await AsyncStorage.getItem('statut')
                const email = await AsyncStorage.getItem('email')
                console.log('statut:', statut)
                console.log('email:', email)
                if(!statut){
                    navigation.replace('auth')
                }
            }catch(e){}
        }

        checkAuth()
    }, [])
}