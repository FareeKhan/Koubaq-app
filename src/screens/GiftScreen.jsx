import {
  Dimensions,
  I18nManager,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useState } from 'react';
import ScreenView from '../components/ScreenView';
import HeaderBox from '../components/HeaderBox';
import CustomText from '../components/CustomText';
import { useTranslation } from 'react-i18next';
import { fonts } from '../constants/fonts';
import CustomButton from '../components/CustomButton';
import FilterButton from '../components/FilterButton';
import EmptyData from '../components/EmptyData';
import { currency, SentGiftsData } from '../constants/data';
import { colors } from '../constants/colors';
import DividerLine from '../components/DividerLine';
import GiftImage from '../components/GiftImage';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import { useNavigation } from '@react-navigation/native';

const { height } = Dimensions.get('screen');

const GiftScreen = () => {
  const navigation = useNavigation()
  const { t } = useTranslation();
  const [selectedFilter, setSelectedFilter] = useState('sendGift');
  const [isShowDetails, setIsShowDetails] = useState(false);
  const [isReceiverSender, setIsReceiverSender] = useState();
  const [isShowSenderDetail, setIsShowSenderDetail] = useState(false);

  const RenderSendGiftsData = () => {
    return SentGiftsData?.map((item, index) => {
      return (
        <View style={styles.cardWrapper} key={index}>
          <View style={styles.cardHeader}>
            <View>
              <CustomText style={styles.productName}>
                {item?.ProductName}
              </CustomText>
              <CustomText style={styles.productPrice}>
                {currency} {item?.price}
              </CustomText>
            </View>
            <Image
              source={item?.productImage}
              style={styles.productImage}
              borderRadius={5}
            />
          </View>

          <View>
            {isShowDetails ? (
              <GiftImage
                handleHidePress={()=>setIsShowDetails(false)}
                setIsShowDetails={setIsShowDetails}
                imagePath={require('../assets/giftMSg.png')}
                label={'Have a good day'}
                style={styles.giftImageMargin}
                senderName={'Muhammad'}
              />
            ) : (
              <>
                <GiftImage 
                setIsShowDetails={setIsShowDetails}
                />
                <CustomButton
                  onPress={() => setIsShowDetails(!isShowDetails)}
                  title={t('showDetails')}
                  style={[styles.detailsButton]}
                  btnTxtStyle={styles.detailsButtonText}
                />
              </>
            )}
          </View>

          {!isShowDetails && (
            <>
              <TouchableOpacity>
                <CustomText style={styles.deleteText}>
                  {t('deleteFromHistory')}
                </CustomText>
              </TouchableOpacity>

              <DividerLine />
            </>
          )}
        </View>
      );
    });
  };

  const RenderReceivedGiftsData = () => {
    return [1, 2, 3]?.map((item, index) => {
      return (
        <View key={item}>
          {isReceiverSender == index ? (
            <GiftImage
               handleHidePress={() => setIsReceiverSender(null)}
              onPress={() => setIsReceiverSender(null)}
              imagePath={require('../assets/giftMSg.png')}
              label={'Have a good day'}
              style={styles.receivedGiftImage}
              senderName={'Muhammad'}
            />
          ) : (
            <GiftImage />
          )}

          <View style={styles.receivedButtonsRow}>
            {isReceiverSender !== index && (
              <CustomButton
                onPress={() => setIsReceiverSender(index)}
                title={t('showSender')}
                style={styles.receiverSenderButton}
                btnTxtStyle={styles.receiverSenderBtnText}
              />
            )}

            <CustomButton
              title={t('showAllDetails')}
              onPress={() => setIsShowSenderDetail(true)}
              style={[
                styles.receiverSenderButton,
                isReceiverSender == index && styles.receiverSenderShift,
              ]}
              btnTxtStyle={styles.receiverSenderBtnText}
            />
          </View>
        </View>
      );
    });
  };

  const ShowAllDetails = () => {
    const InfoData = ({ label, value }) => {
      return (
        <View style={styles.infoRow}>
          <Entypo name={'dot-single'} size={20} color={colors.primary} />
          <CustomText style={styles.infoLabel}>
            {label}:
          </CustomText>
          <CustomText style={styles.infoValue}>
            {value}
          </CustomText>
        </View>
      );
    };

    return (
      <View>
        <View style={styles.rcvrOuterBox}>
          <View style={styles.rcvrDetail}>
            <View style={styles.productInfo}>
              <CustomText style={styles.productName}>
                Espresso single shot ethiopian beans
              </CustomText>
              <CustomText style={styles.productPrice}>
                {currency} 66.00
              </CustomText>
            </View>
            <Image
              source={require('../assets/cup.png')}
              style={styles.productImage}
              borderRadius={5}
            />
          </View>

          <View style={styles.actionRow}>
            <CustomButton
              title={t('addItemCart')}
              style={styles.addItemCartBtn}
              btnTxtStyle={styles.smallBtnText}
            />

            <CustomButton
              title={t('addAmountWallet')}
              style={styles.addAmountWalletBtn}
              btnTxtStyle={styles.smallBtnText}
            />
          </View>
        </View>

        <GiftImage />

        <View style={styles.secondGiftWrapper}>
          <GiftImage
            imagePath={require('../assets/giftMSg.png')}
            label={'Have a good day'}
            style={styles.secondGiftImage}
            senderName={'Muhammad'}
                setIsShowDetails={setIsShowDetails}

          />

          <TouchableOpacity style={styles.shareGiftBtn}>
            <EvilIcons name={'share-google'} size={25} color={colors.black} />
            <CustomText style={styles.shareGiftText}>
              {t('shareGift')}
            </CustomText>
          </TouchableOpacity>
        </View>

        <View style={styles.infoList}>
          <InfoData label={t('sentData')} value={'1-8-2025 | 08:00AM'} />
          <InfoData label={t('expiryDate')} value={'30-12-2025 | 08:00AM'} />
        </View>

        <View style={styles.bottomRow}>
          <CustomButton
            title={t('back')}
            onPress={() => setIsShowSenderDetail(false)}
                 style={[styles.addItemCartBtn,{width:"22%"}]}
              btnTxtStyle={styles.smallBtnText}
          />

          <TouchableOpacity>
            <CustomText style={styles.deleteHistoryText}>
              {t('deleteFromHistory')}
            </CustomText>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <ScreenView scrollable={true}>
      <HeaderBox logo={true} />


   

      <CustomText style={styles.giftsTitle}>{t('gifts')}</CustomText>

      <CustomButton
      onPress={()=>navigation.navigate('GiftFilterScreen')}
      title={t('sendGiftNow')} style={styles.sendGiftButton} />

      <FilterButton
        leftValue='sendGift'
        rightValue='rcvdGifts'
        setSelectedFilter={setSelectedFilter}
        selectedFilter={selectedFilter}
      />

      {selectedFilter =='sendGift' ? (
        <RenderSendGiftsData />
      ) : isShowSenderDetail ? (
        <ShowAllDetails />
      ) : (
        <RenderReceivedGiftsData />
      )}



          {/* { (
        <EmptyData title={t('noGift')} style={styles.emptyData} />
      )} */}
    </ScreenView>
  );
};

export default GiftScreen;

const styles = StyleSheet.create({
  giftsTitle: {
    fontSize: 16,
    fontFamily: fonts.semiBold,
    marginVertical: 30,
  },
  sendGiftButton: {
    borderRadius: 50,
    marginBottom: 25,
  },
  cardWrapper: {},
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    paddingLeft: 15,
    paddingRight: 6,
    paddingTop: 7,
    paddingBottom: 10,
    borderRadius: 10,
    borderColor: colors.gray,
    marginBottom: 12,
  },
  giftImageMargin: { marginHorizontal: 5 },
  rcvrOuterBox: {
    borderWidth: 1,
    paddingLeft: 15,
    paddingRight: 6,
    paddingTop: 7,
    paddingBottom: 10,
    borderRadius: 10,
    borderColor: colors.gray,
    marginBottom: 10,
  },
  rcvrDetail: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  productInfo: { width: '80%' },
  actionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 15,
    marginLeft: -5,
  },
  addItemCartBtn: { height: 27, borderRadius: 50, width: '47%' },
  addAmountWalletBtn: { height: 27, borderRadius: 50, width: '48%' },
  smallBtnText: { fontSize: 12 },
  secondGiftWrapper: { marginTop: 10 },
  secondGiftImage: { marginHorizontal: 5, marginTop: 10 },
  shareGiftBtn: {
    position: 'absolute',
    gap: 5,
    bottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    right: 20,
  },
  shareGiftText: { color: colors.primary },
  infoList: { marginVertical: 15 },
  infoRow: { flexDirection: 'row', alignItems: 'center' },
  infoLabel: { fontSize: 12, color: colors.primary, marginRight: 5 },
  infoValue: {
    fontSize: 11,
    fontFamily: fonts.semiBold,
    color: colors.primary,
  },
  bottomRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  backBtn: { height: I18nManager.isRTL ?  40 : 20, width: '30%' },
  deleteHistoryText: { fontSize: 12, color: colors.red },
  productName: {
    fontSize: 13,
  },
  productPrice: {
    fontFamily: fonts.semiBold,
    fontSize: 12,
    paddingTop: 3,
  },
  productImage: {
    width: 60,
    height: 55,
  },
  detailsButton: {
    backgroundColor: colors.secondary,
    borderWidth: 1,
    height: 30,
    width: 85,
    borderRadius: 5,
    position: 'absolute',
    bottom: 50,
    left: I18nManager.isRTL? null : 20,
    right: I18nManager.isRTL? 20 : null,
    borderColor: colors.primary,
  },
  detailsButtonText: {
    color: colors.primary,
    fontSize: 10,
  },
  deleteText: {
    textAlign: 'center',
    fontSize: 12,
    color: colors.red,
    marginTop: 5,
    marginBottom: 15,
  },
  receivedGiftImage: { marginHorizontal: 5, marginBottom: -40 },
  receivedButtonsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginTop: 10,
    marginBottom: 25,
  },
  receiverSenderButton: {
    backgroundColor: colors.secondary,
    borderWidth: 1,
    height: 31,
    width: 120,
    borderRadius: 5,
    borderColor: colors.primary,
  },
  receiverSenderBtnText: {
    color: colors.primary,
    fontSize: 11,
  },
  receiverSenderShift: { top: -5, marginLeft: 'auto' },
  emptyData: {
    height: height / 2,
  },
});
