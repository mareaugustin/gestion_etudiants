import React from "react";
import { ActivityIndicator } from "react-native";

export default function Loader({couleur, taille}){
    return <ActivityIndicator color={couleur} size={taille}/>
}