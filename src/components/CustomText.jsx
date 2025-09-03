import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { fonts } from '../constants/fonts'
import { colors } from '../constants/colors'

const CustomText = ({style,children,...props}) => {
  return (
      <Text style={[styles.txtStyle,style]}  {...props}>{children}</Text>
  )
}

export default CustomText

const styles = StyleSheet.create({
    txtStyle:{
        fontFamily:fonts.regular,
        color:colors.black,
        textAlign:"left",
    }
})