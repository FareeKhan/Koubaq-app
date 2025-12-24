import {
  FlatList,
  I18nManager,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import ScreenView from '../components/ScreenView';
import HeaderBox from '../components/HeaderBox';
import IconLabel from '../components/IconLabel';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import { colors } from '../constants/colors';
import { currency, mainUrl, OrderData } from '../constants/data';
import EmptyData from '../components/EmptyData';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { fonts } from '../constants/fonts';
import { useTranslation } from 'react-i18next';
import DividerLine from '../components/DividerLine';
import CustomText from '../components/CustomText';
import Subtitle from '../components/Subtitle';
import CustomButton from '../components/CustomButton';
import { useNavigation } from '@react-navigation/native';
import { fetchOrder } from '../userServices/UserService';
import { useDispatch, useSelector } from 'react-redux';
import RemoteImage from '../components/RemoteImage';
import { addProductToCart, clearCart } from '../redux/ProductAddToCart';

const OrderScreens = () => {
  const { t } = useTranslation();
  const navigation = useNavigation()
  const token = useSelector((state) => state?.auth?.loginData?.token)
  const dispatch = useDispatch()
  const [data, setData] = useState([])


  useEffect(() => {
    orderData()
  }, [])


  const orderData = async () => {
    try {
      const result = await fetchOrder(token);
      if (result?.success) {
        setData(result?.data?.data)
      }
    } catch (e) {
      console.log(e);
    }
  };



  const addToCart = (reOrderItem) => {
      dispatch(clearCart());
    reOrderItem?.items?.forEach((productData, index) => {
      const data = {
        id: productData?.id,
        title: productData?.name,
        description: productData?.description,
        counter: Number(productData?.quantity),
        price: Number(productData?.price),
        image: `${productData?.image}`,
        extraItem: productData?.selectedExtras || [],
        productNotes: productData?.productNotes,
        nameOnSticker: productData?.nameOnSticker,
        msgForReceiver: productData?.msgForReceiver,
        restaurantId: reOrderItem?.restaurant_id,
        categoryId: productData?.categoryId,
      restData: productData?.restData,

      }
      dispatch(addProductToCart(data))
    })
    navigation.navigate('BasketScreen')

  }

  const renderItem = ({ item, index }) => {
    const isoString = item?.created_at
    const dateObj = new Date(isoString);
    const date = dateObj.toLocaleDateString(); // e.g. "10/31/2025"
    const time = dateObj.toLocaleTimeString(); // e.g. "4:33 PM"

    return (
      <TouchableOpacity
        onPress={() => navigation.navigate('OrderDetailsScreen', {
          item: item,
        })}

        style={styles.dataContainer}>

        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <View>
            <View style={{ flexDirection: 'row', gap: 15 }}>
              <View>
                <CustomText style={{ fontFamily: fonts.medium, marginBottom: 2 }}>{item?.order_number}</CustomText>
                <Subtitle>{date} {time}</Subtitle>
              </View>

              <MaterialIcons
                name={I18nManager.isRTL ? 'arrow-back-ios' : 'arrow-forward-ios'}
                size={15}
                color={colors.black}
              />
            </View>

            <View style={{ flexDirection: "row", gap: 10, marginVertical: 20 }}>

              {
                item?.items?.map((innerItem, innerIndex) => {
                  const remaining = item?.items?.length - 3
                  const isLastVisible = innerIndex === 2 && remaining > 0;
                  return (
                    <View>

                      <RemoteImage
                        key={innerIndex}
                        uri={`${innerItem?.image}`}
                        style={{ width: 45, height: 45 }}
                      />

                      {
                        isLastVisible &&
                        <View
                          style={{
                            width: 45, height: 45,
                            backgroundColor: "#00000050", position: "absolute",
                            borderRadius: 10, alignItems: "center",
                            justifyContent: "center"
                          }}

                        >
                          <CustomText style={{ color: colors.white, fontSize: 16, fontFamily: fonts.bold }} >+{remaining}</CustomText>
                        </View>
                      }
                    </View>

                  )
                })
              }
            </View>



            <CustomText>{currency} {item?.total}</CustomText>
          </View>


          <CustomButton
            title={'reOrder'}
            style={{ borderWidth: 1, backgroundColor: colors.white, width: "25%", height: 30, borderRadius: 4 }}
            btnTxtStyle={{ color: colors.black }}
            onPress={() => addToCart(item)}
          />
        </View>

        <DividerLine verticalGap={true} />
      </TouchableOpacity>
    );
  };

  return (
    <ScreenView>
      <HeaderBox logo={true} notification={false} search={false} />
      <IconLabel
        label={'yourOrders'}
        icon={<EvilIcons name={'calendar'} size={25} color={colors.black} />}
        style={{ marginBottom: 40 }}
      />

      <FlatList
        data={data}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
        scrollEnable={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom:100}}
        ListEmptyComponent={<EmptyData />}
      />
    </ScreenView>
  );
};

export default OrderScreens;

const styles = StyleSheet.create({
  dataContainer: {
    backgroundColor: colors.white.concat(50),
    // paddingBottom: 15,
    borderRadius: 10,
    // marginBottom: 20,
  },
  orderTopContainer: {
    // flexDirection: "row",
    justifyContent: 'space-between',
    // marginBottom: 20,
  },
  orderId: {
    color: colors.gray2,
    fontFamily: fonts.medium,
    textAlign: 'left',
    textTransform: 'uppercase',
  },
  orderIdValue: {
    // color: colors.black,
    color: colors.gray2,

    fontFamily: fonts.medium,
  },
  imageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  imageWrapper: {
    marginRight: 15,
    backgroundColor: colors.lightTheme,
    width: 55,
    height: 66,
  },
  image: {
    width: 55,
    height: 66,

    // borderRadius: 15,
  },
  statusText: {
    fontFamily: fonts.semiBold,
    color: colors.black,
    textTransform: 'capitalize',
  },
  orderDate: {
    color: colors.gray1,
    marginTop: 5,
    // textAlign: "right",
  },
  reorderButton: {
    flexDirection: 'row',
    borderColor: colors.secondary,
    paddingTop: 8,
    gap: 10,
    alignItems: 'center',
  },
  reorderText: {
    color: colors.green,
    fontFamily: fonts.medium,
    fontSize: 13,
  },
  arrowButton: {
    alignSelf: 'flex-end',
    marginTop: -15,
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerBox: {
    marginBottom: 40,
  },
});
