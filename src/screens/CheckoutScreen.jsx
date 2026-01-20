import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import ScreenView from '../components/ScreenView';
import HeaderBox from '../components/HeaderBox';
import { useTranslation } from 'react-i18next';
import CustomText from '../components/CustomText';
import Subtitle from '../components/Subtitle';
import { colors } from '../constants/colors';
import { fonts } from '../constants/fonts';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import HeaderWithAll from '../components/HeaderWithAll';
import { mainUrl, paymentCards } from '../constants/data';
import KeyValue from '../components/KeyValue';
import CustomButton from '../components/CustomButton';
import { useNavigation } from '@react-navigation/native';
import CustomModal from '../components/CustomModal';
import AddedCarData from '../components/AddedCarData';
import { useDispatch, useSelector } from 'react-redux';
import RemoteImage from '../components/RemoteImage';
import AddBrandedCar from '../components/AddBrandedCar';
import { giftStatusUpdate, makeGiftOrder, makeOrder } from '../userServices/UserService';
import { clearCart } from '../redux/ProductAddToCart';
import { initializePaymentSheet, openPaymentSheet } from '../constants/helper';
import { showMessage } from 'react-native-flash-message';

const CheckoutScreen = ({ isHeader = true, route }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch()
  const baseketData = useSelector((state) => state?.cart?.cartProducts)
  const token = useSelector((state) => state?.auth?.loginData?.token)
  const userData = useSelector((state) => state?.auth?.loginData)
  const giftCartData = useSelector((state) => state?.giftInfo?.giftProduct)
  const userId = useSelector((state) => state?.auth?.loginData?.id)
  const restId = useSelector((state) => state?.cart?.restaurentID)
  const cartData = baseketData?.filter((item) => (item?.restaurantId) === Number(restId))
  const isCheckGift = baseketData?.find((item) => (item?.isGift) == true)
  const restaurentData = cartData[0]?.restData

  const resID = useSelector((state) => state?.cart?.restaurentID)
  const { driverNote, discount } = route?.params || ''

  const navigation = useNavigation();
  const [selectedPayment, setSelectedPayment] = useState(3);
  const [isScheduleModal, setIsScheduleModal] = useState(false);
  const [scheduleTimeArray, setScheduleTimeArray] = useState([]);
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedCarId, setSelectedCarId] = useState('')
  const [selectedCarInfo, setSelectedCarInfo] = useState('')

  const [loading, setLoading] = useState(false);
  const [isOrderLoader, setIsOrderLoader] = useState(false);

  const paymentData = paymentCards(t);
  const subTotalPrice = cartData?.reduce((sum, item) => sum + (item?.price * item?.counter || 0), 0) - discount ?? 0
  const finalPrice = subTotalPrice || giftCartData?.price * giftCartData?.counter

  const PickUpTimeBox = () => {
    return (
      <View style={styles.pickupContainer}>
        <View style={styles.pickupLeft}>
          <Image source={require('../assets/runner.png')} />
          <CustomText style={styles.pickupText}>
            Pickup Within 36 mins
          </CustomText>
        </View>
        <TouchableOpacity
          onPress={() => setIsScheduleModal(true)}
          style={styles.scheduleBtn}
        >
          <Ionicons name={'time-outline'} size={20} color={colors.primary} />
          {selectedTime ? (
            <CustomText style={styles.scheduleText}>{selectedTime}</CustomText>
          ) : (
            <CustomText style={styles.scheduleText}>{t('Schedule')}</CustomText>
          )}
        </TouchableOpacity>
      </View>
    );
  };

  useEffect(() => {
    getFutureTimeSlots();
  }, []);

  useEffect(() => {
    if (finalPrice > 0) {
      initializePaymentSheet(finalPrice, setLoading);
    }
  }, [finalPrice]);


  const handleCheckOutBtn = () => {

    if (!userId) {
      showMessage({
        type: "danger",
        message: t('PleaseLoginFirst')
      })
      return
    }

    if (selectedCarId == '' && isHeader) {
      showMessage({
        type: "danger",
        message: t("pleaseSelectCar")
      })
      return
    }


    if (selectedPayment == 2 || selectedPayment == 1) {
      openPaymentSheet(processOrder)
    } else {
      if (isHeader) {
        processOrder()
      } else {
        processGiftOrder()
      }
    }
  }
  console.log('-----', isCheckGift?.id)

  const processOrder = async () => {
    setIsOrderLoader(true)

    const payMethod = selectedPayment == 1 ? "apple_pay" : selectedPayment == 2 ? 'card' : 'wallet'
    try {
      const response = await makeOrder(cartData, resID, token, driverNote, selectedCarId, finalPrice, userData?.phoneNo, payMethod, selectedCarInfo, isCheckGift?.isGift)
      if (response?.success) {
        navigation.navigate('SuccessfulScreen')
        dispatch(clearCart())
      } else {
        showMessage({
          type: "danger",
          message: response?.message || 'Insufficient wallet balance'
        })
      }
      console.log('response', response)
    } catch (error) {
      console.log('error', error)
      showMessage({
        type: "danger",
        message: error?.errors
      })
    } finally {
      setIsOrderLoader(false)
    }
  }

  const processGiftOrder = async () => {
    if (!userId) {
      showMessage({
        type: "danger",
        message: t('PleaseLoginFirst')
      })
      return
    }
    setIsOrderLoader(true)
    try {
      const response = await makeGiftOrder(giftCartData, token, selectedCarId, finalPrice, selectedPayment)
      console.log('responsare', response)
      if (response?.success) {
        navigation.navigate('SuccessfulScreen')
        dispatch(clearCart())
      } else {
        showMessage({
          type: "danger",
          message: response?.message || 'Insufficient wallet balance'
        })
      }
      console.log('response', response)
    } catch (error) {
      console.log('dasdasdeee333', error)
      showMessage({
        type: "danger",
        message: error?.errors
      })
    } finally {
      setIsOrderLoader(false)
    }
  }

  const getFutureTimeSlots = () => {
    const startHour = 8;
    const endHour = 22;
    const now = new Date();

    const slots = [];
    for (let hour = startHour; hour <= endHour; hour++) {
      const time = new Date();
      time.setHours(hour, 0, 0, 0);
      if (time > now) {
        const formatted = time?.toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        });
        slots.push(formatted);
      }
    }
    return setScheduleTimeArray(slots);
  };

  const handleTimeSelection = item => {
    setSelectedTime(item);
    setIsScheduleModal(false);
  };
  const isAppleSelected = selectedPayment == 1;

  return (
    <ScreenView scrollable={true} style={!isHeader && { paddingTop: 20 }}>
      {isHeader && (
        <>
          <HeaderBox
            style={{ width: '95%' }}
            notification={false}
            search={false}
            title={t('checkout')}
          />
          <RemoteImage
            uri={`${mainUrl}${restaurentData?.cover_image}`}
            style={styles.shopImage}
          />
          <View style={styles.topImageAddressContainer}>
            <View style={styles.topImageAddressHeader}>
              <CustomText>
                {t('from')} <CustomText style={styles.fromText}>{restaurentData?.name}</CustomText>
              </CustomText>
              <TouchableOpacity>
                <Subtitle style={styles.detailsText}>{t('details')}</Subtitle>
              </TouchableOpacity>
            </View>
            <Subtitle style={styles.addressSubtitle}>
              {restaurentData?.location}
            </Subtitle>
            <View style={styles.mobileRow}>
              <Subtitle>{t('mobileNumber')}:   {restaurentData?.phone_number}</Subtitle>
              <View style={styles.ratingRow}>
                <Entypo name={'star'} size={15} color={colors.black} />
                <Subtitle> 4.6+ {t('rating')}</Subtitle>
              </View>
            </View>
          </View>
          <PickUpTimeBox />
        </>
      )}


      {
        isHeader &&
        <AddBrandedCar
          setSelectedCarId={setSelectedCarId}
          setSelectedCarInfo={setSelectedCarInfo}
          selectedCarId={selectedCarId}
        />
      }

      <AddedCarData
        isBorder={true}
      />
      {
        !isCheckGift?.isGift &&
        <>
          <HeaderWithAll title={t('payWith')} />
          <View style={styles.paymentList}>
            {paymentData?.map((item, index) => {
              return (
                <TouchableOpacity
                  onPress={() => setSelectedPayment(item?.id)}
                  key={index}
                  style={styles.paymentItem}
                >
                  <View
                    style={[
                      styles.paymentCircle,
                      selectedPayment == item?.id && styles.paymentCircleSelected,
                    ]}
                  >
                    {selectedPayment == item?.id && (
                      <Ionicons
                        name={'checkmark-sharp'}
                        size={15}
                        color={colors.white}
                      />
                    )}
                  </View>
                  {item?.card}
                  <CustomText style={styles.paymentTitle}>{item?.title}</CustomText>
                </TouchableOpacity>
              );
            })}
          </View>
        </>
      }


      <HeaderWithAll title={t('paymentSummary')} />
      <KeyValue leftValue={t('Subtotal')} rightValue={finalPrice} />
      <KeyValue
        leftValue={t('ServiceFee')}
        rightValue={'Free'}
        style={{ marginTop: -5 }}
      />
      {
        discount != 0 &&
        <KeyValue leftValue={t('discount')} rightValue={'-SAR ' + discount || 0} />
      }
      <KeyValue
        boldData={true}
        leftValue={t('TotalAmount')}
        rightValue={finalPrice}
        style={{ marginTop: 10 }}
      />
      <TouchableOpacity style={styles.readFeesBtn}>
        <CustomText style={styles.readFeesText}>{t('readFees')}</CustomText>
      </TouchableOpacity>

      <CustomButton
        appleIcon={isAppleSelected}
        title={isAppleSelected ? t('Pay') : t('payment')}
        btnTxtStyle={[{ fontSize: 16 }, isAppleSelected && { marginLeft: 3 }]}
        style={isAppleSelected && { backgroundColor: colors.black }}
        // onPress={() => navigation.navigate('SuccessfulScreen')}
        onPress={() => handleCheckOutBtn()}
        loader={isOrderLoader}
      />

      <CustomModal
        animationType={'fade'}
        modalVisible={isScheduleModal}
        setModalVisible={setIsScheduleModal}
        textStyle={{ color: colors.primary }}
        title={t('scheduleTime')}
      >
        <View style={styles.modalContent}>
          {scheduleTimeArray?.length > 0 ? (
            scheduleTimeArray?.map((item, index) => {
              return (
                <TouchableOpacity
                  onPress={() => handleTimeSelection(item)}
                  key={index}
                  style={[
                    styles.timeOption,
                    selectedTime == item && styles.timeOptionSelected,
                  ]}
                >
                  <CustomText>{item}</CustomText>
                </TouchableOpacity>
              );
            })
          ) : (
            <CustomText>No Slots Available</CustomText>
          )}
        </View>
      </CustomModal>
    </ScreenView>
  );
};

