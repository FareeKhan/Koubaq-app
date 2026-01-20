import {
  Dimensions,
  FlatList,
  I18nManager,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import ScreenView from '../components/ScreenView';
import HeaderBox from '../components/HeaderBox';
import CustomText from '../components/CustomText';
import { useTranslation } from 'react-i18next';
import { fonts } from '../constants/fonts';
import CustomButton from '../components/CustomButton';
import FilterButton from '../components/FilterButton';
import EmptyData from '../components/EmptyData';
import { currency, mainUrl, SentGiftsData } from '../constants/data';
import { colors } from '../constants/colors';
import DividerLine from '../components/DividerLine';
import GiftImage from '../components/GiftImage';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { fetchSendGifts, giftRcvd, giftWalletUpdate, removeGiftData } from '../userServices/UserService';
import { useDispatch, useSelector } from 'react-redux';
import ScreenLoader from '../components/ScreenLoader';
import { showMessage } from 'react-native-flash-message';
import { addProductToCart, clearCart } from '../redux/ProductAddToCart';
import RenderReceivedGiftsData from '../components/RenderReceivedGiftsData';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import RemoteImage from '../components/RemoteImage';
const { height } = Dimensions.get('screen');

const GiftScreen = () => {
  const navigation = useNavigation()
  const { t } = useTranslation();
  const dispatch = useDispatch()
  const token = useSelector((state) => state.auth.loginData?.token)
  const userId = useSelector((state) => state.auth.loginData?.id)
  const [selectedFilter, setSelectedFilter] = useState('sendGift');
  const [isShowDetails, setIsShowDetails] = useState(null);

  const [isReceiverSender, setIsReceiverSender] = useState();
  const [isShowSenderDetail, setIsShowSenderDetail] = useState(false);
  const [sendGiftData, setSendGiftData] = useState([]);
  const [deleteLoader, setDeleteLoader] = useState(false);
  const [receivedGiftData, setReceivedGiftData] = useState([]);

  useFocusEffect(useCallback(() => {
    getSentGifts()
    rcvdGift()
  }, []))
  useEffect(() => {
    setIsShowDetails(null)
    setIsShowSenderDetail(false)
  }, [selectedFilter])

  const getSentGifts = async () => {
    try {
      const result = await fetchSendGifts(token);
      console.log('sss', result?.data?.data?.length)
      if (result?.success) {
        setSendGiftData(result?.data?.data)
      }
    } catch (e) {
      console.log(e);
    }
  };

  const updateWallet = async () => {
    try {
      const result = await giftWalletUpdate(isShowSenderDetail, userId);
      console.log('result-->>>', result)
      if (result?.success) {
        deleteGift(isShowSenderDetail?.id, 'update')
        showMessage({
          type: "success",
          message: t('Balance added to Wallet')
        })
      }
    } catch (e) {
      console.log(e);
    } finally {
      setDeleteLoader(false)
    }
  };

  const rcvdGift = async () => {
    try {
      const result = await giftRcvd(token);
      if (result?.success) {
        setReceivedGiftData(result?.data?.data)
      } else {
        setReceivedGiftData([])
      }
    } catch (e) {
      console.log('--', e);
    } finally {
      console.log('-0-dasd')
      setDeleteLoader(false)
    }
  };

  const deleteGift = async (id, value) => {
    setDeleteLoader(true)
    try {
      const result = await removeGiftData(id, token);
      console.log('asdasd', result)
      if (result?.success) {
        if (value === true || value === 'update') {
          const updated = await giftRcvd(token);
          setIsShowSenderDetail('')
          if (updated?.success) {
            setReceivedGiftData(updated?.data?.data?.length > 0 ? updated.data.data : []);
          }
        } else {
          // setSendGiftData(prev => prev.filter(item => item.id !== id));
          getSentGifts()

        }
        {
          value !== 'update' &&
            showMessage({
              type: "success",
              message: t('GiftDeleted')
            })
        }

      }
    } catch (e) {
      console.log(e);
    } finally {
      setDeleteLoader(false)
    }
  };

  const renderGiftSection = ({ item, index }) => {
    return (
      <View style={styles.cardWrapper} key={index}>
        <View style={styles.cardHeader}>
          <View>
            <CustomText style={styles.productName}>
              {item?.gift_item}  {currency} {item?.products[0]?.price}  x {item?.products[0]?.quantity}
            </CustomText>
          </View>
          <Image
            source={{ uri: item?.product_image }}
            style={styles.productImage}
            borderRadius={5}
          />
        </View>

        <View>
          {isShowDetails == index ? (
            <GiftImage
              handleHidePress={() => setIsShowDetails(null)}
              setIsShowDetails={setIsShowDetails}
              // imagePath={require('../assets/giftMSg.png')}
              imagePath={item?.gift_theme}
              label={item?.gift_message}
              style={styles.giftImageMargin}
              senderName={item?.recipient_name}
              receiver={true}
              item={isShowSenderDetail}

            />
          ) : (
            <>
              <GiftImage
                setIsShowDetails={setIsShowDetails}
                imagePath={item?.gift_theme}
              />
              <CustomButton
                onPress={() => setIsShowDetails(index)}
                title={t('showDetails')}
                style={[styles.detailsButton]}
                btnTxtStyle={styles.detailsButtonText}
              />
            </>
          )}
        </View>

        {isShowDetails !== index && (
          <>
            {
              deleteLoader ?
                <ScreenLoader type={1} />
                :
                <TouchableOpacity onPress={() => deleteGift(item?.id)}>
                  <CustomText style={styles.deleteText}>
                    {t('deleteFromHistory')}
                  </CustomText>
                </TouchableOpacity>


            }

            <DividerLine />
          </>
        )}


        <View style={{ marginVertical: 20 }} />
      </View>
    );
  }
  const RenderSendGiftsData = () => {
    return (
      <FlatList
        data={sendGiftData}
        keyExtractor={(item, index) => index?.toString()}
        renderItem={renderGiftSection}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
        ListEmptyComponent={<EmptyData />}
      />

    )
  };

  const addToCart = () => {
    dispatch(clearCart());
    {
      const data = {
        id: isShowSenderDetail?.products[0]?.item_id,
        title: isShowSenderDetail?.gift_item,
        description: isShowSenderDetail?.description || 'description',
        counter: Number(isShowSenderDetail?.products[0]?.quantity),
        price: Number(isShowSenderDetail?.products[0]?.price),
        image: `${isShowSenderDetail?.products[0]?.image}`,
        extraItem: isShowSenderDetail?.selectedExtras || [],
        productNotes: isShowSenderDetail?.productNotes || 'productNotes',
        nameOnSticker: receivedGiftData?.recipient_name,
        msgForReceiver: receivedGiftData?.gift_message,
        restaurantId: isShowSenderDetail?.order?.restaurant_id,
        categoryId: isShowSenderDetail?.categoryId,
        restData: isShowSenderDetail?.order?.restaurant,
        isGift: true
      }
      console.log('data===', data)

      dispatch(addProductToCart(data))
    }
    navigation.navigate('BasketScreen')
  }

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

        {/* <GiftImage /> */}
        <View style={styles.secondGiftWrapper}>
          <View style={{ position: "absolute", zIndex: 999, bottom: 50 }}>
            <View style={{ marginTop: 30, marginLeft: 20, flexDirection: "row", gap: 10, alignItems: "center" }}>
              <MaterialIcons name={'flip'} size={18} color={colors.white} />
              <CustomText style={{ color: colors.white, fontFamily: fonts.bold, fontSize: 10 }}>{t('backflip')}</CustomText>
            </View>
          </View>



          <GiftImage
            imagePath={isShowSenderDetail?.gift_theme}
            // label={isShowSenderDetail?.gift_message}
            style={styles.secondGiftImage}
            item={isShowSenderDetail}
            // senderName={true}
            setIsShowDetails={setIsShowDetails}
            // rcptName={isShowSenderDetail?.recipient_name}
            handleHidePress={() => setIsShowSenderDetail('')}

          />
          {/* <TouchableOpacity
          onPress={onPress ? onPress : () => setIsShowDetails(null)}
          activeOpacity={1}
          style={{
            shadowColor: '#00000090',
            shadowOffset: {
              width: 0,
              height: 3,
            },
            shadowOpacity: 0.15,
            shadowRadius: 1.5,
            elevation: 7,
            backgroundColor: '#fff',
            paddingLeft: 10,
            borderBottomLeftRadius: 10,
            borderBottomRightRadius: 10,
            paddingTop: 20,
            paddingBottom: 10,
            zIndex: -100,
          }}
        >
          <CustomText style={{ fontSize: 15, color: colors.primary }}>
            {receiver ? t('receiver') : t('sender')}  : {senderName}{' '}
          </CustomText>
        </TouchableOpacity> */}
          <TouchableOpacity style={styles.shareGiftBtn}>
            <EvilIcons name={'share-google'} size={25} color={colors.black} />
            <CustomText style={styles.shareGiftText}>
              {t('shareGift')}
            </CustomText>
          </TouchableOpacity>
        </View>

{

      <View style={{ flexDirection: "row", borderWidth: 1, borderColor: colors.gray, paddingVertical: 10, borderRadius: 10, paddingHorizontal: 10, marginBottom: 10 }}>
          <CustomText style={{ color: colors.primary, fontFamily: fonts.bold, }}>{t("Message") + ": "}</CustomText>
          <CustomText style={{ color: colors.primary, width: "80%", }}>  {isShowSenderDetail?.gift_message ?? t('noMsg')}</CustomText>
        </View>
}
  

        <View style={{ flexDirection: "row", gap: 5, alignItems: "center", borderWidth: 1, borderColor: colors.gray, paddingVertical: 10, borderRadius: 10, paddingHorizontal: 10, marginBottom: 10 }}>

          <RemoteImage
            uri={`${mainUrl}${isShowSenderDetail?.order?.restaurant?.logo}`}
            style={{ width: 40, height: 40, }}
          />
          <CustomText style={{ color: colors.primary, }}>{isShowSenderDetail?.order?.restaurant?.name}</CustomText>
        </View>


        <View style={styles.rcvrOuterBox}>
          <View style={styles.rcvrDetail}>
            <View style={styles.productInfo}>
              <CustomText style={styles.productName}>
                {isShowSenderDetail?.gift_item}
              </CustomText>
              <CustomText style={styles.productPrice}>
                {currency}  {isShowSenderDetail?.products[0]?.price} X {isShowSenderDetail?.products[0]?.quantity}

              </CustomText>
            </View>
            <Image
              source={{ uri: isShowSenderDetail?.products[0]?.image }}
              style={styles.productImage}
              borderRadius={5}
            />
          </View>

          <View style={styles.actionRow}>
            <CustomButton
              title={t('addItemCart')}
              style={styles.addItemCartBtn}
              btnTxtStyle={styles.smallBtnText}
              onPress={addToCart}
            />

            <CustomButton
              title={t('addAmountWallet')}
              style={styles.addAmountWalletBtn}
              btnTxtStyle={styles.smallBtnText}
              onPress={() => updateWallet()}
            />
          </View>
        </View>



        {/* <View style={styles.infoList}>
          <InfoData label={t('sentData')} value={'1-8-2025 | 08:00AM'} />
          <InfoData label={t('expiryDate')} value={'30-12-2025 | 08:00AM'} />
        </View> */}

        <View style={styles.bottomRow}>
          {/* <CustomButton
            title={t('back')}
            onPress={() => setIsShowSenderDetail('')}
            style={[styles.addItemCartBtn, { width: "22%" }]}
            btnTxtStyle={styles.smallBtnText}
          /> */}


          {
            deleteLoader ?
              <ScreenLoader type={1} /> :
              <TouchableOpacity onPress={() => deleteGift(isShowSenderDetail?.id, true)}>
                <CustomText style={styles.deleteHistoryText}>
                  {t('deleteFromHistory')}
                </CustomText>
              </TouchableOpacity>
          }

        </View>
      </View>
    );
  };

  console.log('isShowSenderDetail--',isShowSenderDetail)

  return (
    <ScreenView scrollable={true}>
      <HeaderBox logo={true} search={false} isBack={false} />

      <CustomText style={styles.giftsTitle}>{t('gifts')}</CustomText>

      <CustomButton
        onPress={() => navigation.navigate('GiftFilterScreen')}
        title={t('sendGiftNow')} style={styles.sendGiftButton} />

      <FilterButton
        leftValue='sendGift'
        rightValue='rcvdGifts'
        setSelectedFilter={setSelectedFilter}
        selectedFilter={selectedFilter}
      />

      {selectedFilter == 'sendGift' ? (
        <RenderSendGiftsData />
      ) : isShowSenderDetail ? (
        <ShowAllDetails />
      ) : (
        <RenderReceivedGiftsData
          setIsReceiverSender={setIsReceiverSender}
          data={receivedGiftData}
          isReceiverSender={isReceiverSender}
          setIsShowSenderDetail={setIsShowSenderDetail}
          isShowSenderDetail={isShowSenderDetail}
        />
      )}
    </ScreenView>
  );
};

export default GiftScreen;

const styles = StyleSheet.create({
  giftsTitle: {
    fontSize: 16,
    fontFamily: fonts.semiBold,
    marginTop: 30,
    marginBottom: 15,
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
  giftImageMargin: { marginHorizontal: 5, marginBottom: 20 },
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
  secondGiftWrapper: { marginBottom: 15 },
  secondGiftImage: { marginHorizontal: 5, marginTop: 10 },
  shareGiftBtn: {
    // position: 'absolute',
    // gap: 5,
    // bottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: "center",
    // right: 20,
    shadowColor: '#00000090',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.15,
    shadowRadius: 1.5,
    elevation: 7,
    backgroundColor: '#fff',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    paddingTop: 10,
    paddingBottom: 10,
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
    marginTop: 10
  },
  backBtn: { height: I18nManager.isRTL ? 40 : 20, width: '30%' },
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
    left: I18nManager.isRTL ? null : 20,
    right: I18nManager.isRTL ? 20 : null,
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
