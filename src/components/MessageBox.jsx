import { I18nManager, StyleSheet, TextInput, View } from 'react-native';
import React from 'react';
import { colors } from '../constants/colors';
import Ionicons from 'react-native-vector-icons/Ionicons'
import CustomText from './CustomText';
import { useTranslation } from 'react-i18next';
import { fonts } from '../constants/fonts';

const MessageBox = ({borderRemove}) => {
    const {t} = useTranslation()
  return (
    <View style={[styles.noteBox,borderRemove && {borderWidth:0,padding:0,height:65,paddingHorizontal:20}]}>
      <View style={styles.noteHeader}>
        <Ionicons name={'chatbox-outline'} size={15} color={colors.black} />
        <CustomText style={styles.noteLabel}>{t('AddANot')}</CustomText>
      </View>
      <TextInput
        placeholder={t('AnythingElse')}
        multiline
        placeholderTextColor={colors.gray1}
        style={[styles.noteInput,borderRemove && {height:60,paddingLeft:20,paddingTop:10}]}
      />
    </View>
  );
};

export default MessageBox;

const styles = StyleSheet.create({
     noteBox: {
        borderWidth: 1,
        height: 140,
        borderColor: colors.gray5,
        padding: 10,
        borderRadius: 10,
        marginTop: 20,
      },
      noteHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5,
      },
      noteLabel: {
        color: colors.black,
      },
      noteInput: {
        color: colors.black,
        height: 100,
        fontFamily:fonts.regular,
        textAlign:I18nManager.isRTL ? "right" :"left"
      },
});
