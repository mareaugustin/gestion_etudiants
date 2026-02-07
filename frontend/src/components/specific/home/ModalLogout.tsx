import React from "react";
import { View, StyleSheet } from "react-native";
import ButtonComponent from "../../common/ButtonComponent";
import TextComponent from "../../common/TextComponent";
import ModalComponent from "../../common/ModalComponent";


export default function ModalLogout({onRequestClose, visible, onPressReject, onPressConfirm}){
    return(
        <ModalComponent 
            visible={visible}
            animationType="fade"
            onRequestClose={onRequestClose}
        
        >
            <View style={styles.modalsub}>
                <View style={styles.modal}>
                    <View style={styles.cont}>
                        <TextComponent style={styles.lo}>Se déconnecter ?</TextComponent>
                        <View style={styles.loContain}>
                            <TextComponent style={styles.lo1}>Attention ! Vous êtes sur le</TextComponent>
                            <TextComponent style={styles.lo1}>point de vous déconnecter. Êtes</TextComponent>
                            <TextComponent style={styles.lo1}>vous sûr ?</TextComponent>
                        </View>
                    </View>
                    <View style={styles.containRes}>
                        <ButtonComponent
                            onPress={onPressReject}
                            disabled={false}
                            style={styles.reject}
                        >
                            <TextComponent style={styles.no}>Non</TextComponent>
                        </ButtonComponent>
                        <ButtonComponent
                            onPress={onPressConfirm}
                            disabled={false}
                            style={styles.confirm}
                        >
                            <TextComponent style={styles.yes}>Oui</TextComponent>
                        </ButtonComponent>
                    </View>
                </View>
            </View>
        </ModalComponent>
    )
}


const styles = StyleSheet.create({
    containRes:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        // paddingHorizontal: 10,
        width: '100%',
        borderTopWidth: 1,
        borderTopColor: 'rgba(0,0,0,0.1)',
        paddingVertical: 10,
    },
    reject:{
        borderRightWidth: 1,
        alignItems: 'center',
        justifyContent:'center',
        borderRightColor: 'rgba(0,0,0,0.1)',
        width: '50%'

    },
    confirm:{
        borderLeftWidth: 1,
        width: '50%',
        alignItems: 'center',
        borderLeftColor: 'rgba(0,0,0,0.1)',
        justifyContent:'center',
    },
    no:{
        fontSize: 17,
        color: 'rgba(0,100,255,0.8)',
        fontWeight: '500'
    },
    yes:{
        fontSize: 17,
        color: 'rgba(255,0,0,1)',
        fontWeight: '500'
    },
    lo:{
        fontWeight: 'bold',
        fontSize: 18
    },
    lo1:{
        fontSize: 15,
        color: 'gray'
    },
    loContain:{
        alignItems: 'center',
        justifyContent: 'center',
        gap: 2
    },
    cont:{
        alignItems: 'center',
        justifyContent: 'center',
        gap: 5,
        paddingVertical: 10,
        paddingHorizontal: 20
    },
    modal:{
        width: '70%',
        backgroundColor: 'white',
        borderRadius: 10
        
    },
    modalsub:{
        flex: 1,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
        
    },
    error:{
        color: '#f00',
    }
})