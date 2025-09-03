import { I18nManager, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { colors } from '../constants/colors'
import { fonts } from '../constants/fonts'
import { useTranslation } from 'react-i18next'

const ProductsTitle = ({ title, onPress, style, isArrow = true }) => {
    const { t } = useTranslation()
    return (
        <View style={[styles.container, style]}>
            <Text style={styles.txtStyle}>{t(title)}</Text>
            {
                isArrow &&
                <TouchableOpacity onPress={onPress} style={styles.arrowBox}>
                    <MaterialIcons name={I18nManager.isRTL ? "keyboard-arrow-left" : 'keyboard-arrow-right'} size={20} color={colors.white} />
                </TouchableOpacity>
            }

        </View>
    )
}

export default ProductsTitle

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginTop: 30, marginBottom: 20
    },
    txtStyle: {
        fontFamily: fonts.semiBold,
        // fontSize: 18,
        // fontSize: 16,
    },
    arrowBox: {
        width: 24,
        height: 24,
        backgroundColor: colors.secondary,
        borderRadius: 50,
        alignItems: "center",
        justifyContent: "center",

    }
})