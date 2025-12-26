import {
  I18nManager,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  Share,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import ScreenView from '../components/ScreenView';
import HeaderBox from '../components/HeaderBox';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { colors } from '../constants/colors';
import FilterButton from '../components/FilterButton';
import HeaderWithAll from '../components/HeaderWithAll';
import { useTranslation } from 'react-i18next';
import CustomText from '../components/CustomText';
import { fonts } from '../constants/fonts';
import Feather from 'react-native-vector-icons/Feather';
import Subtitle from '../components/Subtitle';
import { birthdayWishes, currency, extraData, mainUrl } from '../constants/data';
import DividerLine from '../components/DividerLine';
import CustomButton from '../components/CustomButton';
import CustomInput from '../components/CustomInput';
import IncrementDecrement from '../components/IncrementDecrement';
import ProductDataCard from '../components/ProductDataCard';
import SuggestedMsgsModal from '../components/SuggestedMsgsModal';
import { useNavigation } from '@react-navigation/native';
import { fetchProductDetails, fetchSuggestedMsgs } from '../userServices/UserService';
import { addProductToCart } from '../redux/ProductAddToCart';
import { useDispatch } from 'react-redux';
import { addGiftProductToCart } from '../redux/GiftData';
import { showMessage } from 'react-native-flash-message';

const ProductDetail = ({ route }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch()
  const { isGifterPage, id, restaurant_id, data } = route?.params || '';
  const relatedData = data?.filter((item) => item?.id !== id)
  const navigation = useNavigation();


  const [counter, setCounter] = useState(1);
  const [selectedExtras, setSelectedExtras] = useState([]);

  const [selectedFilter, setSelectedFilter] = useState('customizeItem');
  const [modalVisible, setModalVisible] = useState(false);
  const [rcvrNameOnSticker, setRcvrNameOnSticker] = useState('');
  const [msgForReceiver, setMsgForReceiver] = useState('');

  const [suggestedMessages, setSuggestedMessages] = useState([]);
  const [productData, setProductData] = useState([]);
  const [isLoader, setIsLoader] = useState(true);
  const [addNote, setAddNote] = useState('');

  useEffect(() => {
    loadProductData()
    loadSuggestedMsgs()
  }, [])

  const loadProductData = async () => {
    setIsLoader(true)
    try {
      const result = await fetchProductDetails(id)
      if (result?.success) {
        setProductData(result?.data)
      }
    } catch (ee) {
      console.log('ee', ee)
    } finally {
      setIsLoader(false)
    }
  }


  const loadSuggestedMsgs = async () => {
    try {
      const result = await fetchSuggestedMsgs(restaurant_id)
      if (result?.success) {
        setSuggestedMessages(result?.data)
      }
    } catch (ee) {
      console.log('ee', ee)
    }
  }






  const addToCart = () => {
    if (rcvrNameOnSticker == '') {
      setSelectedFilter('customizeSticker')
      showMessage({
        type: "warning",
        message: t('pleaseEnterStickerName')
      })
      return
    }
    const quantity = Number(counter)
    const price = Number(productData?.price)
    const data = {
      id: productData?.id,
      title: productData?.name,
      description: productData?.description,
      counter: quantity,
      price: price,
      image: `${mainUrl}${productData?.image}`,
      extraItem: selectedExtras,
      productNotes: addNote,
      nameOnSticker: rcvrNameOnSticker,
      msgForReceiver: msgForReceiver,
      restaurantId: productData?.restaurant_id,
      categoryId: productData?.category_id,
      restData: productData?.restaurant,
    }
    dispatch(addProductToCart(data))
    navigation.navigate('BasketScreen')
  }



  const giftFun = () => {

    const quantity = Number(counter)
    const price = Number(productData?.price)
    const data = {
      id: productData?.id,
      title: productData?.name,
      description: productData?.description,
      counter: quantity,
      price: price,
      image: `${mainUrl}${productData?.image}`,
      extraItem: selectedExtras,
      productNotes: addNote,
      nameOnSticker: rcvrNameOnSticker,
      msgForReceiver: msgForReceiver,
      restaurantId: productData?.restaurant_id,
      categoryId: productData?.category_id,
    }
    dispatch(addGiftProductToCart(data))

    navigation.navigate('GiftFilterScreen', {
      thirdStepContinue: [1, 2],
    })
  }



  const onPressCheckBox = item => {
    setSelectedExtras((prev) => prev?.includes(item) ? prev?.filter((i) => i != item) : [...prev, item])
  };

  const incrementCounter = () => setCounter(counter + 1);
  const decrementCounter = () => {
    if (counter > 1) setCounter(counter - 1);
  };

  const ExtraDataItems = () => {
    const fomrmatedExtra = productData?.product_extras ? Array.isArray(productData?.product_extras) ? productData?.product_extras : [productData?.product_extras] : []
    return fomrmatedExtra?.map((item, index) => (
      <TouchableOpacity
        key={index}
        style={styles.extraItem}
        onPress={() => onPressCheckBox(item)}
      >
        <CustomText>{item}</CustomText>
        <View
          style={[
            {
              width: 15,
              height: 15,
              borderWidth: 1,
              borderColor: colors.black,
            },
            selectedExtras?.includes(item) && { backgroundColor: colors.primary },
          ]}
        >
          {selectedExtras?.includes(item) && (
            <Feather name={'check'} color={colors.white} size={13} />
          )}
        </View>
      </TouchableOpacity>
    ));
  };
  const handleRandomlySelectMsg = () => {
    const selectIndex = Math.floor(Math.random() * suggestedMessages?.messages?.length);
    setMsgForReceiver(suggestedMessages?.messages[selectIndex]?.message);
  };

  const handleShareLink = async () => {
    try {
      const iosLink = `https://koubak-deeplinking.vercel.app/productDetail/${id}`
      await Share.share({
        message: `Check out this product: ${iosLink}`,
      });
    } catch (error) {
      console.log('error', error)
    }
  }

  return (

    <View style={styles.container}>
        <KeyboardAvoidingView style={{ flex: 1, }} behavior={Platform.OS == 'ios' ? 'padding' : 'height'}    >

      <ScreenView scrollable={true} mh={true} extraBottomSpace={true}>

          <View>

            {/* Image Section */}
            <ImageBackground
              style={styles.productImage}
              // source={require('../assets/productImage.png')}
              source={{ uri: `${mainUrl}${productData?.image}` }}
            >
              <HeaderBox
                style={styles.headerBox}
                search={false}
                notification={false}
                heart={true}
                productData={productData}

              />

              <TouchableOpacity onPress={handleShareLink} style={styles.shareButton}>
                <Ionicons
                  name={'share-social-outline'}
                  color={colors.black}
                  size={25}
                />
              </TouchableOpacity>
            </ImageBackground>

            {/* Filter Button */}
            <View style={styles.contentWrapper}>
              {
                !isGifterPage &&
                <FilterButton
                  setSelectedFilter={setSelectedFilter}
                  selectedFilter={selectedFilter}
                  leftValue={'customizeItem'}
                  rightValue={'customizeSticker'}
                />

              }

              {/* Code after Filer this is customizeItem */}
              {selectedFilter === 'customizeItem' ? (
                <View>
                  <HeaderWithAll
                    title={productData?.name}
                    style={styles.headerTitle}
                  />

                  <View style={styles.priceRow}>
                    <CustomText style={styles.aedText}>
                      {currency}{' '}
                      <CustomText style={styles.priceText}>{productData?.price}</CustomText>
                    </CustomText>
                    {/* 
                <IncrementDecrement
                  pCounter={counter}
                  setCounter={setCounter}
                  onpressPlus={incrementCounter}
                  onpressMinu={decrementCounter}
                /> */}

                    <IncrementDecrement
                      pCounter={counter}
                      setCounter={setCounter}
                      onpressPlus={incrementCounter}
                      onpressMinu={decrementCounter}
                      firstBox={true}
                    />
                  </View>

                  <CustomText style={styles.descriptionLabel}>
                    {t('Descitpion')}
                  </CustomText>
                  <CustomText style={styles.descriptionText}>
                    {productData?.description}
                  </CustomText>

                  <View style={styles.extrasHeader}>
                    <CustomText style={styles.extrasTitle}>
                      {t('extras')}
                    </CustomText>
                    <CustomText style={styles.optionalLabel}>
                      {t('Optional')}
                    </CustomText>
                  </View>

                  <Subtitle style={styles.subtitle}>{t('choseUptoSix')}</Subtitle>

                  <ExtraDataItems />

                  <DividerLine />

                  {!isGifterPage && (
                    <View style={styles.noteBox}>
                      <View style={styles.noteHeader}>
                        <Ionicons
                          name={'chatbox-outline'}
                          size={15}
                          color={colors.black}
                        />
                        <CustomText style={styles.noteLabel}>
                          {t('AddANot')}
                        </CustomText>
                      </View>
                      <TextInput
                        placeholder={t('AnythingElse')}
                        multiline
                        placeholderTextColor={colors.gray1}
                        style={styles.noteInput}
                        value={addNote}
                        onChangeText={setAddNote}
                      />

                    </View>
                  )}
                </View>
              ) : (
                <View>
                  <View style={{ alignItems: 'center', marginTop: 20 }}>
                    <ImageBackground
                      source={require('../assets/bucket.png')}
                      style={{ width: 250, height: 300 }}
                    >
                      <View
                        style={{
                          top: 90,
                          alignSelf: 'center',
                          borderRadius: 7,
                          paddingHorizontal: 5,
                          alignItems: 'center',
                          backgroundColor: colors.white,
                          width: '50%',
                          paddingTop: 10,
                        }}
                      >
                        <CustomText numberOfLines={1} style={{ fontSize: 10 }}>
                          {productData?.restaurant?.name} Shop
                        </CustomText>
                        <CustomText
                          numberOfLines={2}
                          style={{
                            fontSize: 10,
                            fontFamily: fonts.semiBold,
                            marginTop: 10,
                            textAlign: 'center',
                          }}
                        >
                          {msgForReceiver}
                        </CustomText>
                        <CustomText
                          numberOfLines={1}
                          style={{ fontSize: 10, fontFamily: fonts.medium }}
                        >
                          {rcvrNameOnSticker}
                        </CustomText>
                        <CustomText
                          numberOfLines={1}
                          style={{ marginVertical: 10, fontSize: 10 }}
                        >
                          {productData?.name}
                        </CustomText>

                        <CustomText style={{ fontSize: 8 }}>
                          Ready at: 00:00 AM
                        </CustomText>
                        <CustomText style={{ fontSize: 8 }}>
                          Order Number: XXX
                        </CustomText>
                        <CustomText style={{ fontSize: 8 }}>
                          Car Number: XXXXX
                        </CustomText>

                        <CustomText
                          style={{ marginTop: 20, marginBottom: 5, fontSize: 10 }}
                        >
                          Powered by Koubak
                        </CustomText>
                      </View>
                    </ImageBackground>
                  </View>

                  <DividerLine style={styles.stickerDivider} />
                  <CustomInput
                    label={t('nameOnSticker')}
                    placeholder={'Name'}
                    rs={true}
                    value={rcvrNameOnSticker}
                    onChangeText={setRcvrNameOnSticker}
                  />

                  <CustomInput
                    label={t('messageOnSticker')}
                    placeholder={t('messageOnSticker')}
                    rs={true}
                    multiline
                    style={styles.messageInput}
                    inputExtraStyle={styles.messageInputExtra}
                    value={msgForReceiver}
                    onChangeText={setMsgForReceiver}
                  />

                  <TouchableOpacity onPress={handleRandomlySelectMsg} style={styles.refreshRow}>
                    <Ionicons name={'refresh'} size={18} color={colors.black} />
                    <CustomText style={styles.underlineText}>
                      {t('letusChose')}
                    </CustomText>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.selectRow}
                    onPress={() => setModalVisible(true)}
                  >
                    <Ionicons
                      name={'list-outline'}
                      size={18}
                      color={colors.black}
                    />
                    <CustomText style={styles.underlineText}>
                      {t('letSelect')}
                    </CustomText>
                  </TouchableOpacity>

                  <SuggestedMsgsModal
                    setModalVisible={setModalVisible}
                    modalVisible={modalVisible}
                    setSelectedMsg={setMsgForReceiver}
                    data={suggestedMessages?.messages}
                  />
                </View>
              )}

              {/* */}

              {isGifterPage && data?.length > 0 && (
                <View style={{ marginTop: 15 }}>
                  <HeaderWithAll title={t('relatedProduct')} />

                  <ProductDataCard data={relatedData} relatedData={data} />
                </View>
              )}
            </View>
          </View>

      </ScreenView>
        </KeyboardAvoidingView>

      <View style={styles.buttonContainer}>
        <CustomButton
          totalPrice={(productData?.price * counter)?.toFixed(2)}
          title={isGifterPage ? 'continueRcvr' : 'AddToCart'}
          counter={counter}
          // onPress={() => {
          //   isGifterPage
          //     ? navigation.navigate('GiftFilterScreen', {
          //       thirdStepContinue: [1, 2],
          //     })
          //     : navigation.navigate('BasketScreen');
          // }}


          onPress={() => {
            isGifterPage
              ? giftFun()
              : addToCart();
          }}
        />
      </View>
    </View>

  );
};

