import React from "react";
import { View, StyleSheet } from "react-native";
import ButtonComponent from "../../common/ButtonComponent";
import TextComponent from "../../common/TextComponent";
import Icone from "../../common/Icon";
import ImageComponent from "../../common/Image";


export default function ListEtudiants({onPress, item}){

    const image = {
        uri: `https://randomuser.me/api/portraits/men/${Math.floor(Math.random() * 100)}.jpg`
    };

    return(
        <ButtonComponent
            disabled={false}
            onPress={onPress}
            style={styles.listButton}
            key={item.id}
        >
            <View  style={styles.contain}>
                <View style={styles.icon}>
                    <ImageComponent source={image} style={styles.image}/>
                </View>
                <View style={styles.use}>
                    <TextComponent style={styles.nom}>{item.nom || 'N/A'}</TextComponent>
                    <TextComponent style={styles.prenom}>{item.prenom || 'N/A'}</TextComponent>
                </View>
            </View>
            <Icone nom={'chevron-right'} taille={15} color={'rgba(0,0,0,0.2)'} style={styles.listIcon}/>
        </ButtonComponent>
    )
}


const styles = StyleSheet.create({
    image:{
         width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 1,
        borderColor: 'rgba(0,100,255,0.8)'
    },
    listIcon:{},
    nom:{
        fontSize: 20,
        fontWeight: 'bold',
        textTransform: 'uppercase'
    },
    prenom:{
        color: '#00f',
        fontSize: 15
    },
    listButton:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 10,
        paddingHorizontal: 15,
        marginTop: 20,
        backgroundColor: '#fff',
        borderRadius: 10,
        boxShadow: '0 0 2px 0px',
        
    },
    user:{},
    contain:{
        flexDirection: 'row',
        alignItems: 'center',
        gap: 20
    },
    icon:{
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 50,
        
    },
    use:{
        gap: 2
    },
    
})