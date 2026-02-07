import React from "react";
import { TextInput } from "react-native";

export default function InputComponent({value, secureTextEntry, placeholder, style, onChangeText}){
    return <TextInput 
                secureTextEntry={secureTextEntry}
                value={value}
                placeholder={placeholder}
                style={style}
                onChangeText={onChangeText}
            />
}