import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { colors } from '../constants/colors'
import { useTranslation } from 'react-i18next'
import CustomText from './CustomText'
import { fonts } from '../constants/fonts'

const IconLabel = ({label,mb,icon ,isButton,style,onPress}) => {
    const {t} = useTranslation()
  return (
       <TouchableOpacity onPress={onPress} disabled={!isButton} style={[{flexDirection:"row",alignItems:"center",gap:7,marginTop:15,marginBottom:10},mb && {marginBottom:0},style]}>
        {
            icon ?
             icon :
        <Ionicons name={'wallet-outline'} color={colors.black} size={20} />

        }
        <CustomText style={{fontFamily:fonts.medium}}>{t(label)}</CustomText>
       </TouchableOpacity>
  )
}

export default IconLabel

const styles = StyleSheet.create({})