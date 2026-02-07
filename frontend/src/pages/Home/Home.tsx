import React, {useEffect, useState, useCallback} from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {useCheckAuth} from '../../hooks/useCheckAuth'
import TextComponent from "../../components/common/TextComponent";
import Icone from "../../components/common/Icon";
import Header from "../../components/common/Header";
import InputComponent from "../../components/common/InputComponent";
import {useGet} from '../../hooks/useGet'
import Loader from "../../components/common/Loading";
import ModalLogout from "../../components/specific/home/ModalLogout";
import ListEtudiants from "../../components/specific/home/ListeEtudiants";


export default function Home({navigation}){

    useCheckAuth(navigation)

    const [search, setSearch] = useState('')
    const [alertLogout, setAlertLogout] = useState(false)
    const [email, setEmail] = useState(null)

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

    const {loading, error, data: etudiants, getData} = useGet(email ? `/liste/${email}` : null)

    useFocusEffect(
        useCallback(()=>{
            if(email){
                getData()
            }
        }, [email])
    )
    
    async function handleConfirm(){
        await AsyncStorage.removeItem('statut')
        await AsyncStorage.removeItem('email')
        navigation.replace('auth')
    }

    function handleReject(){
        setAlertLogout(false)
    }


    function handleDetails(item){
        navigation.navigate('details', {etudiants: item})
    }


    const Etudiants = etudiants?.filter(item => {
        const recherche = search.toLowerCase()
        return (
            item.nom?.toLowerCase().includes(recherche) ||
            item.prenom?.toLowerCase().includes(recherche)
        )
    })

    const TotalEtudiant = etudiants?.length || 0
    const Homme = etudiants?.filter(item => item?.sexe === 'M')
    const Femme = etudiants?.filter(item => item?.sexe === 'F')
    const TotalHomme = Homme.length || 0
    const TotalFemme = Femme.length || 0


    

    return(
        <>
            <View style={styles.container}>
                <Header 
                    title={'Bienvenue !'}
                    styleButton={styles.buttonContain}
                    nomIcone={'sign-out'}
                    tailleIcone={20}
                    colorIcone={'#f00'}
                    styleIcon={styles.logout}

                    onPress={()=>{setAlertLogout(true)}}
                />
                
                <TextComponent style={styles.subTitle}>Liste des Etudiants</TextComponent>

                <View style={styles.search}>
                    <InputComponent 
                        secureTextEntry={false}
                        value={search}
                        onChangeText={(text)=>setSearch(text)}
                        placeholder={'Rechercher un étudiant...'}
                        style={styles.input}
                    />
                    <Icone nom={'search'} taille={20} color={'rgba(0,0,0,0.2)'} style={styles.searchIcone}/>
                </View>

                <View style={styles.totalContain}>
                    <View style={styles.totalContainsub}>
                        <TextComponent style={styles.total}>Total: {etudiants.length > 9 ? TotalEtudiant : `0${TotalEtudiant}`}</TextComponent>
                    </View>
                    <View style={styles.totalContainsub}>
                        <TextComponent style={styles.total}>Homme: {Homme.length > 9 ? TotalHomme : `0${TotalHomme}`}</TextComponent>
                    </View>
                    <View style={styles.totalContainsub}>
                        <TextComponent style={styles.total}>Femme: {Femme.length > 9 ? TotalFemme : `0${TotalFemme}`}</TextComponent>
                    </View>
                </View>

                {error && (
                    <View style={styles.vide}>
                        <TextComponent style={styles.error}>{error || 'Erreur lors de la récupération de la liste des etudiants'}</TextComponent>
                    </View>
                )}

                {loading ? (
                    <View style={styles.vide}>
                        <Loader couleur={'#00f'} taille={24} />
                    </View>
                ): Etudiants.length === 0 ? (
                    <View style={styles.vide}>
                        <TextComponent style={styles.aucun}>Aucun étudiant</TextComponent>
                    </View>
                ): ( 
                    <FlatList
                        contentContainerStyle={{paddingBottom: 20, paddingHorizontal: 3}}
                        showsVerticalScrollIndicator={false}
                        data={Etudiants}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({item})=>(
                            <ListEtudiants onPress={()=>{handleDetails(item)}} item={item} />
                        )}
                    />
                )}
            </View>

            <ModalLogout 
                visible={alertLogout}
                onRequestClose={handleReject}
                onPressReject={handleReject}
                onPressConfirm={handleConfirm}
            />
        </>
    )
}

const styles = StyleSheet.create({
    totalContainsub:{
        paddingHorizontal: 10,
        paddingVertical: 3,
        borderRadius: 5,
        backgroundColor: 'rgba(0,0,255,0.5)'

    },
    totalContain:{
        flexDirection: 'row',
        gap: 10,
        marginTop:20
    },
    total:{
        color: '#fff',
        fontWeight: 'bold'
    },
    container:{
        flex: 1,
        paddingHorizontal: 18,
        
    },
    vide:{
        flex: 1, 
        alignItems: 'center', 
        justifyContent:'center',
        marginBottom: 100
    },
    logout:{},
    aucun:{
        color: 'gray',
        fontSize: 15
    },
    buttonContain:{
        backgroundColor: 'rgba(255,100,0,0.2)',
        paddingHorizontal: 11,
        paddingVertical: 10,
        borderRadius: 50
    },
    subTitle:{
        fontSize: 28,
        fontWeight: 'bold',
        marginTop: 20, 
    },
    input:{
        backgroundColor: '#fff',
        paddingLeft: 40,
        paddingRight: 10,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: 'rgba(0,100,255,0.5)'
    },
    searchIcone:{
        position: 'absolute',
        top: 10,
        left: 10,

    },
    search:{
        marginTop: 20,
        position: 'relative'
    },
   
    error:{
        color: '#f00',
    }
})