export default CheckoutScreen;

const styles = StyleSheet.create({
  topImageAddressContainer: {
    paddingRight: 10,
    paddingLeft: 40,
    borderWidth: 1,
    paddingTop: 15,
    paddingBottom: 10,
    borderTopWidth: 0,
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
    borderColor: colors.gray5,
  },
  topImageAddressHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  fromText: {
    fontSize: 16,
    fontFamily: fonts.medium,
  },
  detailsText: {
    color: colors.black,
    textDecorationLine: 'underline',
    fontSize: 11,
  },
  addressSubtitle: {
    marginVertical: 3,
  },
  mobileRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  pickupContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: colors.gray,
    paddingVertical: 10,
    paddingHorizontal: 10,
    paddingLeft: 15,
    borderRadius: 10,
    marginTop: 25,
    marginBottom: 20,
  },
  pickupLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 25,
  },
  pickupText: {
    fontFamily: fonts.medium,
  },
  scheduleBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  scheduleText: {
    color: colors.primary,
    textDecorationLine: 'underline',
  },
  shopImage: {
    width: '100%',
    height: 150,
    marginTop: 30,
  },
  paymentList: {
    marginTop: -10,
    marginBottom: 20,
  },
  paymentItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 18,
    borderWidth: 1,
    width: '70%',
    paddingHorizontal: 5,
    borderRadius: 10,
    marginBottom: 10,
    borderColor: colors.primary1,
    paddingVertical: 2,
  },
  paymentCircle: {
    height: 22,
    width: 22,
    borderWidth: 1,
    borderRadius: 50,
    borderColor: colors.gray,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  paymentCircleSelected: {
    backgroundColor: colors.black,
  },
  paymentTitle: {
    fontFamily: fonts.medium,
  },
  readFeesBtn: {
    marginBottom: 40,
  },
  readFeesText: {
    fontFamily: fonts.medium,
  },
  modalContent: {
    paddingBottom: 50,
  },
  timeOption: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderWidth: 1,
    borderRadius: 7,
    marginBottom: 15,
  },
  timeOptionSelected: {
    borderColor: colors.primary,
    borderWidth: 2,
  },
});
