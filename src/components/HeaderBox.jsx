import {
  I18nManager,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { memo, useCallback, useState } from 'react';
import EvilIcons from 'react-native-vector-icons/EvilIcons';

import CustomText from './CustomText';
import { fonts } from '../constants/fonts';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useTranslation } from 'react-i18next';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { colors } from '../constants/colors';
import { Countries } from '../constants/data';
import CustomModal from './CustomModal';
import DividerLine from './DividerLine';
import RNRestart from 'react-native-restart';
import { language } from '../redux/Auth';
import { productFavorite, removeFavorite } from '../redux/AddFavorite';
import { unReadMsgs } from '../userServices/UserService';

const HeaderBox = ({
  logo,
  title,
  style,
  replaceBack,
  rightIcon = true,
  isBack = true,
  search = true,
  notification = true,
  heart,
  onPressBack,
  productData,
  onPressSearch,
  isShowNotNmbr

}) => {
  const { t } = useTranslation();
  const isLanguage = useSelector(state => state.auth?.isLanguage);
  const favoriteData = useSelector((state) => state?.favorite?.AddInFavorite)
  const token = useSelector((state) => state?.auth?.loginData?.token)
  const dispatch = useDispatch()

  const productInCart = [];
  const navigation = useNavigation()
  const [modalVisible, setModalVisible] = useState(false);
  const [notificationCounter, setNotificationCounter] = useState('');
  const [selectedCountry, setSelectCountry] = useState(Countries?.find((item) => item?.code == isLanguage));


  const isCheckData = favoriteData?.some((state) => state?.id == productData?.id)
  const handleTranslation = () => {
    const isSelectedLanguage = isLanguage == 'en' ? 'ar' : 'en';
    dispatch(language({ isSelectedLanguage }));

    I18nManager.allowRTL(isSelectedLanguage !== 'en');
    I18nManager.forceRTL(isSelectedLanguage !== 'en');

    setTimeout(() => {
      RNRestart.Restart();
    }, 1500);
  };

  useFocusEffect(useCallback(() => {
    fetchNotification()
  }, []))

  const fetchNotification = async (value) => {
    try {
      const response = await unReadMsgs(token)
      if (response?.success && response?.unread_count !== notificationCounter) {
        setNotificationCounter(response?.unread_count)
      }
    } catch (error) {
      console.log('error', error)
    }
  }


  const handleFavorite = useCallback(() => {
    if (isCheckData) {
      dispatch(removeFavorite({ id: productData?.id }))
    } else {
      dispatch(productFavorite({
        id: productData?.id,
        image: productData?.image,
        price: productData?.price,
        title: productData?.name,
        description: productData?.description,
        restID: productData?.restaurant_id
      }))
    }

  }, [isCheckData, productData])

  return (
    <View
      style={[styles.container, style, logo && !isBack && styles.extraStyle]}
    >
      {isBack && replaceBack ? (
        <TouchableOpacity
          style={{ flexDirection: 'row', alignItems: 'center' }}
          onPress={() => setModalVisible(true)}
        >
          <Image
            source={{ uri: selectedCountry?.flag }}
            style={{ width: 30, height: 18 }}
          />
          <Ionicons name={'chevron-down'} color={colors.black} size={20} />
        </TouchableOpacity>
      ) : (
        isBack &&
        <TouchableOpacity onPress={onPressBack ? onPressBack : () => navigation.goBack()}>
          <Ionicons
            name={I18nManager.isRTL ? 'arrow-forward-sharp' : 'arrow-back-sharp'}
            color={colors.black}
            size={22}
          />


        </TouchableOpacity>

      )}

      {logo ? (
        // <Image source={require('../assets/logo.png')} style={[styles.imgStyle,isBack && {height:33,width:90}]} />
        <Image
          source={require('../assets/logo.png')}
          style={[styles.imgStyle, isBack && { height: 33, width: 80 }]}
        />
      ) : (
        <CustomText
          style={{
            fontFamily: fonts.semiBold,
            fontSize: 16,
            color: colors.black5,
          }}
        >
          {t(title)}
        </CustomText>
      )}
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
        {search && (
          <TouchableOpacity
            hitSlop={{ top: 7, bottom: 7, left: 7, right: 7 }}
            onPress={() => onPressSearch()}
          >
            <EvilIcons name={'search'} size={25} color={colors.black} />
          </TouchableOpacity>
        )}
        {notification && (
          <TouchableOpacity
            hitSlop={{ top: 7, bottom: 7, left: 7, right: 7 }}
            onPress={() => navigation.navigate('NotificationScreen')}
          >
            <Fontisto name={'bell-alt'} size={18} color={colors.primary} />
            {notificationCounter > 0 && (
              <View style={styles.counterNumber}>
                <CustomText style={{ color: colors.primary, fontSize: 10 }}>
                  {notificationCounter}
                </CustomText>
              </View>
            )}
          </TouchableOpacity>
        )}

        {
          heart &&
          <TouchableOpacity
            hitSlop={{ top: 7, bottom: 7, left: 7, right: 7 }}
            // onPress={() => setIsHeart(!isHeart)}
            onPress={() => handleFavorite()}
          >
            <FontAwesome name={isCheckData ? 'heart' : 'heart-o'} size={18} color={isCheckData ? colors.red : colors.black} />

          </TouchableOpacity>
        }
      </View>

      {/* Country Selection modal  */}
      <CustomModal
        setModalVisible={setModalVisible}
        modalVisible={modalVisible}
        title={t('selectLanguage')}
      >
        <View style={{ paddingBottom: 70 }}>

          {Countries?.map((item, index) => {
            return (
              <View
                key={index}
                style={{ paddingBottom: 10 }}
              >
                <TouchableOpacity
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 10,
                    borderBottomWidth: 1,
                    borderColor: colors.gray5,
                    paddingBottom: 10
                  }}
                  onPress={() => {
                    setSelectCountry(item),
                      handleTranslation()
                      , setModalVisible(false);
                  }}
                >
                  <Image
                    source={{ uri: item?.flag }}
                    style={{ width: 60, height: 30 }}
                  />
                  <CustomText>{item?.name}</CustomText>

                </TouchableOpacity>

              </View>
            );
          })}
        </View>
      </CustomModal>
    </View>
  );
};

export default memo(HeaderBox)
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  extraStyle: {
    width: '60%',
    alignSelf: 'flex-end',
  },
  imgStyle: {
    // width:185,
    // height: 46,
    height: 33,
    width: 80,
  },
  counterNumber: {
    zIndex: 100,
    position: 'absolute',
    top: -10,
    borderColor: colors.primary,
    left: -7,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderRadius: 50,
    width: 15,
    height: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
