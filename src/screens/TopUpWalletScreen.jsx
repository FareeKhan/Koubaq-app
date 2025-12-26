import { StyleSheet, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
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
import { useSelector } from 'react-redux';
import { topUpBalanceApi } from '../userServices/UserService';
import { showMessage } from 'react-native-flash-message';
import { useNavigation } from '@react-navigation/native';
import { initializePaymentSheet, openPaymentSheet } from '../constants/helper';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const TopUpWalletScreen = () => {
  const { t } = useTranslation();
  const navigation = useNavigation()
  const [selectedPayment, setSelectedPayment] = useState(2);
  const [selectedBalace, setSelectedBalance] = useState('');
  const [otherAmount, setOtherAmount] = useState('');
  const [isLoader, setIsLoader] = useState(false);
  const isAppleSelected = selectedPayment == 1;
  const token = useSelector((state) => state?.auth?.loginData?.token)


  const amount =
    otherAmount?.length > 0
      ? Number(otherAmount)
      : Number(selectedBalace?.price || 0);
  useEffect(() => {
    if (amount > 0) {
      initializePaymentSheet(amount, setIsLoader);
    }
  }, [amount]);

  const AddBalance = async () => {
    if (selectedBalace == '') {
      showMessage({
        type: "danger",
        message: t("PleaseSelectBalance")
      })
      return
    }
    try {
      setIsLoader(true)
      const paymentMethod = selectedPayment == 1 ? 'apple_pay' : "card"
      const data = {
        'amount': selectedBalace?.price || otherAmount,
        'payment_method': paymentMethod
      }
      const result = await topUpBalanceApi(data, token)
      console.log('heyThisIsNewSection', result)
      if (result?.success) {
        showMessage({
          type: "success",
          message: `${result?.data?.transaction?.amount} added to your account`
        })
      }
      navigation.goBack()
    } catch (error) {
      console.log('error', error)
    } finally {
      setIsLoader(false)
    }
  }

  const handleSelection = (item) => {
    if (item?.id) {
      setOtherAmount('')
      setSelectedBalance(item)
    }
  }

  return (
    <ScreenView scrollable={true}>
      <HeaderBox smallLogo={false} notification={false} search={false} />
      <IconLabel label={'topUp'} />
      <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>


        <HeaderWithAll
          title={t('topUpAmount')}
          titleStyle={styles.topUpAmountTitle}
        />

        {topUpBalance?.map((item, index) => {
          return (
            <TouchableOpacity onPress={() => handleSelection(item)} key={index} style={[styles.amountBox, selectedBalace?.id == item?.id && { borderColor: colors.cream }]}>
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
          placeholder={t('50 AED')}
          rs={true}
          style={styles.customInput}
          // filter={false}
          value={otherAmount}
          onChangeText={(text) => {
            const numericValue = text.replace(/[^0-9.]/g, '');
            setOtherAmount(numericValue);
            setSelectedBalance(null);


          }}
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
          // onPress={() => AddBalance()}
          onPress={() => openPaymentSheet(AddBalance)}

          loader={isLoader}
        />
      </KeyboardAwareScrollView>

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
    borderColor: colors.primary,
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
    backgroundColor: colors.white,
    borderColor: '#000',
    width: "100%",
    borderWidth: 1
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
