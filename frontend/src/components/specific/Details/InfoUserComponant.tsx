import React, { Children } from "react";
import { View, StyleSheet } from "react-native";
import Icone from "../../common/Icon";
import TextComponent from "../../common/TextComponent";

export default function InfoUserComponent({icone, label, info}){
    return(
        <View style={styles.infoContain}>
            <View style={styles.iconInfo}>
                <Icone nom={icone} taille={18} color={'rgba(0,100,255,0.8)'} style={styles.icon}/>
            </View>
            <View style={styles.titleInfo}>
                <TextComponent style={styles.title}>{label}</TextComponent>
                <TextComponent style={styles.titleContain}>{info}</TextComponent>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    infoContain:{
        backgroundColor: '#fff',
        marginTop: 10,
        borderRadius: 10,
        flexDirection: 'row',
        paddingVertical: 12,
        paddingHorizontal: 15,
        alignItems: 'center',
        gap: 20
    },
    iconInfo:{
        backgroundColor: 'rgba(0,100,255,0.2)',
        padding: 15,
        borderRadius: 10
    },
    title:{
        textTransform: 'uppercase',
        color: 'rgba(0,0,0,0.5)',
        fontSize: 12,
        fontWeight: '500'
    },
    titleContain:{
        fontWeight: 'bold',
        fontSize: 16
    },
    titleInfo:{
        gap: 3
    },
    icon:{}
})