export default ProductDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  productImage: {
    width: '100%',
    height: 300,
  },
  headerBox: {
    paddingHorizontal: 20,
  },
  shareButton: {
    position: 'absolute',
    bottom: 15,
    right: 20,
  },
  contentWrapper: {
    paddingHorizontal: 20,
    marginVertical: 15,
  },
  headerTitle: {
    width: '70%',
    marginBottom: 5,
    marginTop: 20,
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  aedText: {
    color: colors.gray1,
    fontSize: 17,
  },
  priceText: {
    fontSize: 28,
    fontFamily: fonts.semiBold,
  },
  counterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 10,
    borderColor: colors.gray,
  },
  descriptionLabel: {
    fontFamily: fonts.semiBold,
    marginVertical: 10,
  },
  descriptionText: {
    width: '80%',
    marginBottom: 15,
  },
  extrasHeader: {
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  extrasTitle: {
    fontFamily: fonts.semiBold,
  },
  optionalLabel: {
    backgroundColor: colors.gray5,
    paddingHorizontal: 5,
    borderRadius: 50,
    fontSize: 13,
  },
  subtitle: {
    fontSize: 13,
    marginBottom: 15,
  },
  extraItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  checkbox: {
    borderRadius: 0,
  },
  noteBox: {
    borderWidth: 1,
    height: 140,
    borderColor: colors.gray5,
    padding: 10,
    borderRadius: 10,
    marginTop: 20,
  },
  noteHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  noteLabel: {
    color: colors.black,
  },
  noteInput: {
    color: colors.black,
    height: 100,
    textAlign: I18nManager.isRTL ? 'right' : 'left',
    fontFamily: fonts.regular,
    textAlignVertical: 'top',
  },
  buttonContainer: {
    position: 'absolute',
    width: '90%',
    bottom: 100,
    alignSelf: 'center',
  },
  stickerDivider: {
    marginVertical: 10,
    marginBottom: 20,
  },
  messageInput: {
    height: 100,
  },
  messageInputExtra: {
    height: 90,
  },
  refreshRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
    marginBottom: 10,
    marginTop: 15,
  },
  selectRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
  },
  underlineText: {
    textDecorationLine: 'underline',
  },
});
