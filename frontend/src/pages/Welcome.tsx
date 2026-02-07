import React, { useEffect } from "react";
import { View, StyleSheet } from "react-native";
import ImageComponent from "../components/common/Image";
import ButtonComponent from "../components/common/ButtonComponent";
import AsyncStorage from "@react-native-async-storage/async-storage";
import TextComponent from "../components/common/TextComponent";

export default function Welcome({navigation}){

    useEffect(()=>{
        async function checkAuth(){
            try{
                const statut = await AsyncStorage.getItem('statut')
                if(statut){
                    navigation.replace('main-page')
                }else{return}
            }catch(e){}
        }

        checkAuth()
    }, [])

    function hanldeAuth(){
        navigation.navigate('auth')
    }

    return(
        <View style={styles.container}>
            <View style={styles.subContain}>
                <View style={styles.imgContain}>
                    <ImageComponent source={require('../assets/images/welcome-img.png')} style={styles.img}/>
                </View>
                
                <View style={styles.supContain}>
                    <TextComponent style={styles.text}>Bienvenue !</TextComponent>
                    
                    <View style={styles.suppContain}>
                        <TextComponent style={styles.textSub}>Gérez facilement vos étudiants</TextComponent>
                        <TextComponent style={styles.textSub}>de là où vous êtes.</TextComponent>
                    </View>
                </View>
            </View>

            <ButtonComponent
            disabled={false}
                onPress={hanldeAuth}
                style={styles.button}
            >
                <TextComponent style={styles.textButton}>S'identifier</TextComponent>
            </ButtonComponent>
        </View>
    )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    paddingVertical: 100
  },
  subContain:{
    alignItems: 'center',
    justifyContent: 'center',
    gap: 40
  },
  supContain:{
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10
  },

  suppContain:{
    alignItems: 'center',
    justifyContent: 'center',
    
  },

  imgContain:{
    width: 250,
    height: 250,
    padding: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 150,
    backgroundColor: 'rgba(0,100,255,0.1)'
  },

  img:{
    width: '100%',
    height: '100%',
  },

  text:{
    fontWeight: 'bold',
    fontSize: 30
  },
  textSub:{
    fontSize: 20,
    color: 'gray'
  },


  button:{
    width: '80%',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    backgroundColor: 'rgba(0,100,255,0.8)'
  },
  textButton:{
    fontWeight: 'bold',
    color: '#fff',
    fontSize: 18
  }
});