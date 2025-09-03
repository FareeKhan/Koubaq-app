import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import CustomText from './CustomText'
import { colors } from '../constants/colors'

const LocationIconText = ({addressTxt}) => {
    return (
        <View style={styles.innerLocation}>
            <MaterialCommunityIcons name={'map-marker'} size={24} color={colors.primary} />
            <CustomText style={styles.deliveryAddress}>{addressTxt}</CustomText>
        </View>
    )
}

export default LocationIconText

const styles = StyleSheet.create({
    innerLocation:{
        flexDirection:"row",
        alignItems:"center",
        marginTop:5
    },
    deliveryAddress: {
        color: colors.gray1,
        fontSize:12
    },
})