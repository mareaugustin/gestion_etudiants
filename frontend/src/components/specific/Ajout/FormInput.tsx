import React, {useState} from "react";
import { View, StyleSheet } from "react-native";
import TextComponent from "../../common/TextComponent";
import InputComponent from "../../common/InputComponent";

export default function FormInput({value, onChangeText, secureTextEntry, placeholder, label}){

    return(
        <View style={styles.container}>
            <TextComponent style={styles.label}>{label}</TextComponent>
            <InputComponent 
                value={value}
                secureTextEntry={secureTextEntry}
                placeholder={placeholder}
                style={styles.input}
                onChangeText={onChangeText}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        width: '100%',
        gap: 10
    },
    label:{
        fontWeight: '500',
        fontSize: 18
    },
    input:{
        borderWidth: 1,
        paddingHorizontal: 10,
        fontSize: 16,
        color: 'gray',
        borderColor: 'rgba(0,0,0,0.2)',
        backgroundColor: '#fff',
        borderRadius: 8
    }
})