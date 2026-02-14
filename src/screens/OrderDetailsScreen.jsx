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
import Ionicons from 'react-native-vector-icons/Ionicons';
import { fonts } from '../constants/fonts';
import { useTranslation } from 'react-i18next';
import DividerLine from '../components/DividerLine';
import CustomText from '../components/CustomText';
import Subtitle from '../components/Subtitle';
import CustomButton from '../components/CustomButton';
import { useNavigation } from '@react-navigation/native';
import RemoteImage from '../components/RemoteImage';
import { useDispatch } from 'react-redux';
import { addProductToCart, clearCart } from '../redux/ProductAddToCart';
import CurrencyImage from '../components/CurrencyImage';

const OrderDetailsScreen = ({ route }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch()
  const navigation = useNavigation()
  const { item } = route?.params


  const isoData = item?.created_at
  const dateObj = new Date(isoData)
  const date = dateObj.toLocaleDateString()
  const time = dateObj.toLocaleTimeString()

  // const addToCart = () => {
  //        dispatch(clearCart())
  //   item?.items?.forEach((productData, index) => {
  //     const data = {
  //       id: productData?.id,
  //       title: productData?.name,
  //       description: productData?.description,
  //       counter: Number(productData?.quantity),
  //       price: Number(productData?.price),
  //       image: `${productData?.image}`,
  //       extraItem: productData?.selectedExtras || [],
  //       productNotes: productData?.productNotes,
  //       nameOnSticker: productData?.nameOnSticker,
  //       msgForReceiver: productData?.msgForReceiver,
  //       restaurantId: item?.restaurant_id,
  //       categoryId: productData?.categoryId,
  //       restData: productData?.restData,
  //     }
  //     dispatch(addProductToCart(data))
  //   })
  //   navigation.navigate('BasketScreen')
  // }

  const addToCart = () => {
    dispatch(clearCart());

    setTimeout(() => {
      item?.items?.forEach(productData => {
        dispatch(addProductToCart({
          id: productData?.id || productData?.item_id,
          title: productData?.name,
          description: productData?.description,
          counter: Number(productData?.quantity),
          price: Number(productData?.price),
          image: `${productData?.image}`,
          extraItem: productData?.selectedExtras || [],
          productNotes: productData?.productNotes,
          nameOnSticker: productData?.nameOnSticker,
          msgForReceiver: productData?.msgForReceiver,
          restaurantId: item?.restaurant_id,
          categoryId: productData?.categoryId,
          restData: productData?.restData || item?.restaurant,

        }));
      });

      navigation.navigate('BasketScreen');
    }, 0);
  };



  return (
    <ScreenView>
      <HeaderBox logo={true} notification={false} search={false} />

      <View style={styles.topRow}>
        <View>
          <View style={styles.orderInfoRow}>
            <View>
              <CustomText style={styles.orderIdText}>
                {item?.order_number}
              </CustomText>
              <Subtitle>{date} {time}</Subtitle>
            </View>
          </View>
        </View>

        <CustomButton
          title={'reOrder'}
          style={styles.reorderButton}
          btnTxtStyle={styles.reorderButtonText}
          onPress={() => addToCart(item)}

        />
      </View>

      <CustomText style={styles.paymentMethodLabel}>
        {t('paymentMethod')}
      </CustomText>

      <View style={styles.paymentRow}>
        {
          item?.payment_type == 'card' || item?.payment_type == 'apple_pay' ?
            <Ionicons name={'card'} size={25} color={colors.gray} />

            :
            <Ionicons name={'cash-outline'} size={25} color={colors.gray} />

        }
        <CustomText style={styles.paymentText}>
          {item?.payment_type == 'card' ?
            t('creditCard') :
            item?.payment_type == 'apple_pay' ? t('applePay') : t('wallet')
          }
        </CustomText>
      </View>

      <View style={styles.totalAmountContainer}>
        <CustomText>{t('driverInstruction')}</CustomText>
        <CustomText style={styles.amountText}>
          {item?.special_instructions}
        </CustomText>
      </View>




      <View style={styles.totalAmountContainer}>
        <CustomText>{t('TotalAmount')}</CustomText>
        <CustomText style={styles.amountText}>
          <CurrencyImage width={9} height={9} />{item?.total}
        </CustomText>
      </View>
      <DividerLine verticalGap={true} />


      {
        item?.items?.map((item, index) => {
          return (
            <View key={index} style={[styles.itemRow, { marginBottom: 20, marginTop: 0 }]}>
              {/* <Image
                source={require('../assets/cup.png')}
                borderRadius={10}
              /> */}
              <RemoteImage
                uri={`${item?.image}`}
                style={styles.itemImage}
              />
              <View style={[styles.itemDetails,]}>
                <CustomText numberOfLines={2}>{item?.name}</CustomText>
                <CustomText><CurrencyImage width={9} height={9}/>{item?.price}</CustomText>
              </View>
            </View>
          )
        })

      }


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
    width: 75,
    height: 65,
  },
  itemDetails: {
    width: '60%',
    gap: 5,
  },
});

