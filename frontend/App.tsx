/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { NewAppScreen } from '@react-native/new-app-screen';
import { StatusBar, StyleSheet, useColorScheme, View } from 'react-native';
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import {NavigationContainer} from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AuthScreen from './src/screens/Auth/Auth';
import WelcomeScreen from './src/screens/Welcome';
import Tabs from './src/bottom-tabs/Tabs';


const appStack = createNativeStackNavigator()

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaProvider>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <NavigationContainer>
        <appStack.Navigator
          screenOptions={{headerShown: false}}
        >
          <appStack.Screen name='welcome' component={WelcomeScreen} />
          <appStack.Screen name='auth' component={AuthScreen} />
          <appStack.Screen name='main-page' component={Tabs} />
        </appStack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
