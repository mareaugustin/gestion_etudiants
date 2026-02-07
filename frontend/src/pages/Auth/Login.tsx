import React, {useState, useEffect} from "react";
import { View, StyleSheet, ImageBackground } from "react-native";
import ModalComponent from "../../components/common/ModalComponent";
import ButtonComponent from "../../components/common/ButtonComponent";
import TextComponent from "../../components/common/TextComponent";
import Icone from "../../components/common/Icon";
import FormInput from "../../components/specific/Auth/FormInput";
import {usePost} from '../../hooks/usePost'
import Loader from "../../components/common/Loading";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ImageComponent from "../../components/common/Image";

export default function Login({navigation}){

    const [auth, setAuth] = useState('register')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)

    const {loading, success, error, postData} = usePost('/register')
    const {
        loading: loadingLogin, 
        success: successLogin, 
        error: errorLogin, 
        postData: postDataLogin
    } = usePost('/login')


    useEffect(()=>{
        if(auth === 'login'){
            setAuth('login')
            return
        }
        setAuth('register')
    },[auth])

    useEffect(() => {
        if (successLogin || success) {
            AsyncStorage.setItem('statut', 'authentifie')
            AsyncStorage.setItem('email', email)
            setTimeout(() => {
                navigation.replace('main-page')
            }, 1500);
        }
    }, [successLogin, success])

    function validateInsertion(){
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email || !emailRegex.test(email)) return false
        if(!email.trim() || !password.trim()) return false
        if(password.length < 8 ) return false
        if(password !== confirmPassword) return false

        return true
    }

    async function handleRegister() {
        if (!validateInsertion()) return
        await postData({
            email,
            password
        })
    }

    async function handleLogin() {
        if(!email.trim() || !password.trim()) return
        await postDataLogin({
            email,
            password
        })
    }

    return(
        <ModalComponent
            visible={true}
            animationType="slide"
            onRequestClose={null}
        >
         
            <ImageComponent source={require('../../assets/images/welcome-img.png')} style={styles.img}/>   
            <View style={styles.container}>
                <View style={styles.containersub}>
                    <View style={styles.connect}>
                        <ButtonComponent
                        disabled={false}
                            onPress={()=>{setAuth('login')}}
                            style={[styles.login, {backgroundColor : auth === 'login' ? '#fff' : 'transparent'}]}
                        >
                            <TextComponent style={styles.text}>Connexion </TextComponent>
                        </ButtonComponent>
                        <ButtonComponent
                        disabled={false}
                            onPress={()=>{setAuth('register')}}
                            style={[styles.login, {backgroundColor : auth === 'register' ? '#fff' : 'transparent'}]}
                        >
                            <TextComponent style={styles.text}>Inscription</TextComponent>
                        </ButtonComponent>
                    </View>

                    <TextComponent style={styles.textt}>
                    {auth === 'login' ? 'Connexion' : 'Inscription'}
                        
                    </TextComponent>

                    {auth === 'login' && (
                        <View style={styles.contain}>
                            {successLogin && ( <TextComponent style={styles.success}> Connexion réussie</TextComponent> )}
                            {errorLogin && ( <TextComponent style={styles.error}>{errorLogin}</TextComponent> )}

                            <View style={styles.containSub}>
                                <FormInput 
                                    value={email}
                                    placeholder={'votre@gmail.com'} 
                                    label={'Email'}
                                    secureTextEntry={false}
                                    onChangeText={(email)=>{setEmail(email)}}
                                />
                                <View style={styles.icon}>
                                    <Icone nom={'envelope'} color={'gray'} taille={22} style={styles.home}/>
                                </View>
                            </View>

                            <View style={styles.containSub}>
                                <View style={styles.icon2}>
                                    <Icone nom={'lock'} color={'gray'} taille={30} style={styles.home}/>
                                </View>
                                <FormInput
                                    label={'Mot de passe'}
                                    placeholder={'********'} 
                                    value={password} 
                                    secureTextEntry={!showPassword} 
                                    onChangeText={(password)=>{setPassword(password)}}
                                />
                                <ButtonComponent
                                    disabled={false} 
                                    onPress={()=>{setShowPassword(!showPassword)}}
                                    style={styles.eye}>
                                    {showPassword ? (
                                        <Icone nom={'eye'} color={'gray'} taille={22} style={styles.home}/>
                                    ):(
                                        <Icone nom={'eye-slash'} color={'gray'} taille={22} style={styles.home}/>
                                    )}
                                </ButtonComponent>
                            </View>
                
                            <ButtonComponent
                                disabled={loadingLogin || !email.trim() || !password.trim()}
                                onPress={handleLogin}
                                style={[
                                    styles.button, 
                                    {backgroundColor: !email.trim() || !password.trim() ? 'rgba(0,100,255,0.3)' : 'rgba(0,100,255,0.8)'},
                                    {borderColor: !email.trim() || !password.trim() ? 'rgba(0,100,255,0.3)' : 'rgba(0,100,255,0.8)'}
                                ]}
                            >
                                {loadingLogin ? 
                                    <Loader couleur={'#fff'} taille={24}/> : <TextComponent style={styles.buttonText}>Se connecter</TextComponent>
                                }
                            </ButtonComponent>
                        </View>
                    )}


                    {auth === 'register' && (
                        <View style={styles.contain}>
                            {success && ( <TextComponent style={styles.success}> Inscription réussie</TextComponent> )}
                            {error && ( <TextComponent style={styles.error}>{error}</TextComponent> )}


                            <View style={styles.containSub}>
                                <FormInput 
                                    value={email}
                                    secureTextEntry={false}
                                    label={'Email'}
                                    placeholder={'votre@gmail.com'} 
                                    onChangeText={(email)=>{setEmail(email)}}
                                />
                                <View style={styles.icon}>
                                    <Icone nom={'envelope'} color={'gray'} taille={22} style={styles.home}/>
                                </View>
                            </View>
                            <View style={styles.containSub}>
                                <View style={styles.icon2}>
                                    <Icone nom={'lock'} color={'gray'} taille={30} style={styles.home}/>
                                </View>
                                <FormInput
                                    label={'Mot de passe'} 
                                    placeholder={'minimum 8 caractères'}
                                    value={password} 
                                    secureTextEntry={!showPassword} 
                                    onChangeText={(password)=>{setPassword(password)}}
                                />
                                <ButtonComponent 
                                    disabled={false}
                                    onPress={()=>{setShowPassword(!showPassword)}}
                                    style={styles.eye}>
                                    {showPassword ? (   
                                        <Icone nom={'eye'} color={'gray'} taille={22} style={styles.home}/>
                                    ):(

                                        <Icone nom={'eye-slash'} color={'gray'} taille={22} style={styles.home}/>
                                    )}
                                </ButtonComponent>
                            </View>

                            <View style={styles.containSub}>
                                <View style={styles.icon2}>
                                    <Icone nom={'lock'} color={'gray'} taille={30} style={styles.home}/>
                                </View>
                                <FormInput 
                                    value={confirmPassword}
                                    placeholder={'********'}
                                    label={'Confirmer mot de passe'}
                                    secureTextEntry={!showPassword} 
                                    onChangeText={(confirmPassword)=>{setConfirmPassword(confirmPassword)}}
                                />
                            </View>

                            <ButtonComponent
                                disabled={loading || !email.trim() || !password.trim() || !confirmPassword.trim() || password.length < 8 || password != confirmPassword}
                                onPress={handleRegister}
                                style={[
                                    styles.button, 
                                    {backgroundColor: !email.trim() || !password.trim() || password.length < 8 || password != confirmPassword ? 'rgba(0,100,255,0.3)' : 'rgba(0,100,255,0.8)'},
                                    {borderColor: !email.trim() || !password.trim() || password.length < 8 || password != confirmPassword ? 'rgba(0,100,255,0.3)' : 'rgba(0,100,255,0.8)'}
                                ]}
                            >
                                {loading ? 
                                    <Loader couleur={'#fff'} taille={24}/> : <TextComponent style={styles.buttonText}>S'inscrire</TextComponent>
                                }
                            </ButtonComponent>
                        </View>
                    )}

                    <View style={styles.new}>
                        <View style={styles.trait}></View>
                        <View>
                            <TextComponent style={styles.tex}>
                                {auth === 'login' ? 'Nouveau ici ?' : 'Déjà inscrit ?'}
                            </TextComponent>
                        </View>
                        <View style={styles.trait}></View>
                    </View>

                    <ButtonComponent
                    disabled={false}
                        onPress={()=>{auth === 'login' ? setAuth('register') : setAuth('login')}}
                        style={styles.button2}
                    >
                        <TextComponent style={styles.buttonText2}>
                            {auth === 'login' ? 'Créer un compte' : 'Se connecter'}
                        </TextComponent>
                    </ButtonComponent>
                </View>
            </View>
        </ModalComponent>
    )
}


