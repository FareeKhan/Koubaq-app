// import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
// import React, { useState } from 'react';
// import ScreenView from '../components/ScreenView';
// import HeaderWithAll from '../components/HeaderWithAll';
// import { fonts } from '../constants/fonts';
// import HeaderBox from '../components/HeaderBox';
// import IconLabel from '../components/IconLabel';
// import { useTranslation } from 'react-i18next';
// import { colors } from '../constants/colors';
// import { currency, SendingBalance, topUpBalance } from '../constants/data';
// import CustomText from '../components/CustomText';
// import CustomInput from '../components/CustomInput';
// import CustomButton from '../components/CustomButton';
// import PaymentOptions from '../components/PaymentOptions';

// const SendBalanceScreen = () => {
//   const { t } = useTranslation();
//   const [selectedPayment, setSelectedPayment] = useState(3);
//     const [selectedBalace, setSelectedBalance] = useState('');

//   const isAppleSelected = selectedPayment == 1;

//   return (
//     <ScreenView scrollable={true}>
//       <HeaderBox logo={true} notification={false} search={false} />
//       <IconLabel label={'sendBalance'}/>

//       {SendingBalance?.map((item, index) => {
//         return (
//           <TouchableOpacity onPress={()=>setSelectedBalance(item?.id)} key={index} style={[styles.amountBox,selectedBalace == item?.id && {borderColor:colors.primary}]}>
//             <CustomText style={styles.amountText}>
//              {currency} {item?.price}
//             </CustomText>
//            <Image source={require('../assets/cash.png')}  style={{width:80,height:65,transform:[{rotate:"-90deg"}]}}/>
//           </TouchableOpacity>
//         );
//       })}

//       <HeaderWithAll
//         title={t('orAmount')}
//         titleStyle={styles.orAmountTitle}
//       />

//       <CustomInput
//         placeholder={t('50 SAR')}
//         rs={true}
//         style={styles.customInput}
//       />

//       <HeaderWithAll title={t('payWith')} />
//       <PaymentOptions
//         selectedPayment={selectedPayment}
//         setSelectedPayment={setSelectedPayment}
//       />

//       <CustomButton
//         appleIcon={isAppleSelected}
//         title={isAppleSelected ? t('Pay') : t('payment')}
//         btnTxtStyle={[styles.buttonText, isAppleSelected && styles.appleButtonText]}
//         style={isAppleSelected && styles.appleButton}
//       />
//     </ScreenView>
//   );
// };

// export default SendBalanceScreen;

// const styles = StyleSheet.create({
//   amountBox: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     borderWidth: 1,
//     padding: 15,
//     marginBottom: 15,
//     borderRadius: 10,
//     borderColor: colors.gray1,
//     backgroundColor:colors.secondary,
//   },
//   amountText: {
//     fontSize: 16,
//     fontFamily: fonts.medium,
//   },
//   pointsText: {
//     fontSize: 16,
//     color: colors.primary,
//   },
//   orAmountTitle: {
//     fontFamily: fonts.regular,
//     color: colors.primary,
//   },
//   customInput: {
//     marginTop: -10,
//   },
//   buttonText: {
//     fontSize: 16,
//   },
//   appleButtonText: {
//     marginLeft: 3,
//   },
//   appleButton: {
//     backgroundColor: colors.black,
//   },
// });




