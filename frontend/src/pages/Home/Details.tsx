import React, {useState, useEffect, useCallback} from "react";
import { View, StyleSheet, Modal} from "react-native";
import TextComponent from "../../components/common/TextComponent";
import Icone from "../../components/common/Icon";
import InfoUserComponent from "../../components/specific/Details/InfoUserComponant";
import HeaderBack from "../../components/common/HeaderBack";
import ButtonComponent from "../../components/common/ButtonComponent";
import ModalDelete from "../../components/specific/Details/ModalDelete";
import {useDelete} from '../../hooks/useDelete'
import ModalStatut from "../../components/specific/Ajout/ModalStatut";
import { useCheckAuth } from "../../hooks/useCheckAuth";
import FormInput from "../../components/specific/Ajout/FormInput";
import {usePut} from '../../hooks/usePut'
import Loader from "../../components/common/Loading";
import ImageComponent from "../../components/common/Image";

export default function Details({navigation, route}){

    useCheckAuth(navigation)
    
    const {etudiants} = route.params

    const [nom, setNom] = useState('')
    const [prenom, setPrenom] = useState('')
    const [age, setAge] = useState(0)
    const [tel, setTel] = useState(0)
    const [sexe, setSexe] = useState(null)

    const [deleteModal, setDeleteModal] = useState(false)
    const [successDeleteModal, setSuccessDeleteModal] = useState(false)
    const [errorDeleteModal, setErrorDeleteModal] = useState(false)

    const [modifModal, setModifModal] = useState(false)
    const [successModifModal, setSuccessModifModal] = useState(false)
    const [errorModifModal, setErrorModifModal] = useState(false)

    const {success, error, deleteData} = useDelete(`/supprimer/${etudiants.id}`)
    const {loading, success: successModif, error: errorModif, putData} = usePut(`/modifier/${etudiants.id}`)


    function handleGoBack(){
        navigation.goBack()
    }

     function handleCancel(){
        if(deleteModal){
            setDeleteModal(false)
            return
        } else if(modifModal){
            setModifModal(false)
            return
        }
    }

    useEffect(()=>{
        if(success){
            handleCancel()
            setSuccessDeleteModal(true)
            setTimeout(()=>{
                setSuccessDeleteModal(false)
                handleGoBack()
            }, 2500) 
        }else if(error){
            handleCancel()
            setErrorDeleteModal(true)
            setTimeout(()=>{
                setErrorDeleteModal(false)
            }, 2500)
        }
    }, [success, error])


    useEffect(()=>{
        if(successModif){
            setSuccessModifModal(true)
            setTimeout(()=>{
                setSuccessModifModal(false)
                handleGoBack()
            }, 2500) 
        }else if(errorModif){
            setErrorModifModal(true)
            setTimeout(()=>{
                setErrorModifModal(false)
                handleCancel()
            }, 2500)
        }
    }, [successModif, errorModif])


    async function handleDelete(){
       await deleteData()
    }

    async function handlePut(){
        await putData({ 
            nom, 
            prenom, 
            age: Number(age), 
            telephone: Number(tel), 
            sexe 
        })
    }

    function handleClose(){
        setSuccessDeleteModal(false)
    }

    function editModalOpen(){
        setNom(etudiants?.nom)
        setPrenom(etudiants?.prenom)
        setAge(String(etudiants?.age || ''))
        setTel(String(etudiants?.telephone || ''))
        setSexe(etudiants?.sexe)
        setModifModal(true)

    }

    const image = {
        uri: `https://randomuser.me/api/portraits/men/${Math.floor(Math.random() * 100)}.jpg`
    };

   

    return(
        <>
        <View style={styles.contain}>

            <HeaderBack 
                onPress={handleGoBack}
                title={'Détails de l\'étudiant'}
            />
            

            <View style={styles.containI}>
                <View style={styles.user}>
                    <ImageComponent source={image} style={styles.image}/>
                </View>
                <TextComponent style={styles.nom}>{etudiants?.nom || 'N/A'} {etudiants?.prenom || 'N/A'}</TextComponent>
            </View>

            <InfoUserComponent 
                icone={'user'}
                label={'Nom complet'}
                info={`${etudiants?.nom || 'N/A'} ${etudiants?.prenom || 'N/A'}`}
            />

            <InfoUserComponent 
                icone={'calendar'}
                label={'Age'}
                info={`${etudiants?.age || 'N/A'} ans`}
            />

            <InfoUserComponent 
                icone={'phone'}
                label={'Téléphone'}
                info={etudiants?.telephone || 'N/A'}
            />

            <InfoUserComponent 
                icone={'venus-mars'}
                label={'Sexe'}
                info={etudiants?.sexe === 'M' ? 'Masculin' : 'Féminin'}
            />

            <View style={styles.action}>
                <ButtonComponent
                    onPress={editModalOpen}
                    style={styles.modif}
                    disabled={false}

                >
                    <TextComponent style={styles.text}>
                        Modifier les infos
                    </TextComponent>
                </ButtonComponent>
                <ButtonComponent
                    onPress={()=>{setDeleteModal(true)}}
                    style={styles.supprim}
                    disabled={false}

                >
                    <TextComponent style={styles.textSup}>
                        Supprimer l'étudiant
                    </TextComponent>
                </ButtonComponent>
            </View>

        </View>

        <Modal
            visible={modifModal}
            animationType="slide"
            onRequestClose={handleCancel}
            transparent
        >
            <View style={styles.containM}>
                <View style={styles.containsub}>
                    <ButtonComponent
                        onPress={handleCancel}
                        style={styles.iconm}
                        disabled={false}
                    >
                        <Icone nom={'close'} taille={30} color={'rgba(0,0,0,0.2)'} style={styles.iconmm}/>
                    </ButtonComponent>

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
                        onPress={handlePut}
                        disabled={loading}
                    >
                        {loading ? (
                            <Loader couleur={'#fff'} taille={24}/>
                        ):(
                            <>
                                <Icone nom={'save'} taille={20} color={'#fff'} style={styles.icon}/>
                                <TextComponent style={styles.save}>Modifier</TextComponent>
                            </>
                        )}
                    </ButtonComponent>
                </View>
            </View>
        </Modal>

        <ModalDelete 
            visible={deleteModal}
            onRequestClose={handleCancel}
            onPressReject={handleCancel}
            onPressConfirm={handleDelete}
            item={etudiants}
        />

         <ModalStatut
            successModal={false} 
            visible={successDeleteModal || errorDeleteModal || successModifModal || errorModifModal}
            onRequestClose={handleClose}
            successDeleteModal={successDeleteModal}
            successModifModal={successModifModal}
            error={error}
        />
        </>
    )
}

