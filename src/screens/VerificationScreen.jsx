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
import { login } from '../redux/Auth';
import { verifyOtp } from '../userServices/UserService';
import { useDispatch } from 'react-redux';

const CELL_COUNT = 6;
const VerificationScreen = ({ navigation, route }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch()
  const { phoneNo, otpCode } = route?.params || ''
  const [value, setValue] = useState('');
  const [isLaoder, setIsLoader] = useState(false);

  const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  // const confirmOTP = async () => {
  //   // if (!value) {
  //   //   showMessage({
  //   //     type: 'danger',
  //   //     message: t('pleaseEnterCode'),
  //   //     duration: 3000,
  //   //   });
  //   //   return;
  //   // }
  //   navigation.navigate('BottomNavigation')

  // };


    const confirmOTP = async () => {
    if (!value || otpCode != value) {
      showMessage({
        type: 'danger',
        message: value?.length > 0 && otpCode != value ? t('otpWrong') : t('pleaseEnterCode'),
        duration: 3000,
      });
      return;
    }

    try {
      setIsLoader(true)
      const result = await verifyOtp(phoneNo, value)
      console.log('dasdasd',result)
      if (result?.success) {
        dispatch(login({
          id: result?.data?.customer?.id,
          phoneNo: result?.data?.customer?.phone_number,
          token: result?.data?.token,
        }))
        navigation.navigate('BottomNavigation')
      }
    } catch (e) {
      console.log(e)
    } finally {
      setIsLoader(false)
    }
  };


  return (
    <ScreenView>
      <HeaderBox logo={false} rightIcon={false} style={styles.headerBox} />
      <Image source={require('../assets/logo.png')} style={{ marginTop: 50, marginLeft: "auto", marginRight: "auto" }} />
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
        style={{ marginTop: 35, }}
      />
    </ScreenView>
  );
};

export default VerificationScreen;

const styles = StyleSheet.create({
  codeFieldRoot: {
    marginVertical: 35,
    flexDirection: I18nManager.isRTL ? 'row-reverse' : 'row',
    justifyContent: "center",
    gap: 8
  },
  cell: {
    width: 50,
    height: 55,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: colors.primary,
    paddingBottom: 5,
    borderRadius:5
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
