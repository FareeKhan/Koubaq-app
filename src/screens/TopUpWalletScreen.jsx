import { StyleSheet, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import ScreenView from '../components/ScreenView';
import HeaderWithAll from '../components/HeaderWithAll';
import { fonts } from '../constants/fonts';
import HeaderBox from '../components/HeaderBox';
import IconLabel from '../components/IconLabel';
import { useTranslation } from 'react-i18next';
import { colors } from '../constants/colors';
import { currency, topUpBalance } from '../constants/data';
import CustomText from '../components/CustomText';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';
import PaymentOptions from '../components/PaymentOptions';

const TopUpWalletScreen = () => {
  const { t } = useTranslation();
  const [selectedPayment, setSelectedPayment] = useState(3);
  const [selectedBalace, setSelectedBalance] = useState('');
  const isAppleSelected = selectedPayment == 1;

  return (
    <ScreenView scrollable={true}>
      <HeaderBox logo={true} notification={false} search={false} />
      <IconLabel label={'topUp'} />

      <HeaderWithAll
        title={t('topUpAmount')}
        titleStyle={styles.topUpAmountTitle}
      />

      {topUpBalance?.map((item, index) => {
        return (
          <TouchableOpacity onPress={()=>setSelectedBalance(item?.id)} key={index} style={[styles.amountBox,selectedBalace == item?.id && {borderColor:colors.primary}]}>
            <CustomText style={styles.amountText}>
              {item?.price} {currency}
            </CustomText>
            <CustomText style={styles.pointsText}>
              {item?.points} {t('points')}
            </CustomText>
          </TouchableOpacity>
        );
      })}

      <HeaderWithAll
        title={t('orAmount')}
        titleStyle={styles.orAmountTitle}
      />

      <CustomInput
        placeholder={t('50 SAR')}
        rs={true}
        style={styles.customInput}
      />

      <HeaderWithAll title={t('payWith')} />
      <PaymentOptions
        selectedPayment={selectedPayment}
        setSelectedPayment={setSelectedPayment}
      />

      <CustomButton
        appleIcon={isAppleSelected}
        title={isAppleSelected ? t('Pay') : t('payment')}
        btnTxtStyle={[styles.buttonText, isAppleSelected && styles.appleButtonText]}
        style={isAppleSelected && styles.appleButton}
      />
    </ScreenView>
  );
};

export default TopUpWalletScreen;

const styles = StyleSheet.create({
  topUpAmountTitle: {
    fontFamily: fonts.regular,
    color: colors.primary,
    marginTop: 10,
  },
  amountBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    padding: 15,
    marginBottom: 15,
    borderRadius: 10,
    borderColor: colors.gray1,
  },
  amountText: {
    fontSize: 16,
    fontFamily: fonts.medium,
  },
  pointsText: {
    fontSize: 16,
    color: colors.primary,
  },
  orAmountTitle: {
    fontFamily: fonts.regular,
    color: colors.primary,
  },
  customInput: {
    marginTop: -10,
  },
  buttonText: {
    fontSize: 16,
  },
  appleButtonText: {
    marginLeft: 3,
  },
  appleButton: {
    backgroundColor: colors.black,
  },
});
