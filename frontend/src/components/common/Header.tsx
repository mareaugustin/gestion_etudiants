import React from "react";
import { View, StyleSheet } from "react-native";
import TextComponent from "./TextComponent";
import ButtonComponent from "./ButtonComponent";
import Icone from "./Icon";

export default function Header({title, onPress, styleButton, nomIcone, tailleIcone, colorIcone, styleIcon}){
    return(
        <View style={styles.header}>
            <TextComponent style={styles.title}>{title}</TextComponent>
            <ButtonComponent
                onPress={onPress}
                disabled={false}
                style={styleButton}
            >
                <Icone nom={nomIcone} taille={tailleIcone} color={colorIcone} style={styleIcon}/>
            </ButtonComponent>
        </View>
    )
}

const styles = StyleSheet.create({
   
    title:{
        fontSize: 22,
        fontWeight: 500
    },
    header:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingTop: 60

    }
})