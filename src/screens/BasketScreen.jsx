import {
  FlatList,
  I18nManager,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import ScreenView from '../components/ScreenView';
import HeaderBox from '../components/HeaderBox';
import { useTranslation } from 'react-i18next';
import CustomText from '../components/CustomText';
import { currency } from '../constants/data';
import IncrementDecrement from '../components/IncrementDecrement';
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

const BasketScreen = () => {
  const { t } = useTranslation();
const navigation = useNavigation()

  return (
    <ScreenView scrollable={true} mh={true}>
      <HeaderBox
        style={styles.header}
        title={t('Basket')}
        notification={false}
        search={false}
      />

      <CartProducts />

      <DividerLine style={styles.dividerTop} h={true} />

      <MessageBox borderRemove={true} />
      <DividerLine style={styles.dividerBottom} h={true} />

      <View style={{ marginHorizontal: 20 }}>
        <HeaderWithAll title={t('saveOnOrder')} />

        <View style={styles.voucherBox}>
          <Ionicons name={'ticket-outline'} color={colors.black} size={20} />
          <TextInput
            placeholder={t('voucherCode')}
            placeholderTextColor={colors.gray1}
            style={styles.voucherInput}
          />
          <Subtitle style={styles.submitText}>{t('submit')}</Subtitle>
        </View>

        <DividerLine style={styles.dividerBottom} h={true} />

        <HeaderWithAll title={t('paymentSummary')} />

        <KeyValue leftValue={t('Subtotal')} rightValue={'66.00'} />
        <KeyValue leftValue={t('DeliveryFee')} rightValue={'66.00'} />
        <KeyValue leftValue={t('ServiceFee')} rightValue={'66.00'} />
        <KeyValue
          boldData={true}
          leftValue={t('TotalAmount')}
          rightValue={'66.00'}
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

          <CustomButton title={t('checkout')}  style={{ width: '48%' }}
          onPress={()=>navigation.navigate('CheckoutScreen')}
          
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
    textAlign: I18nManager.isRTL ?   "right" :"left"
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
