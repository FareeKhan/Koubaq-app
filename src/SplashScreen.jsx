import { Image, StatusBar, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { colors } from './constants/colors'
import { useNavigation } from '@react-navigation/native'

const SplashScreen = () => {
const navigation = useNavigation()
    // const [appStart, setAppStart] = useState(true);
  
    useEffect(() => {
      const timer = setTimeout(() => {
       navigation.replace('LoginScreen')
      }, 1500);
  
      return () => clearTimeout(timer);
    }, []);
  
  return (
    <View style={styles.mainContainer}>
      <StatusBar  barStyle={'dark-content'}/>
       <Image source={require('./assets/logo.png')}  />
    </View>
  )
}

export default SplashScreen

const styles = StyleSheet.create({
  mainContainer:{
    flex:1,
    alignItems:"center",
    justifyContent:"center",
    backgroundColor:"#E5F6DF"
  }
})