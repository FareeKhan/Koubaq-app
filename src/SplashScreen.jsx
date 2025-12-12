import { Image, StatusBar, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { colors } from './constants/colors'
import { useNavigation } from '@react-navigation/native'
import { useSelector } from 'react-redux'

const SplashScreen = () => {
  const navigation = useNavigation()
  const userId = useSelector((state) => state?.auth?.loginData?.id)

  useEffect(() => {
    const timer = setTimeout(() => {
      if (userId) {
        navigation.replace('BottomNavigation')
      } else {
        navigation.replace('LoginScreen');
      }
    }, 1500);

    return () => clearTimeout(timer);
  }, [userId]);

  return (
    <View style={styles.mainContainer}>
      <StatusBar barStyle={'dark-content'} />
      <Image source={require('./assets/logo.png')} />
    </View>
  )
}

export default SplashScreen

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#E5F6DF"
  }
})