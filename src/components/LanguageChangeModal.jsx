import { I18nManager, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import CustomModal from './CustomModal';
import { Countries } from '../constants/data';
import CustomText from './CustomText';
import { colors } from '../constants/colors';
import { useTranslation } from 'react-i18next';
import RNRestart from 'react-native-restart';
import { useDispatch, useSelector } from 'react-redux';
import { language } from '../redux/Auth';
import Entypo from 'react-native-vector-icons/Entypo'

const LanguageChangeModal = ({ setModalVisible, modalVisible }) => {
    const isLanguage = useSelector(state => state.auth?.isLanguage);

    const { t } = useTranslation()
    const dispatch = useDispatch()

    const handleTranslation = () => {
        const isSelectedLanguage = isLanguage == 'en' ? 'ar' : 'en';
        dispatch(language({ isSelectedLanguage }));

        I18nManager.allowRTL(isSelectedLanguage !== 'en');
        I18nManager.forceRTL(isSelectedLanguage !== 'en');

        setTimeout(() => {
            RNRestart.Restart();
        }, 1500);
    };


    return (
        <CustomModal
            setModalVisible={setModalVisible}
            modalVisible={modalVisible}
            title={t('selectLanguage')}
        >
            <View style={styles.modalContent}>
                {Countries?.map((item, index) => (
                    <View key={index} style={styles.countryItemWrapper}>
                        <TouchableOpacity
                            style={styles.countryItem}
                            onPress={() => {
                                //   setSelectCountry(item)
                                handleTranslation()
                                setModalVisible(false)
                            }}
                        >
                            <Image source={{ uri: item?.flag }} style={styles.flagLarge} />
                            <CustomText>{item?.name}</CustomText>
                            {
                                isLanguage == item?.name?.toLocaleLowerCase() &&
                                <View style={{ marginLeft: "auto" }}>
                                    <Entypo name={'check'} size={20} color={colors.black} />
                                </View>
                            }

                        </TouchableOpacity>



                    </View>
                ))}
            </View>
        </CustomModal>
    )
}

export default LanguageChangeModal

const styles = StyleSheet.create({
    modalContent: {
        paddingBottom: 70,
    },
    countryItemWrapper: {
        paddingBottom: 10,
    },
    countryItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        borderBottomWidth: 1,
        borderColor: colors.gray5,
        paddingBottom: 10,
    },
    flagLarge: {
        width: 60,
        height: 30,
    },
})