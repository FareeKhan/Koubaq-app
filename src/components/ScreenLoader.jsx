import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { colors } from '../constants/colors'

const ScreenLoader = () => {
  return (
    <View style={styles.mainContainer}>
      <ActivityIndicator size={"large"} color={colors.primary}    />
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