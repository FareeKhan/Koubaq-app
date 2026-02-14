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
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useTranslation } from 'react-i18next';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { colors } from '../constants/colors';
import { Countries } from '../constants/data';
import CustomModal from './CustomModal';
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
  isShowNotNmbr = true
}) => {
  const { t } = useTranslation();
  const isLanguage = useSelector(state => state.auth?.isLanguage);
  const favoriteData = useSelector((state) => state?.favorite?.AddInFavorite)
  const token = useSelector((state) => state?.auth?.loginData?.token)
  const dispatch = useDispatch()
  const navigation = useNavigation()

  const [modalVisible, setModalVisible] = useState(false);
  const [notificationCounter, setNotificationCounter] = useState('');
  const [selectedCountry, setSelectCountry] = useState(
    Countries?.find((item) => item?.code == isLanguage)
  );

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

  const fetchNotification = async () => {
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
    <View style={[styles.container, style, logo && !isBack && styles.extraStyle]}>
      {isBack && replaceBack ? (
        <TouchableOpacity style={styles.langSelector} onPress={() => setModalVisible(true)}>
          <Image source={{ uri: selectedCountry?.flag }} style={styles.flagSmall} />
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
        <Image
          source={require('../assets/logo.png')}
          style={[styles.imgStyle, isBack && styles.imgBackSize]}
        />
      ) : (
        <CustomText style={styles.titleText}>{t(title)}</CustomText>
      )}

      <View style={styles.rightIcons}>
        {search && (
          <TouchableOpacity hitSlop={styles.hitSlopSearch} onPress={() => onPressSearch()}>
            <View style={styles.iconCircle}>
              <EvilIcons name={'search'} size={25} color={colors.black} />
            </View>
          </TouchableOpacity>
        )}

        {notification && (
          <TouchableOpacity
            hitSlop={styles.hitSlop}
            onPress={() => navigation.navigate('NotificationScreen')}
          >
            <View style={styles.iconCircle}>
              <FontAwesome name={'bell-o'} size={18} color={colors.black} />
            </View>
            {notificationCounter > 0 && isShowNotNmbr && (
              <View style={styles.counterNumber}>
                <CustomText style={styles.counterText}>
                  {notificationCounter}
                </CustomText>
              </View>
            )}
          </TouchableOpacity>
        )}

        {heart && (
          <TouchableOpacity hitSlop={styles.hitSlop} onPress={handleFavorite}>
            <View style={styles.iconCircle}>
              <FontAwesome
                name={isCheckData ? 'heart' : 'heart-o'}
                size={18}
                color={isCheckData ? colors.red : colors.black}
              />
            </View>
          </TouchableOpacity>
        )}
      </View>

      <CustomModal
        setModalVisible={setModalVisible}
        modalVisible={modalVisible}
        title={t('selectLanguage')}
      >
        <View style={styles.modalContent}>
          {Countries?.map((item, index) => (
            <View key={index} style={styles.countryItemWrapper}>
              <TouchableOpacity
                style={styles.countryItem}
                onPress={() => {
                  setSelectCountry(item)
                  handleTranslation()
                  setModalVisible(false)
                }}
              >
                <Image source={{ uri: item?.flag }} style={styles.flagLarge} />
                <CustomText>{item?.name}</CustomText>
              </TouchableOpacity>
            </View>
          ))}
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
    height: 33,
    width: 80,
  },
  imgBackSize: {
    height: 33,
    width: 80,
  },
  titleText: {
    fontFamily: fonts.semiBold,
    fontSize: 16,
    color: colors.black5,
  },
  rightIcons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  iconCircle: {
    width: 35,
    height: 35,
    backgroundColor: colors.gray5,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
  },
  hitSlop: { top: 7, bottom: 7, left: 7, right: 7 },
  hitSlopSearch: {
    top: 7,
    bottom: 7,
    left: 7,
    right: 7,
    backgroundColor: 'red',
    width: 100,
    height: 100,
    zIndex: -100,
    position: 'absolute',
  },
  counterNumber: {
    zIndex: 100,
    position: 'absolute',
    top: -10,
    left: -7,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: colors.primary,
    borderRadius: 50,
    width: 15,
    height: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  counterText: {
    color: colors.primary,
    fontSize: 10,
  },
  langSelector: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  flagSmall: {
    width: 30,
    height: 18,
  },
  flagLarge: {
    width: 60,
    height: 30,
  },
  modalContent: {
    paddingBottom: 70,
  },
  countryItemWrapper: {
    paddingBottom: 10,
  },
  countryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    borderBottomWidth: 1,
    borderColor: colors.gray5,
    paddingBottom: 10,
  },
});
