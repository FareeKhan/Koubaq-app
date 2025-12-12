import {
  I18nManager,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useState } from 'react';
import ScreenView from '../components/ScreenView';
import HeaderBox from '../components/HeaderBox';
import { useTranslation } from 'react-i18next';
import CustomText from '../components/CustomText';
import DividerLine from '../components/DividerLine';
import MessageBox from '../components/MessageBox';
import HeaderWithAll from '../components/HeaderWithAll';
import { colors } from '../constants/colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Subtitle from '../components/Subtitle';
import { fonts } from '../constants/fonts';
import KeyValue from '../components/KeyValue';
import CustomButton from '../components/CustomButton';
import CartProducts from '../components/CartProducts';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { postPromo } from '../userServices/UserService';
import { showMessage } from 'react-native-flash-message';
import EmptyData from '../components/EmptyData';

const BasketScreen = () => {
  const { t } = useTranslation();
  const navigation = useNavigation()
  const cartData = useSelector((state) => state?.cart?.cartProducts)
  const restId = useSelector((state) => state?.cart?.restaurentID)
  const userId = useSelector((state) => state?.auth?.loginData?.id)

  const [driverNote, setDriverNote] = useState('')
  const [promoCode, setPromoCode] = useState('')
  const [discountAmount, setDiscountAmount] = useState(0)
  const subTotal = cartData?.reduce((sum, item) => sum + (item?.price * item?.counter || 0), 0) -(discountAmount?.discount_amount || 0)

  const [isLoader, setIsLoader] = useState(false)

  const handlePromoCode = async () => {
    if (promoCode == '') {
      showMessage({
        type: "danger",
        message: t("EnterPromo")
      })
      return
    }

    setIsLoader(true)
    try {
      const result = await postPromo(promoCode, restId, subTotal, userId)
      console.log('dasdassdas', result)
      if (result?.success) {
        showMessage({
          type: "Success",
          message: t("Promo code Applied")
        })
        setDiscountAmount(result?.data)
      }else{
              showMessage({
          type: "danger",
          message: t("promoNotFound")
        })
      }
    } catch (error) {
      console.log('error', error)
    } finally {
      setIsLoader(false)
    }
  }

  const handleCheckout = () => {
    navigation.navigate('CheckoutScreen', {
      driverNote: driverNote,
      subTotal:subTotal
    })
  }

  if(cartData?.length == 0){
    return(
      <EmptyData title={t('CartISEmpty')} />
    )
  }

  return (
    <ScreenView scrollable={true} mh={true}>
      <HeaderBox
        style={styles.header}
        title={t('Basket')}
        notification={false}
        search={false}
      />

      <CartProducts data={cartData} />
      <DividerLine style={styles.dividerTop} h={true} />

      <MessageBox borderRemove={true}
        onChangeText={setDriverNote}
        value={driverNote}
      />
      <DividerLine style={styles.dividerBottom} h={true} />

      <View style={{ marginHorizontal: 20 }}>
        <HeaderWithAll title={t('saveOnOrder')} />

        <View style={styles.voucherBox}>
          <Ionicons name={'ticket-outline'} color={colors.black} size={20} />
          <TextInput
            placeholder={t('voucherCode')}
            placeholderTextColor={colors.gray1}
            style={styles.voucherInput}
            value={promoCode}
            onChangeText={setPromoCode}
          />
          <TouchableOpacity style={styles.submitText} onPress={() => handlePromoCode()}>
            <Subtitle >{t('submit')}</Subtitle>
          </TouchableOpacity>
        </View>

        <DividerLine style={styles.dividerBottom} h={true} />

        <HeaderWithAll title={t('paymentSummary')} />

        <KeyValue leftValue={t('Subtotal')} rightValue={subTotal} />
        <KeyValue leftValue={t('DeliveryFee')} rightValue={'Free'} />
        <KeyValue leftValue={t('ServiceFee')} rightValue={'Free'} />
        <KeyValue
          boldData={true}
          leftValue={t('TotalAmount')}
          rightValue={subTotal}
        />

        <TouchableOpacity>
          <CustomText style={{ color: colors.primary }}>
            {t('readFees')}
          </CustomText>
        </TouchableOpacity>

        <DividerLine style={styles.dividerTop} h={true} />

        <View style={styles.bottomBox}>
          <CustomButton
            title={t('addItem')}
            btnTxtStyle={{ color: colors.black }}
            style={styles.bottomBtn}
          />

          <CustomButton title={t('checkout')} style={{ width: '48%' }}
            onPress={() => handleCheckout()}
          />
        </View>
      </View>
    </ScreenView>
  );
};

export default BasketScreen;

const styles = StyleSheet.create({

  header: {
    width: '85%',
    marginHorizontal: 20,
  },
  dividerTop: {
    marginTop: 15,
  },
  dividerBottom: {
    marginTop: 18,
    marginBottom: 12,
  },
  voucherBox: {
    flexDirection: 'row',
    marginTop: -10,
    alignItems: 'center',
    gap: 10,
    borderWidth: 1,
    height: 45,
    paddingHorizontal: 10,
    borderRadius: 10,
    borderColor: colors.gray4,
  },
  voucherInput: {
    color: colors.black,
    width: '70%',
    fontFamily: fonts.semiBold,
    fontSize: 13,
    textAlign: I18nManager.isRTL ? "right" : "left"
  },
  submitText: {
    marginLeft: 'auto',
  },
  bottomBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 25,
  },
  bottomBtn: {
    width: '48%',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: colors.primary,
  },
});
