import React, {useState, useEffect, useCallback} from "react";
import { View, Text, StyleSheet } from "react-native";
import Header from "../../components/common/Header";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Icone from "../../components/common/Icon";
import TextComponent from "../../components/common/TextComponent";

export default function Setting(){
    const [total, setTotal] = useState(null)
    const [totalHomme, setTotalHomme] = useState(null)
    const [totalFemme, setTotalFemme] = useState(null)

    useEffect(()=>{
        async function Caracteristique() {
            try {
                const total = await AsyncStorage.getItem('total')
                const totalHomme = await AsyncStorage.getItem('totalHomme')
                const totalFemme = await AsyncStorage.getItem('totalFemme')

                if(total){
                    Number(setTotal(total))
                }
                if(totalHomme){
                    Number(setTotalHomme(totalHomme))
                }
                if(totalFemme){
                    Number(setTotalFemme(totalFemme))
                }
            } catch (error) {
                
            }
        }

        Caracteristique()
    }, [total, totalFemme, totalHomme])


    const percentHomme = total ? Math.round((totalHomme * 100) / total) : 0
    const percentFemme = total ? Math.round((totalFemme * 100) / total) : 0

    
    
    return(
        <>
        <View style={styles.contain}>
            <Header 
                title={'Paramètres'}
                styleButton={styles.buttonContain}
                nomIcone={'gear'}
                tailleIcone={20}
                colorIcone={'#00f'}
                styleIcon={styles.logout}

                onPress={null}
            />

            <View style={styles.containcard}>
                <View style={styles.containcardsub}>
                    <TextComponent style={styles.tit}>Total d'étudiants</TextComponent>
                    <Icone nom={'users'} taille={18} color={'rgba(0,0,255,0.5)'} style={styles.icon}/>
                </View>
                <TextComponent style={styles.titt}>{total > 9 ? total : `0${total}`}</TextComponent>
                <TextComponent style={styles.tittt}>inscrit{total > 1 ? 's' : ''}.</TextComponent>
            </View>

            <TextComponent style={styles.titsex}>Répartition par sexe</TextComponent>
            <View style={styles.containcardd}>
                <View style={styles.abso}>
                    <Icone nom={'mars'} taille={30} color={'#00f'} style={styles.icon}/>
                </View>
                <View style={styles.absoo}>
                    <Icone nom={'venus'} taille={30} color={'#f00'} style={styles.icon}/>
                </View>
                
                <View style={styles.sta}>
                    <View style={styles.stat}>
                        <View style={styles.statt}></View>
                        <View style={styles.stattt}>
                            <TextComponent style={styles.statttt}>Homme</TextComponent>
                            <View style={styles.stattttt}>
                                <TextComponent style={styles.staa}>{percentHomme}%</TextComponent>
                                <TextComponent style={styles.staaa}>({totalHomme > 9 ? totalHomme : `0${totalHomme}`})</TextComponent>
                            </View>
                        </View>
                    </View>

                    <View style={styles.stat}>
                        <View style={styles.stattk}></View>
                        <View style={styles.stattt}>
                            <TextComponent style={styles.statttt}>Femme</TextComponent>
                            <View style={styles.stattttt}>
                                <TextComponent style={styles.staa}>{percentFemme}%</TextComponent>
                                <TextComponent style={styles.staaa}>({totalFemme > 9 ? totalFemme : `0${totalFemme}`})</TextComponent>
                            </View>
                        </View>
                    </View>
                </View>
            </View>

            <View style={styles.info}>
                <TextComponent style={styles.inf}>
                    App Gestion Etudiant
                </TextComponent>
            </View>
        </View>
        </>
    )
}

const styles = StyleSheet.create({
    info:{
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 60
    },
    inf:{
        color: 'rgba(0,0,0,0.3)'
    },
    sta:{
        position: 'absolute',
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        bottom: 30,
        paddingRight: 25,
        paddingLeft: 10

    },
    stat:{
        flexDirection: 'row',
        gap: 15,
        alignItems: 'center',
        justifyContent: 'center'
    },
    statt:{
        backgroundColor: '#00f',
        width: 12,
        height: 12,
        borderRadius:6
    },
    stattk:{
        backgroundColor: '#f00',
        width: 12,
        height: 12,
        borderRadius:6
    },
    stattt:{
        gap:2
    },
    statttt:{
        fontWeight: 'bold',
        color: 'rgba(0,0,0,0.5)'
    },
    stattttt:{
        
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5
        
    },
    staa:{
        fontWeight: 'bold',
        fontSize: 16
    },
    staaa:{
         color: 'rgba(0,0,0,0.4)'
    },
    titsex:{
        fontWeight: 'bold',
        fontSize: 18,
        paddingHorizontal:10,
    },
    containcardd:{
        backgroundColor: '#fff',
        boxShadow: '0 0 2px 0px',
        paddingHorizontal:20,
        marginVertical: 10,
        borderRadius: 10,
        height: 280,
        justifyContent:'center',
        alignItems: 'center'
    },
    abso:{
        position: 'absolute',
        left: 15,
        top: 30,
        width: 150,
        borderColor: '#00f',
        height: 150,
        borderRadius: 150,
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    absoo:{
        position: 'absolute',
        right: 15,
        top: 30,
        width: 150,
        borderColor: '#f00',
        height: 150,
        borderRadius: 150,
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    containcard:{
        position: 'relative',
        backgroundColor: '#fff',
        padding:20,
        marginVertical: 30,
        borderRadius: 10,
        gap: 15,
        boxShadow: '0 0 2px 0px',
    },
    containcardsub:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    tit:{
        textTransform: 'uppercase',
        color: 'rgba(0,0,0,0.3)',
        fontSize: 16,
        fontWeight: '500'
    },
    icon:{},
    tittt:{
        color: 'rgba(0,0,0,0.5)',
    },
    titt:{
        fontWeight: 'bold',
        fontSize: 30
    },
    contain:{
        flex: 1,
        paddingHorizontal: 18,
    },
    buttonContain:{
        backgroundColor: 'rgba(0,100,255,0.2)',
        paddingHorizontal: 12,
        paddingVertical: 10,
        borderRadius: 50
    },
    logout:{},
})