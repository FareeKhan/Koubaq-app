import {
  I18nManager,
  Image,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import { useTranslation } from 'react-i18next';
import HeaderBox from '../components/HeaderBox';
import { fonts } from '../constants/fonts';
import ScreenView from '../components/ScreenView';
import CustomButton from '../components/CustomButton';
import CustomText from '../components/CustomText';
import { showMessage } from 'react-native-flash-message';
import { colors } from '../constants/colors';

const CELL_COUNT = 4;
const VerificationScreen = ({ navigation, route }) => {
  const { t } = useTranslation();

  const [value, setValue] = useState('');
  const [isLaoder, setIsLoader] = useState(false);

  const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  const confirmOTP = async () => {
    // if (!value) {
    //   showMessage({
    //     type: 'danger',
    //     message: t('pleaseEnterCode'),
    //     duration: 3000,
    //   });
    //   return;
    // }
         navigation.navigate('BottomNavigation')

  };

  return (
    <ScreenView>
      <HeaderBox logo={false} rightIcon={false} style={styles.headerBox} />
      <Image source={require('../assets/logo.png')} style={{marginTop:50,marginLeft:"auto",marginRight:"auto"}} />
      <CustomText style={styles.title}>{t('EnterOtp')}</CustomText>

      <CodeField
        ref={ref}
        {...props}
        value={value}
        onChangeText={setValue}
        cellCount={CELL_COUNT}
        rootStyle={styles.codeFieldRoot}
        keyboardType="number-pad"
        textContentType="oneTimeCode"
        renderCell={({ index, symbol, isFocused }) => (
          <View
            key={index}
            style={[styles.cell, isFocused && styles.focusCell]}
          >
            <Text
              style={styles.cellTxt}
              onLayout={getCellOnLayoutHandler(index)}
            >
              {symbol || (isFocused ? <Cursor /> : null)}
            </Text>
          </View>
        )}
      />

      <CustomText style={styles.subTitle}>{t('youwillbeSigned')}</CustomText>
   
      <CustomButton
        title={t('continue')}
        onPress={confirmOTP}
        loader={isLaoder}
        arrow={true}
        style={{marginTop:35,}}
      />
    </ScreenView>
  );
};

export default VerificationScreen;

const styles = StyleSheet.create({
  codeFieldRoot: {
    marginVertical:35,
    flexDirection: I18nManager.isRTL ? 'row-reverse' : 'row',
    justifyContent:"center",
    gap:30
  },
  cell: {
    width: 54,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.black,
    paddingBottom: 5,
  },
  cellTxt: {
    fontSize: 29,
    color: colors.black,
    fontFamily: fonts.regular,
  },
  focusCell: {
    borderWidth: 1,
    borderColor: colors.primary,
  },

  headerBox: {
    width: '62%',
    marginBottom: 20,
  },
  title: {
    fontFamily: fonts.regular,
    fontSize: 19,
    textAlign: 'center',
    marginTop: 25,
  },
  subTitle: {
    fontFamily: fonts.regular,
    fontSize: 13,
    textAlign: 'left',
    color: colors.gray1,
    marginTop: 5,
  },
  phoneText: {
    fontFamily: fonts.regular,
    fontSize: 15,
    textAlign: 'left',
    color: colors.gray1,
  },
});
