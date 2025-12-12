import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { colors } from '../constants/colors'
import LottieView from 'lottie-react-native';

const ScreenLoader = ({type}) => {

  if(type ==1){
    return (
    <View style={{alignItems:"center",marginVertical:10}}>
 <LottieView source={require('../assets/svg/loader.json')} autoPlay loop style={{width:20,height:20}}/>
    </View>
  )
  }
  return (
    <View style={styles.mainContainer}>
      {/* <ActivityIndicator size={"large"} color={colors.primary}    /> */}
 <LottieView source={require('../assets/svg/loader.json')} autoPlay loop style={{width:100,height:100}}/>
    </View>
  )
}

export default ScreenLoader

const styles = StyleSheet.create({
    mainContainer:{
        flex:1,
        alignItems:"center",
        justifyContent:"center"
    }
})