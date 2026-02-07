import React from "react";
import ButtonComponent from "./ButtonComponent";
import TextComponent from "./TextComponent";
import Icone from "./Icon";
import { View, StyleSheet } from "react-native";


export default function HeaderBack({onPress, title}){
    return(
        <View style={styles.header}>
            <ButtonComponent
                onPress={onPress}
                style={styles.buutonContain}
                disabled={false}
            >
                <Icone nom={'chevron-left'} taille={20} color={'rgba(0,100,255,0.8)'} style={styles.icon}/>
            </ButtonComponent>

            <TextComponent style={styles.detatils}>{title}</TextComponent>
        </View>
    )
}

const styles = StyleSheet.create({
    
    header:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingTop: 60,
        gap: 70
    },
    buutonContain:{},
    icon:{
    },
    detatils:{
        fontSize: 22,
        fontWeight: 500
    }    
})