import { Image, KeyboardAvoidingView, Platform, StyleSheet, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import ScreenView from '../components/ScreenView';
import HeaderWithAll from '../components/HeaderWithAll';
import { fonts } from '../constants/fonts';
import HeaderBox from '../components/HeaderBox';
import IconLabel from '../components/IconLabel';
import { useTranslation } from 'react-i18next';
import { colors } from '../constants/colors';
import { currency, SendingBalance, topUpBalance } from '../constants/data';
import CustomText from '../components/CustomText';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';
import PaymentOptions from '../components/PaymentOptions';
import { sendBalance } from '../userServices/UserService';
import { useSelector } from 'react-redux';
import { showMessage } from 'react-native-flash-message';
import { useNavigation } from '@react-navigation/native';
import { initializePaymentSheet, openPaymentSheet } from '../constants/helper';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

const SendBalanceScreen = () => {
  const { t } = useTranslation();
  const navigation = useNavigation()
  const token = useSelector((state) => state?.auth?.loginData?.token)
  const [selectedPayment, setSelectedPayment] = useState(3);
  const [selectedBalace, setSelectedBalance] = useState('');
  const [receiptNo, setReceiptNo] = useState('');
  const [otherAmount, setOtherAmount] = useState('');

  const isAppleSelected = selectedPayment == 1;


  const amount = otherAmount?.length > 0 ? Number(otherAmount) : Number(selectedBalace?.price || 0);

  useEffect(() => {
    if (amount > 0) {
      initializePaymentSheet(amount);
    }
  }, [amount]);


  const handleSelection = (item) => {
    if (item?.id) {
      setOtherAmount('')
      setSelectedBalance(item)
    }
  }


  const shareBalance = async () => {
    const data = {
      balance: selectedBalace?.price || otherAmount,
      phone: receiptNo,
    }

    try {
      const result = await sendBalance(data, token)
      console.log('dasdas', result)

      if (result?.success) {
        showMessage({
          type: 'success',
          message: t('balanceSend')
        })
        navigation.goBack()
      } else {
        showMessage({
          type: 'danger',
          message: t('receiptNotFound')
        })
      }
    } catch (error) {
      console.log('error', error)
    }
  }

  const handleSendBalance = () => {
    if (selectedBalace == '') {
      showMessage({
        type: 'danger',
        message: t('PleaseSelectBalance')
      })
      return
    } else if (receiptNo == '') {
      showMessage({
        type: 'danger',
        message: t('enterReceiptNo')
      })
      return
    } else if (receiptNo?.length < 8) {
      showMessage({
        type: 'danger',
        message: t('receiptNoIncorrect')
      })
      return
    }
    shareBalance()
    // openPaymentSheet(shareBalance)
  }

  return (
    <ScreenView scrollable={true}>

      <HeaderBox smallLogo={false} notification={false} search={false} />
      <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>

        <IconLabel label={'sendBalance'} />

        {SendingBalance?.map((item, index) => {
          return (
            <TouchableOpacity onPress={() => handleSelection(item)} key={index} style={[styles.amountBox, selectedBalace?.id == item?.id && { borderColor: colors.cream }]}>
              <CustomText style={styles.amountText}>
                {currency} {item?.price}
              </CustomText>
              <Image source={require('../assets/cash.png')} style={{ width: 80, height: 65, transform: [{ rotate: "-90deg" }] }} />
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
          value={otherAmount}
          // onChangeText={(text) => {
          //   const numericValue = text.replace(/[^0-9.]/g, '');
          //   if (numericValue.length > 0) {
          //     setOtherAmount(numericValue);
          //     setSelectedBalance(null);
          //   }

          // }}

             onChangeText={(text) => {
            const numericValue = text.replace(/[^0-9.]/g, '');
            setOtherAmount(numericValue);
            setSelectedBalance(null);


          }}
        />



        <HeaderWithAll
          title={t('ReceiptNo')}
          titleStyle={styles.orAmountTitle}
        />
        <CustomInput
          placeholder={t('ReceiptNo')}
          rs={true}
          style={styles.customInput}
          value={receiptNo}
          onChangeText={setReceiptNo}
        />
        <CustomText style={{ fontSize: 11, marginTop: -12, marginBottom: 20, color: colors.gray2 }}>{t('EnterNoWithCountryCode')}</CustomText>

        <HeaderWithAll title={t('payWith')} />
        <PaymentOptions
          onlywallet={true}
          selectedPayment={selectedPayment}
          setSelectedPayment={setSelectedPayment}
        />

        <CustomButton
          appleIcon={isAppleSelected}
          title={isAppleSelected ? t('Pay') : t('payment')}
          btnTxtStyle={[styles.buttonText, isAppleSelected && styles.appleButtonText]}
          style={isAppleSelected && styles.appleButton}
          onPress={() => handleSendBalance()}
        // onPress={() =>shareBalance()}




        />
      </KeyboardAwareScrollView>

    </ScreenView>
  );
};

export default SendBalanceScreen;

const styles = StyleSheet.create({
  amountBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    padding: 15,
    marginBottom: 15,
    borderRadius: 10,
    borderColor: colors.black,
    backgroundColor: colors.secondary,
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
    width: "100%",
    backgroundColor: "#fff"
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
