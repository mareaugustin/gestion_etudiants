import React, {useState} from "react";
import { View, StyleSheet } from "react-native";
import TextComponent from "../../common/TextComponent";
import InputComponent from "../../common/InputComponent";

export default function FormInput({value, onChangeText, secureTextEntry, placeholder, label}){

    return(
        <View style={styles.emailContain}>
            <TextComponent style={styles.texttt}>{label}</TextComponent>
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
  input:{
    borderWidth: 1,
    borderRadius: 10,
    borderColor: 'gray',
    paddingLeft: 50,
    paddingTop: 10,
    fontSize: 16,
    paddingBottom: 10,
    
  },

  emailContain:{
    gap: 8,
    position: 'relative',
  },
  
  texttt:{
    fontSize: 16,
    fontWeight: '600'
  },

});