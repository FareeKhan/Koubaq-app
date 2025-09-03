import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { colors } from '../constants/colors'

const DividerLine = ({verticalGap,style,borderStyle,h}) => {
    return (
        <View style={[styles.borderContainer, verticalGap && { marginVertical: 22 },style]}>
            <View style={[styles.borderLine,h && {height:2},borderStyle]} />
        </View>
    )
}

export default DividerLine

const styles = StyleSheet.create({
    borderContainer: {
        marginHorizontal: -20
    },
    borderLine: {
        height: 1,
        width: "100%",
        backgroundColor: colors.gray2?.concat(40)
    }
})