import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { colors } from '../constants/colors'

const CurrencyImage = ({width,height,color}) => {
    return (
        <View>
            <Image source={require('../assets/currency.png')}  style={{ tintColor:color || colors.black, width: width || 14, height: height || 14,marginRight:3 }} />
        </View>
    )
}

export default CurrencyImage

const styles = StyleSheet.create({})