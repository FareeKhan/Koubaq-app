import {
  Image,
  StyleSheet,
  View,
} from 'react-native';
import React from 'react';
import ScreenView from '../components/ScreenView';
import HeaderBox from '../components/HeaderBox';
import IconLabel from '../components/IconLabel';
import { colors } from '../constants/colors';
import { currency, OrderData } from '../constants/data';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { fonts } from '../constants/fonts';
import { useTranslation } from 'react-i18next';
import DividerLine from '../components/DividerLine';
import CustomText from '../components/CustomText';
import Subtitle from '../components/Subtitle';
import CustomButton from '../components/CustomButton';
import { useNavigation } from '@react-navigation/native';

const OrderDetailsScreen = () => {
  const { t } = useTranslation();
  const data = OrderData(t);
  const navigation = useNavigation()

  return (
    <ScreenView>
      <HeaderBox logo={true} notification={false} search={false} />

      <View style={styles.topRow}>
        <View>
          <View style={styles.orderInfoRow}>
            <View>
              <CustomText style={styles.orderIdText}>
                CNDFH4215635ZDA
              </CustomText>
              <Subtitle>4th Feb 2025 at 05:15 PM</Subtitle>
            </View>
          </View>
        </View>

        <CustomButton
          title={'reOrder'}
          style={styles.reorderButton}
          btnTxtStyle={styles.reorderButtonText}
          onPress={()=>navigation.navigate('BasketScreen')}

        />
      </View>

      <CustomText style={styles.paymentMethodLabel}>
        {t('paymentMethod')}
      </CustomText>

      <View style={styles.paymentRow}>
        <Ionicons name={'cash-outline'} size={25} color={colors.gray} />
        <CustomText style={styles.paymentText}>
          {t('creditCard')}
        </CustomText>
      </View>

      <View style={styles.totalAmountContainer}>
        <CustomText>{t('TotalAmount')}</CustomText>
        <CustomText style={styles.amountText}>
          {currency} 70.00
        </CustomText>
      </View>

      <View style={styles.itemRow}>
        <Image
          source={require('../assets/cup.png')}
          style={styles.itemImage}
          borderRadius={10}
        />
        <View style={styles.itemDetails}>
          <CustomText>Espresso single shot ethiopian beans</CustomText>
          <CustomText>{currency} 66.00</CustomText>
        </View>
      </View>

      <DividerLine verticalGap={true} />

      <View style={[styles.itemRow,{marginTop:0}]}>
        <Image
          source={require('../assets/cup.png')}
          style={styles.itemImage}
          borderRadius={10}
        />
        <View style={[styles.itemDetails,]}>
          <CustomText>Espresso single shot ethiopian beans</CustomText>
          <CustomText>{currency} 66.00</CustomText>
        </View>
      </View>
    </ScreenView>
  );
};

export default OrderDetailsScreen;

const styles = StyleSheet.create({
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 50,
  },
  orderInfoRow: {
    flexDirection: 'row',
    gap: 15,
  },
  orderIdText: {
    fontFamily: fonts.medium,
    marginBottom: 2,
  },
  reorderButton: {
    borderWidth: 1,
    backgroundColor: colors.white,
    width: '25%',
    height: 30,
    borderRadius: 4,
  },
  reorderButtonText: {
    color: colors.black,
  },
  paymentMethodLabel: {
    marginTop: 30,
  },
  paymentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginTop: 10,
  },
  paymentText: {
    color: colors.black1,
  },
  totalAmountContainer: {
    marginTop: 35,
    gap: 5,
  },
  amountText: {
    color: colors.black1,
  },
  itemRow: {
    marginTop: 50,
    flexDirection: 'row',
    gap: 10,
  },
  itemImage: {
    width: 65,
    height: 65,
  },
  itemDetails: {
    width: '60%',
    gap: 5,
  },
});
