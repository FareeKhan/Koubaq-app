import { ActivityIndicator, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'

import { colors } from '../constants/colors'

const ButtonLoader = ({ arrow, onPress, title, counterBtn, appleIcon, productID, style, btnTxtStyle, totalPrice }) => {



    return (
        <TouchableOpacity onPress={onPress} style={[styles.container, totalPrice && styles.counterStyle, arrow && styles.btnContainer, style]}>

       <ActivityIndicator color={colors.white} size={'small'} />
        </TouchableOpacity>
    )
}

export default ButtonLoader

const styles = StyleSheet.create({
    container: {
        height: 48,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: colors.primary,
        // borderRadius: 10,
    },
    btnContainer: {
        height: 32,
        gap: 5,
        paddingHorizontal: 9,
        paddingVertical: 5,
        borderRadius: 5,

    },
    counterStyle: {
        justifyContent: "space-between",
        paddingHorizontal: 20
    }
})