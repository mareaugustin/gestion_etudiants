import React from "react";
import ModalComponent from "../../common/ModalComponent";
import { View, StyleSheet } from "react-native";
import Icone from "../../common/Icon";
import TextComponent from "../../common/TextComponent";


export default function ModalStatut({visible, onRequestClose, error, successModal, successDeleteModal, successModifModal}){
    return(
        <ModalComponent 
            visible={visible}
            animationType="fade"
            onRequestClose={onRequestClose}
        
        >
            <View style={styles.modalsub}>
                <View style={styles.modal}>
                    <Icone 
                        nom={`${successModal || successDeleteModal || successModifModal ? 'check' : 'times-circle'}`} 
                        taille={40} 
                        color={`${successModal || successDeleteModal || successModifModal ? 'rgba(0,255,100,0.8)' : 'rgba(255,0,100,0.8)'}`} 
                        style={[styles.iconModal, {
                            backgroundColor : successModal || successDeleteModal || successModifModal ? 'rgba(0,255,100,0.2)' : 'rgba(255,0,100,0.2)'
                        }]}
                    />
                    <TextComponent style={styles.labelModal}>
                        {successModal ? (
                            'Etudiant enregistré avec succès' 
                        ): successDeleteModal ? (
                            'Etudiant supprimé avec succès'
                        ):successModifModal ? (
                            'Etudiant modifié avec succès'
                        ): error}
                    </TextComponent>
                </View>
            </View>
        </ModalComponent>
    )
}


const styles = StyleSheet.create({
    
    modal:{
        width: '70%',
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 20,
        alignItems: 'center',
        justifyContent: 'center',
        gap: 10
        
    },
    modalsub:{
        flex: 1,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
        
    },
    iconModal:{
        padding: 10,
        borderRadius: 30
    },
    labelModal:{
        fontSize: 15,
        color: 'gray'
    }
    
})