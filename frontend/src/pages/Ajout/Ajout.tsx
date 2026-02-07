import React, {useEffect, useState} from "react";
import { View, StyleSheet } from "react-native";
import Header from "../../components/common/Header";
import FormInput from "../../components/specific/Ajout/FormInput";
import TextComponent from "../../components/common/TextComponent";
import ButtonComponent from "../../components/common/ButtonComponent";
import Icone from "../../components/common/Icon";
import ModalComponent from "../../components/common/ModalComponent";
import { useCheckAuth } from "../../hooks/useCheckAuth";
import { usePost } from "../../hooks/usePost";
import Loader from "../../components/common/Loading";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ModalStatut from "../../components/specific/Ajout/ModalStatut";
import {Validate} from '../../components//specific/Ajout/Validate'


export default function Ajout({navigation}){

    useCheckAuth(navigation)

    const [nom, setNom] = useState('')
    const [prenom, setPrenom] = useState('')
    const [age, setAge] = useState(1)
    const [tel, setTel] = useState(1)
    const [sexe, setSexe] = useState('M')
    const [successModal, setSuccessModal] = useState(false)
    const [errorModal, setErrorModal] = useState(false)
    const [email, setEmail] = useState(null)

    const {loading, success, error, postData} = usePost('/ajouter')

    useEffect(()=>{
        async function getEmail(){
            try{
                const emailSaved = await AsyncStorage.getItem('email')
                if(emailSaved){
                    setEmail(emailSaved)
                }
            }catch(e){}
        }

        getEmail()
    }, [])

    function ClearState(){
        setNom(''),
        setPrenom(''),
        setAge(0),
        setTel(0),
        setSexe('M')
    }

    useEffect(()=>{
        if(success){
            setSuccessModal(true)
            ClearState()
            setTimeout(()=>{
                setSuccessModal(false)
            }, 2500)
        }else if(error){
            setErrorModal(true)
            setTimeout(()=>{
                setErrorModal(false)
            }, 2500)
        }
    }, [success, error])

    async function handleAjout(){
        if(!Validate(nom,prenom,age,tel,sexe)){
            setTimeout(()=>{
                setErrorModal(true)
            }, 2500)
        }
        await postData({nom, prenom, age, telephone: tel, sexe, email})
    }

    function handleClose(){
        setSuccessModal(false)
    }


    return(
        <>
            <View style={styles.contain}>
                <Header 
                    title={'Ajouter un étudiant'}
                    styleButton={styles.buttonContain}
                    nomIcone={'user'}
                    tailleIcone={20}
                    colorIcone={'#00f'}
                    styleIcon={styles.logout}

                    onPress={null}
                />
        
                <View style={styles.containf}>
                    <FormInput
                        label={'Nom'}
                        value={nom}
                        placeholder={'Ex: Millogo'}
                        secureTextEntry={false}
                        onChangeText={(nom)=>{setNom(nom)}}
                    />

                    <FormInput
                        label={'Prénom'}
                        value={prenom}
                        placeholder={'Ex: Maré'}
                        secureTextEntry={false}
                        onChangeText={(prenom)=>{setPrenom(prenom)}}
                    />

                    <FormInput
                        label={'Âge'}
                        value={age}
                        placeholder={'Ex: 20'}
                        secureTextEntry={false}
                        onChangeText={(age)=>{setAge(age)}}
                    />

                    <FormInput
                        label={'Téléphone'}
                        value={tel}
                        placeholder={'Ex: 65656565'}
                        secureTextEntry={false}
                        onChangeText={(tel)=>{setTel(tel)}}
                    />

                    <View style={styles.genre}>
                        <TextComponent style={styles.label}>Sexe</TextComponent>
                        <View style={styles.button}>
                            <ButtonComponent
                                onPress={()=>{setSexe('M')}}
                                style={[styles.sexe, {
                                    backgroundColor : sexe === 'M' ? '#007aff' : 'transparent'
                                }]}
                                disabled={false}
                            >
                                <TextComponent style={[styles.labell, {
                                    color : sexe === 'M' ? '#fff' : '#000'
                                }]}>
                                    Homme
                                </TextComponent>
                            </ButtonComponent>
                            <ButtonComponent
                                onPress={()=>{setSexe('F')}}
                                style={[styles.sexe, {
                                    backgroundColor : sexe === 'F' ? '#007aff' : 'transparent'
                                }]}
                                disabled={false}
                            >
                                <TextComponent style={[styles.labell, {
                                    color : sexe === 'F' ? '#fff' : '#000'
                                }]}>
                                    Femme
                                </TextComponent>
                            </ButtonComponent>
                        </View>
                    </View>

                    <ButtonComponent 
                        style={styles.buttonSave}
                        onPress={handleAjout}
                        disabled={loading}
                    >
                        {loading ? (
                            <Loader couleur={'#fff'} taille={24}/>
                        ):(
                            <>
                                <Icone nom={'save'} taille={20} color={'#fff'} style={styles.icon}/>
                                <TextComponent style={styles.save}>Enregistrer</TextComponent>
                            </>
                        )}
                    </ButtonComponent>
                    
                </View>
            </View>

            <ModalStatut
                successDeleteModal={false}
                successModifModal={false}
                visible={successModal || errorModal}
                onRequestClose={handleClose}
                successModal={successModal}
                error={error}
            />
        </>
    )
}

const styles = StyleSheet.create({
    contain:{
        flex: 1,
        paddingHorizontal: 18,
    },
    buttonContain:{
        backgroundColor: 'rgba(0,100,255,0.2)',
        paddingHorizontal: 13,
        paddingVertical: 10,
        borderRadius: 50
    },
    logout:{},
    containf:{
        marginVertical: 20,
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        gap: 30
    },
    label:{
        fontWeight: '500',
        fontSize: 18
    },
    labell:{
        fontWeight: '500',
        fontSize: 14,
        color: '#fff'
    },
    genre:{
         width: '100%',
        gap: 10
    },
    button:{
        borderWidth:1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems:'center',
        backgroundColor: '#d8d6d693',
        borderRadius: 8,
        borderColor: 'rgba(0,0,0,0.2)',
    },
    sexe:{
        paddingVertical: 12,
        paddingHorizontal: 50,
        borderRadius: 8,
        width:'50%',
        alignItems: 'center',
    },
    
    icon:{},
    save:{
        fontWeight: 'bold',
        color: '#fff',

        fontSize: 16
    },
    buttonSave:{
        width: '100%',
        backgroundColor: '#007aff',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 18,
        borderRadius: 8,
        gap: 10,
        marginTop: 25,
    },
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