const styles = StyleSheet.create({
    iconm:{
        position: 'absolute',
        right:0,
        borderWidth:1,
        padding: 10,
        borderTopRightRadius: 50,
        borderColor: 'rgba(0,100,255,0.8)',
        alignItems:'center',
        justifyContent:'center'
    },
    image:{
         width: 120,
    height: 120,
    borderRadius: 10,
    
    },
    contain:{
        flex: 1,
        paddingHorizontal: 18,
    },
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
    },
    iconSub:{},
    nom:{
        fontWeight: 'bold',
        fontSize: 20
    },
    containI:{
        marginVertical: 40,
        alignItems: 'center',
        justifyContent: 'center',
        gap: 10
    },
    user:{
        borderRadius: 10,
    borderWidth: 1,
        borderColor: 'rgba(0,100,255,0.8)'
    },
    action:{
        alignItems:'center',
        justifyContent:'center',
        marginTop: 30,
        gap: 10
    },
    modif:{
        borderWidth: 1,
        width: '100%',
        alignItems: 'center',
        justifyContent:'center',
        paddingVertical: 13,
        borderRadius: 10,
        backgroundColor: 'rgba(0,100,255,0.8)',
        borderColor: 'rgba(0,100,255,0.8)',
    },
    supprim:{
         borderWidth: 1,
        width: '100%',
        alignItems: 'center',
        justifyContent:'center',
        paddingVertical: 13,
        borderRadius: 10,
        backgroundColor: 'rgba(255,100,0,0.1)',
        borderColor: 'rgba(255,100,0,0.1)',
    },
    text:{
        color: '#fff',
        fontSize: 15,
        fontWeight: 'bold',
    },
    textSup:{
        color: '#f00',
        fontSize: 15,
        fontWeight: 'bold',
    },
    containM:{
        backgroundColor: '#fff',
        flex: 1,
        marginTop: 180,
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50,
        borderTopWidth: 1,
        borderRightWidth: 1,
        borderLeftWidth: 1,
        borderColor: 'rgba(0,100,255,0.8)'
    },
    containsub:{
        paddingTop: 50,
        paddingHorizontal: 18,
        gap: 12,
        position: 'relative'
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
    
})