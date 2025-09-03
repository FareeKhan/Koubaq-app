import { Dimensions, StyleSheet, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { fonts } from '../constants/fonts'
import CustomText from './CustomText'
import { useTranslation } from 'react-i18next'
import { colors } from '../constants/colors'
import { useNavigation } from '@react-navigation/native'
const { height } = Dimensions.get('screen')

const EmptyData = ({ title, emptyCart ,style}) => {
    const { t } = useTranslation()
    // const navigation = useNavigation()
    return (
        <View style={[styles.container,style]}>

            {
                emptyCart ?
                    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                        <CustomText>{t('No_Products_in_Cart')}</CustomText>
                        <TouchableOpacity onPress={() => navigation.navigate('HomeScreen')}>
                            <CustomText style={{ color: colors.primary, marginTop: 10 }}>{t('add_Product')}</CustomText>
                        </TouchableOpacity>
                    </View>
                    :
                    <CustomText style={styles.title}>{title ? title : t('noDataFound')}</CustomText>
            }
        </View>
    )
}

export default EmptyData

const styles = StyleSheet.create({
    container: {
        height: height / 1.5,
        alignItems: "center",
        justifyContent: "center"
    },

})