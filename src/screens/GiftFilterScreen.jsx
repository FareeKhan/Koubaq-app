import {
  Dimensions,
  FlatList,
  I18nManager,
  Image,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import ScreenView from '../components/ScreenView';
import { giftFilters, ImageBaseUrl, mainUrl, namesData } from '../constants/data';
import HeaderBox from '../components/HeaderBox';
import { useTranslation } from 'react-i18next';
import CustomText from '../components/CustomText';
import Subtitle from '../components/Subtitle';
import { colors } from '../constants/colors';
import HeaderWithAll from '../components/HeaderWithAll';
import ShopsDataCard from '../components/ShopsDataCard';
import ShopDetail from './ShopDetail';
import { fonts } from '../constants/fonts';
const { width, height } = Dimensions.get('screen');
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import CustomButton from '../components/CustomButton';
import CustomInput from '../components/CustomInput';
import SuggestedMsgsModal from '../components/SuggestedMsgsModal';
import CheckoutScreen from './CheckoutScreen';
import CartProducts from '../components/CartProducts';
import { fetchRestaurentList, fetchSuggestedMsgs, fetchTheme } from '../userServices/UserService';
import { addGiftProductToCart } from '../redux/GiftData';
import { useDispatch, useSelector } from 'react-redux';
import ContactPickerModal from '../components/ContactPickerModal';
import SelectedReceiver from '../components/SelectedReceiver';
import { showMessage } from 'react-native-flash-message';
import FastImage from 'react-native-fast-image';
import ScreenLoader from '../components/ScreenLoader';



const GiftFilterScreen = ({ route }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch()
  const giftData = giftFilters(t);
  const { thirdStepContinue } = route?.params || ''
  const resID = useSelector((state) => state?.giftInfo?.giftProduct?.item?.id)
  const giftDataCart = useSelector((state) => state?.giftInfo?.giftProduct)


  const [selectedFilter, setSelectedFilter] = useState(thirdStepContinue ? thirdStepContinue : [1]);
  const [selectedTheme, setSelectedTheme] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedMsg, setSelectedMsg] = useState('');
  const [msg, setMsg] = useState('');
  const [isSelectedShop, setIsSelectedShop] = useState(false)
  const [selectThemeCard, setSelectThemeCard] = useState(false)

  const [selectedContacts, setSelectedContacts] = useState([]);
  const [allThemes, setAllThemes] = useState([]);
  const [allRestaurants, setAllRestaurants] = useState([]);
  const [selectedShop, setSelectedShop] = useState('');
  const [manualNumber, setManualNumber] = useState('');
  const [cardName, setCardName] = useState('');
  const [address, setAddress] = useState('');

  const [isContactPickerModal, setIsContactPickerModal] = useState(false);
  const [isLoader, setIsLoader] = useState(false);
  const [suggestedMessages, setSuggestedMessages] = useState([]);

  useEffect(() => {
    restaurentData()
    loadSuggestedMsgs()
  }, [])


  const restaurentData = async () => {
    setIsLoader(true)
    try {
      const result = await fetchRestaurentList()
      if (result?.success) {
        if (result?.success) {
          const uniqueRestaurants = Array.from(
            new Set(result?.data?.data.map(p => JSON.stringify(p.restaurant)))
          ).map(str => JSON.parse(str));
          setAllRestaurants(uniqueRestaurants)
        }
      }
    } catch (error) {
      console.log('error', error)
    } finally {
      setIsLoader(false)
    }
  }
  const themeArray = async (id) => {
    try {
      const result = await fetchTheme(id)
      console.log('showMeAllThemesdasdasd', result?.data)
      if (result?.success) {
        setAllThemes(result?.data?.themes)
      }
    } catch (error) {
      console.log('error', error)
    }
  }


  const loadSuggestedMsgs = async () => {
    try {
      const result = await fetchSuggestedMsgs(resID)
      if (result?.success) {
        setSuggestedMessages(result?.data)
      }
    } catch (ee) {
      console.log('ee', ee)
    }
  }

  const handleFilterBox = clickedId => {
    const selectedIds = giftData
      .filter(item => item.id <= clickedId)
      .map(item => item.id);
    setSelectedFilter(selectedIds);
  };

  // Content Data Here
  const HorizontalFilterBox = () => {
    return (
      <View style={styles.filterBoxContainer}>
        {giftData?.map((item, index) => {
          const isSelected = selectedFilter.includes(item?.id);
          return (
            <View key={index} style={styles.filterItemContainer}>
              <TouchableOpacity onPress={() => handleFilterBox(item?.id)}>
                <View
                  style={[
                    styles.filterBox,
                    isSelected && styles.filterBoxSelected,
                  ]}
                >
                  {item?.icon}
                </View>
                <Subtitle style={styles.filterSubtitle}>{item?.title}</Subtitle>
              </TouchableOpacity>
              {giftData?.length - 1 !== index && (
                <View style={styles.filterSeparator} />
              )}
            </View>
          );
        })}
      </View>
    );
  };

  // const SelectedReceiver = () => {
  //   return (
  //     <View>
  //       {/* Selected Users */}
  //       <View style={styles.namesContainer}>
  //         {namesData?.map((item, index) => {
  //           return (
  //             <View style={styles.nameItem} key={index}>
  //               <View
  //                 style={[styles.outerCircle, { borderColor: item?.color }]}
  //               >
  //                 <View
  //                   style={[
  //                     styles.innerCircle,
  //                     {
  //                       backgroundColor: item?.color,
  //                       borderColor: item?.color,
  //                     },
  //                   ]}
  //                 >
  //                   <CustomText style={styles.initialText}>
  //                     {item?.title?.charAt(0)?.toUpperCase()}
  //                   </CustomText>
  //                 </View>

  //                 <TouchableOpacity style={styles.minusButton}>
  //                   <AntDesign
  //                     name="minus"
  //                     size={15}
  //                     style={styles.minusIcon}
  //                     color={colors.white}
  //                   />
  //                 </TouchableOpacity>
  //               </View>
  //               <CustomText style={styles.nameText}>{item?.title}</CustomText>
  //             </View>
  //           );
  //         })}
  //       </View>

  //       <TouchableOpacity
  //         style={{
  //           flexDirection: 'row',
  //           alignItems: 'center',
  //           marginTop: 20,
  //           paddingHorizontal: 12,
  //           gap: 15,
  //           borderWidth: 1,
  //           borderColor: colors.primary2,
  //           paddingVertical: 10,
  //           borderRadius: 10,
  //         }}

  //       >
  //         <MaterialIcons name={'contacts'} size={20} color={colors.primary} />
  //         <CustomText style={{ fontFamily: fonts.medium }}>
  //           {t('selectFromContacts')}
  //         </CustomText>
  //         <Entypo
  //           name={
  //             I18nManager.isRTL ? 'chevron-small-left' : 'chevron-small-right'
  //           }
  //           size={24}
  //           color={colors.black}
  //           style={{ marginLeft: 'auto' }}
  //         />
  //       </TouchableOpacity>

  //       <HeaderWithAll title={t('typePhone')} style={{ marginTop: 12 }} />

  //       <TouchableOpacity
  //         style={{
  //           flexDirection: 'row',
  //           alignItems: 'center',
  //           marginTop: -5,
  //           paddingHorizontal: 12,
  //           gap: 15,
  //           borderColor: colors.primary2,
  //           paddingVertical: 12,
  //           borderRadius: 10,
  //           backgroundColor: colors.primary1,
  //         }}
  //       >
  //         <FontAwesome5 name={'mobile'} size={20} color={colors.primary} />
  //         <CustomText style={{ fontFamily: fonts.medium }}>
  //           {t('addNewNumber')}
  //         </CustomText>
  //         <Entypo
  //           name={
  //             I18nManager.isRTL ? 'chevron-small-left' : 'chevron-small-right'
  //           }
  //           size={24}
  //           color={colors.black}
  //           style={{ marginLeft: 'auto' }}
  //         />
  //       </TouchableOpacity>
  //     </View>
  //   );
  // };
  const handleThemeContinueBtn = () => {
    setSelectThemeCard(true)
    dispatch(addGiftProductToCart({ selectedTheme }))
  }
  const SelectCard = () => {
    return (
      <View>
        <HeaderWithAll title={t('selectTheme')} style={{ marginTop: 30 }} />
        <FlatList
          data={allThemes}
          keyExtractor={(item, index) => index?.toString()}
          numColumns={2}
          columnWrapperStyle={{ justifyContent: "space-between" }}
          contentContainerStyle={{ gap: 20, paddingBottom: 100 }}
          showsVerticalScrollIndicator={false}
          renderItem={renderItem}
          scrollEnabled={false}
        />


        <View style={{ flex: 1, justifyContent: "flex-end", bottom: 50 }}>
          <CustomButton title={t('continue')}
            onPress={() => handleThemeContinueBtn()}

          />


        </View>
      </View>
    )
  }

  const renderItem = ({ item, index }) => {

    const cleanUrl = `${mainUrl.replace(/\/+$/, '')}/${item?.image.replace(/^\/+/, '')}`;
    console.log('cleanUrlcleanUrl', cleanUrl)
    return (
      <TouchableOpacity
        onPress={() => setSelectedTheme(item)}
        key={index}
        style={[{
          backgroundColor: colors.white,
          width: '48%',
          borderRadius: 10,
          // borderWidth: 2,
          // height: 200,
          borderColor: colors.primary,
          paddingHorizontal: 10,
          paddingTop: 10,
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 3,
          },
          shadowOpacity: 0.2,
          shadowRadius: 4.65,
          backgroundColor: colors.white,
          elevation: 6,
          marginHorizontal:5,
          marginTop:5,
          paddingBottom:30
        },selectedTheme?.id == item?.id && {borderWidth: 2,}]}
      >

        <FastImage
          source={{ uri: cleanUrl }}
          style={{
            width: "100%",
            height: height / 7,

            //  width,height
            // backgroundColor: colors.primary2,
            // borderTopLeftRadius: 20,
            // borderTopRightRadius: 20,
            borderRadius: 10

          }}
        // resizeMode='contain'
        />
        {/* <CustomText
          style={{
            textAlign: 'center',
            marginTop: 12,
            fontFamily: fonts.semiBold,
            fontSize: 15,
            color: colors.primary,
          }}
        >
          {item?.name}
        </CustomText> */}

        {/* {selectedTheme?.id == item?.id && (
          <View style={{ position: 'absolute', right: 10, top: 10 }}>
            <MaterialIcons
              name={'check-box'}
              size={30}
              color={colors.primary}
            />
          </View>
        )} */}
      </TouchableOpacity>
    );
  };

  const handleRestaurent = (item) => {
    setSelectedShop(item?.id)
    setIsSelectedShop(true)
    dispatch(addGiftProductToCart({ item }))
  }
  const lastStep =
    selectedFilter.length > 0
      ? selectedFilter[selectedFilter.length - 1]
      : null;

  return (
    <ScreenView scrollable={true} >
      <HeaderBox logo={true} search={false}
        {...(isSelectedShop && { onPressBack: () => setIsSelectedShop(false) })}
        {...(selectThemeCard && { onPressBack: () => setSelectThemeCard(false) })}
      />

      <HorizontalFilterBox />

      {/* ***** Shop Card Data ****** */}
      {lastStep == 1 && (
        <>
          {
            isSelectedShop ?
              <View style={{ marginTop: 15, marginHorizontal: -20 }}>
                <ShopDetail
                  isHeader={false}
                  isGifterPage={true}
                  hideArrow={true}
                  selectedShopId={selectedShop}
                />
              </View>
              :
              <>
                {
                  isLoader ?
                    <ScreenLoader />
                    :
                    <>
                      <HeaderWithAll title={t('selectShop')} style={{ marginTop: 30 }} />
                      <ShopsDataCard
                        data={allRestaurants}
                        onPress={(item) => handleRestaurent(item)}
                        isRadius={true}
                      />
                    </>

                }

              </>
          }
        </>
      )}

      {lastStep == 2 && (
        <>
          <HeaderWithAll
            title={t('selectedReceiver')}
            style={{ marginTop: 30 }}
            search
          />

          <SelectedReceiver
            selectedContacts={selectedContacts}
            setSelectedContacts={setSelectedContacts}
            manualNumber={manualNumber}
            setManualNumber={setManualNumber}
            setIsContactPickerModal={setIsContactPickerModal}
          />


          <View
            style={{ flexGrow: 1, justifyContent: 'flex-end', marginTop: 30 }}
          >
            <CustomButton title={t('continueTheme')}
              onPress={() => {
                if (selectedContacts?.length == 0) {
                  showMessage({
                    type: "danger",
                    message: t('PleaseAddContact')
                  })
                  return
                }
                dispatch(addGiftProductToCart({ selectedContacts }))
                themeArray(resID)
                setSelectedFilter([1, 2, 3])
              }}

            />
          </View>
        </>
      )}
      {console.log('selectThemeCardselectThemeCard', selectedTheme)}
      {
        lastStep == 3 && (
          <>
            {
              selectThemeCard ?

                <View>
                  <HeaderWithAll title={t('cardPreview')} style={{ marginTop: 30 }} />

                  <ImageBackground
                    source={{ uri: `${ImageBaseUrl}${selectedTheme?.image}` }}
                    style={{
                      backgroundColor: colors.secondary,
                      height: 220,
                      width: Dimensions.get('screen').width - 40,
                      overflow: "hidden",
                      borderRadius: 10,
                      borderBottomLeftRadius: 0,
                      padding: 30,
                    }}
                  >
                    <CustomText
                      style={{ color: colors.primary, fontFamily: fonts.medium }}
                    >
                      {t('yourGift')}
                    </CustomText>
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 3 }}>
                      <CustomText
                        style={{
                          color: colors.primary,
                          fontFamily: fonts.bold,
                          fontSize: 15,
                        }}
                      >
                        {giftDataCart?.counter} {giftDataCart?.counter > 1 ? 'items' : 'item'} from
                      </CustomText>
                      <CustomText
                        style={{ color: colors.primary, fontFamily: fonts.medium }}
                      >
                        {giftDataCart?.item?.name}
                      </CustomText>
                    </View>
                  </ImageBackground>

                  <HeaderWithAll
                    title={t('recptName')}
                    style={{ marginTop: 30, marginBottom: 5 }}
                  />
                  <CustomText style={{ marginBottom: 10 }}>{t('shownCard')}</CustomText>

                  <CustomInput
                    placeholder={t('recptName')}
                    rs={true}
                    style={{
                      backgroundColor: colors.secondary,
                    }}
                    name={cardName}
                    onChangeText={setCardName}
                  />
                  {/* <HeaderWithAll
                    title={t('recptAddress')}
                    style={{ marginBottom: 5 }}
                  />
                  <CustomInput
                    placeholder={t('recptAddress')}
                    rs={true}
                    style={{
                      backgroundColor: colors.secondary,
                    }}
                    name={address}
                    onChangeText={setAddress}
                  /> */}

                  <HeaderWithAll title={t('addAMessage')} style={{ marginBottom: 6 }} />
                  <CustomInput
                    placeholder={'haveAGoodDay'}
                    rs={true}
                    multiline
                    style={{
                      backgroundColor: colors.secondary,
                      borderWidth: 0,
                      borderBottomWidth: 0,
                    }}
                    inputExtraStyle={{ height: 140, verticalAlign: "top", paddingTop: 15 }}
                    value={selectedMsg}
                    onChangeText={setSelectedMsg}
                  />

                  <TouchableOpacity
                    onPress={() => setModalVisible(true)}
                    style={{
                      backgroundColor: colors.secondary,
                      paddingVertical: 10,
                      paddingHorizontal: 20,
                      borderRadius: 10,
                      marginTop: 15,
                      marginBottom: 30,
                    }}
                  >
                    <CustomText style={{ fontFamily: fonts.medium }} >
                      {t('suggestedMessages')}
                    </CustomText>
                    <Subtitle style={{ fontSize: 14 }}>{t('selectAmessage')}</Subtitle>
                  </TouchableOpacity>

                  <CustomButton title={t('continuePayment')}
                    // onPress={() => setSelectedFilter([1, 2, 3, 4])}

                    onPress={() => {
                      if (cardName == '') {
                        showMessage({
                          type: "warning",
                          message: t('enterReceiptName')
                        })
                        return
                      }
                      dispatch(addGiftProductToCart({ cardName, address, selectedMsg }))
                      setSelectedFilter([1, 2, 3, 4])
                    }}

                  />

                </View>
                :

                <SelectCard />

            }

          </>
        )

      }


      {
        lastStep == 4 && (
          <View style={{ marginHorizontal: -20 }}>
            <CartProducts />

            <Image source={require('../assets/giftCard.png')} style={{ width: "91%", marginTop: 20, alignSelf: "center" }} borderRadius={10} />
            <CheckoutScreen
              isHeader={false}

            />


          </View>
        )

      }


      <SuggestedMsgsModal
        setModalVisible={setModalVisible}
        modalVisible={modalVisible}
        setSelectedMsg={setSelectedMsg}
        data={suggestedMessages?.messages}
      />

      <ContactPickerModal
        setContactModal={setIsContactPickerModal}
        contactModal={isContactPickerModal}
        setSelectedContacts={setSelectedContacts}
        selectedContacts={selectedContacts}

      />
    </ScreenView>
  );
};

export default GiftFilterScreen;

const styles = StyleSheet.create({
  filterBoxContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 30,
  },
  filterItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  filterBox: {
    width: 45,
    height: 44,
    backgroundColor: colors.primary2,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50
  },
  filterBoxSelected: {
    backgroundColor: colors.primary,
  },
  filterSubtitle: {
    textAlign: 'center',
    marginTop: 5,
    fontSize: 11,
  },
  filterSeparator: {
    width: width / 6.6,
    height: 2,
    backgroundColor: colors.primary1,
    top: -10,
  },
  namesContainer: {
    flexDirection: 'row',
    gap: 15,
  },
  nameItem: {
    alignItems: 'center',
  },
  outerCircle: {
    marginTop: -5,
    borderWidth: 1,
    width: 50,
    height: 50,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  innerCircle: {
    borderWidth: 1,
    width: 42,
    height: 42,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  initialText: {
    fontSize: 18,
    fontFamily: fonts.medium,
  },
  minusButton: {
    position: 'absolute',
    backgroundColor: 'red',
    width: 15,
    height: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
    top: -3,
    right: 0,
  },
  minusIcon: {
    top: -3,
  },
  nameText: {
    marginTop: 5,
    fontSize: 11,
  },
});