const styles = StyleSheet.create({
    img:{
        height: '60%',
        width: '100%',
        position: 'absolute',
    },
    success:{
        color: 'rgb(0, 194, 0)',
        fontSize: 16,
        textAlign: 'center'
    },
    error:{
        textAlign: 'center',
        color: '#f00',
        fontSize: 16
    },
    button2:{},
  container: {
    backgroundColor: '#fff',
    flex: 1,
    marginTop: 220,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    borderTopWidth: 1,
    borderRightWidth: 1,
    borderLeftWidth: 1,
    borderColor: 'rgba(0,100,255,0.8)',
    position: 'relative'
  },
  containersub:{
    paddingTop: 20,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 20
  },
  connect:{
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(0,100,255,0.3)',
    padding: 10,
    gap: 5,
    width: '80%',
    borderRadius: 10
  },
  login:{
    // backgroundColor: '#fff',
    paddingVertical: 10,
    paddingHorizontal: 40,
    borderRadius: 10,
    alignSelf: 'center'
  },
  text:{
    fontWeight: 'bold',
  },
  textt:{
    fontWeight: 'bold',
    fontSize: 30
  },
  home:{
    

  },
  contain:{
    width: '80%',
    gap: 20
  },
  icon:{
    position: 'absolute',
    top: 40,
    left: 15,
  },

  icon2:{
    position: 'absolute',
    top: 38,
    left: 15,
  },

  eye:{
    position: 'absolute',
    top: 40,
    right: 15,
  },

  containSub:{
    
  },
  button:{
    // backgroundColor: 'rgba(0,100,255,0.8)',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'rgba(0,100,255,0.8)',
  },
  buttonText:{
    fontWeight: 'bold',
    fontSize: 18,
    color: '#fff'
  },
  new:{
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 5,
    width: '80%',
  },
  trait:{
    backgroundColor: 'gray',
    width: '36%',
    height: 1
  },
  tex:{
    color: 'gray'
  },
  buttonText2:{
    fontSize: 18,
    fontWeight: 'bold',
    color:' rgba(0,100,255,0.8)'
  }

});