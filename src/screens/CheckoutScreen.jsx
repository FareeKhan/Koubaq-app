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
import { paymentCards } from '../constants/data';
import KeyValue from '../components/KeyValue';
import CustomButton from '../components/CustomButton';
import { useNavigation } from '@react-navigation/native';
import CustomModal from '../components/CustomModal';
import AddedCarData from '../components/AddedCarData';

const CheckoutScreen = ({ isHeader = true }) => {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const [selectedPayment, setSelectedPayment] = useState(3);
  const [isScheduleModal, setIsScheduleModal] = useState(false);
  const [scheduleTimeArray, setScheduleTimeArray] = useState([]);
  const [selectedTime, setSelectedTime] = useState('');

  const paymentData = paymentCards(t);

  const TopImageAddress = () => {
    return (
      <View style={styles.topImageAddressContainer}>
        <View style={styles.topImageAddressHeader}>
          <CustomText>
            {t('from')} <CustomText style={styles.fromText}>Pakero</CustomText>
          </CustomText>
          <TouchableOpacity>
            <Subtitle style={styles.detailsText}>{t('details')}</Subtitle>
          </TouchableOpacity>
        </View>
        <Subtitle style={styles.addressSubtitle}>
          Al Rigga, Green corner , 703, 7
        </Subtitle>
        <View style={styles.mobileRow}>
          <Subtitle>{t('mobileNumber')}: +971123123123</Subtitle>
          <View style={styles.ratingRow}>
            <Entypo name={'star'} size={15} color={colors.black} />
            <Subtitle>4.6+ {t('rating')}</Subtitle>
          </View>
        </View>
      </View>
    );
  };

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
          <Image
            source={require('../assets/shop.png')}
            style={styles.shopImage}
          />
          <TopImageAddress />
          <PickUpTimeBox />
        </>
      )}


      <AddedCarData 
      isBorder={true}
      />

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

      <HeaderWithAll title={t('paymentSummary')} />
      <KeyValue leftValue={t('Subtotal')} rightValue={'66.00'} />
      <KeyValue
        leftValue={t('ServiceFee')}
        rightValue={'66.00'}
        style={{ marginTop: -5 }}
      />
      <KeyValue
        boldData={true}
        leftValue={t('TotalAmount')}
        rightValue={'66.00'}
        style={{ marginTop: 10 }}
      />
0
      <TouchableOpacity style={styles.readFeesBtn}>
        <CustomText style={styles.readFeesText}>{t('readFees')}</CustomText>
      </TouchableOpacity>

      <CustomButton
        appleIcon={isAppleSelected}
        title={isAppleSelected ? t('Pay') : t('payment')}
        btnTxtStyle={[{ fontSize: 16 }, isAppleSelected && { marginLeft: 3 }]}
        style={isAppleSelected && { backgroundColor: colors.black }}
        onPress={() => navigation.navigate('SuccessfulScreen')}
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
    borderColor: colors.gray,
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
