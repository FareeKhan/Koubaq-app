import {
  FlatList,
  I18nManager,
  StyleSheet,
  TouchableOpacity,
  View,
  Dimensions,
} from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import ScreenView from '../components/ScreenView';
import CustomText from '../components/CustomText';
import Subtitle from '../components/Subtitle';
import { colors } from '../constants/colors';
import { fonts } from '../constants/fonts';
import Ionicons from 'react-native-vector-icons/Ionicons';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import DividerLine from '../components/DividerLine';
import { useTranslation } from 'react-i18next';

import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { language, logout } from '../redux/Auth';
import RNRestart from 'react-native-restart';
import { carLogoJson } from '../constants/carData';
import { storeCarData } from '../redux/storeAddedCar';
import { showMessage } from 'react-native-flash-message';
import { addVehicle, deleteProfile, fetchProfile, } from '../userServices/UserService';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import AddBrandedCar from '../components/AddBrandedCar';
import ProfileModal from '../components/ProfileModal';
import RemoteImage from '../components/RemoteImage';
import { mainUrl } from '../constants/data';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import LanguageChangeModal from '../components/LanguageChangeModal';

const { height, } = Dimensions.get('screen');

const AccountSetting = () => {
  const isLanguage = useSelector(state => state.auth?.isLanguage);
  const token = useSelector((state) => state?.auth?.loginData?.token)
  const userData = useSelector((state) => state?.auth?.loginData)
  const userId = useSelector((state) => state?.auth?.loginData?.id)

  const dispatch = useDispatch();
  const { t } = useTranslation();
  const navigation = useNavigation();

  const [carCategory, setCarCategory] = useState('');
  const [selectedCar, setSelectedCar] = useState('');
  const [plateNo, setPlateNo] = useState('');
  const [searchCar, setSearchCar] = useState('');
  const [userProfileData, setUserProfileData] = useState('');
  const [selectedCarId, setSelectedCarId] = useState('')
  const [isProfileModal, setIsProfileModal] = useState(false)
  const [selectedCarInfo, setSelectedCarInfo] = useState('')
  const [modalVisible, setModalVisible] = useState(false);

  // useFocusEffect(
  //   useCallback(() => {
  //     loadAddedVechicle();
  //   }, [])
  // );
  useEffect(() => {
    getUserProfile()
  }, [])


  const getUserProfile = useCallback(async () => {
    try {
      const response = await fetchProfile(token);
      if (response?.success) {
        setUserProfileData(response.data);
      }
    } catch (error) {
      console.log('Vehicle Error', error);
    }
  }, []);


  const IconMenu = ({ onpress, icon, label, red }) => {
    return (
      <TouchableOpacity style={styles.iconMenu} onPress={onpress}>
        {icon}
        <CustomText style={[{fontSize:16,fontFamily:fonts.medium},red && styles.redText]}>{t(label)}</CustomText>
      </TouchableOpacity>
    );
  };

  const handleCarSelection = item => {
    setSelectedCar(item);
    setIsCarModal(false);
  };

  const handleTranslation = () => {
    const isSelectedLanguage = isLanguage == 'en' ? 'ar' : 'en';
    dispatch(language({ isSelectedLanguage }));

    I18nManager.allowRTL(isSelectedLanguage !== 'en');
    I18nManager.forceRTL(isSelectedLanguage !== 'en');

    setTimeout(() => {
      RNRestart.Restart();
    }, 1500);
  };

  const filterSearch = searchCar
    ? carLogoJson?.filter(item =>
      item?.name?.toLowerCase()?.includes(searchCar.toLowerCase()),
    )
    : carLogoJson;


  const handleLogout = (text) => {

    if (!userId) {
      navigation.replace('LoginScreen')
      return
    } else {
      if (text == 'delete') {
        showMessage({
          type: "success",
          message: t('deleteSuccessAccount')
        })

      }
      dispatch(logout())
      navigation.replace('LoginScreen')
    }


  }

  const handleDeleteProfileImage = async () => {
    try {
      const response = await deleteProfile(token)
      if (response?.success) {
        getUserProfile()
        showMessage({
          type: "success",
          message: t('deletedSuccessfully')
        })
      }
      console.log('dasdas', response)
    } catch (error) {
      console.log('error', error)
    }
  }


  return (
    <View style={{ flex: 1 }}>

      <ScreenView scrollable={true} mh={true}>
        {/* Header Profile Data */}
        <View style={styles.headerRow}>
          <TouchableOpacity onPress={() => setIsProfileModal(true)} style={styles.headerProfile}>
            <View style={styles.profileIcon}>
              {
                userProfileData?.profile_image ?
                  <View >
                    <RemoteImage uri={`${mainUrl}${userProfileData?.profile_image}`} style={{ width: 50, height: 50, borderRadius: 50 }} />
                    <TouchableOpacity onPress={() => handleDeleteProfileImage()} style={{ position: "absolute", zIndex: 100, borderWidth: 1, bottom: -3, borderColor: "#000", right: 2, backgroundColor: "#fff", borderRadius: 50, padding: 2 }}>
                      <MaterialIcons name={'delete'} size={15} color={colors.red} />
                    </TouchableOpacity>
                  </View>
                  :
                  <FontAwesome name={'user-o'} size={20} color={colors.black} />
              }
            </View>
            <View>
              <Subtitle style={styles.subtitleSmall}>{userData?.phoneNo || t('PleaseLogin')}</Subtitle>
              {
                userProfileData?.name &&
                <Subtitle style={[styles.subtitleSmall, { left: 5 }]}>{userProfileData?.name}</Subtitle>
              }
            </View>
          </TouchableOpacity>

          {/* <TouchableOpacity onPress={() => setIsAddNewCar(!isAddNewCar)}>
          <Ionicons name={'car-sport-outline'} size={25} color={colors.black} />
          <Entypo
            name={'plus'}
            size={12}
            color={colors.black}
            style={styles.plusIcon}
          />
        </TouchableOpacity> */}
        </View>


        <DividerLine h={true} borderStyle={styles.dividerHeight7} />
        {userId &&
          <>
            <AddBrandedCar
              style={{ paddingHorizontal: 20, paddingTop: 10 }}
              setSelectedCarId={setSelectedCarId}
              selectedCarId={selectedCarId}
              setSelectedCarInfo={setSelectedCarInfo}

            />

            <DividerLine
              h={true}
              borderStyle={styles.dividerHeight7}
              style={styles.mb20}
            />

            {/* Menu Items */}
            <IconMenu
              onpress={() => navigation.navigate('OrderScreens')}
              label={'yourOrders'}
              icon={<Feather name={'calendar'} size={22} color={colors.black} />}
            />
            <IconMenu
              onpress={() => navigation.navigate('FavoriteScreen')}
              label={'favorite'}
              icon={<Feather name={'heart'} size={22} color={colors.black} />}
            />

          </>

        }


        {/* <IconMenu
        label={'termsCondition'}
        icon={<EvilIcons name={'calendar'} size={25} color={colors.black} />}
      />
      <IconMenu
        label={'privacyPolicy'}
        icon={<EvilIcons name={'calendar'} size={25} color={colors.black} />}
      />
      <IconMenu
        onpress={handleTranslation}
        label={'switchLanguage'}
        icon={
          <Ionicons name={'language-outline'} size={22} color={colors.black} />
        }
      />
      <IconMenu
        label={'getHelp'}
        icon={<Feather name={'help-circle'} size={20} color={colors.black} />}
      />
      <IconMenu
        label={'aboutApp'}
        icon={
          <Ionicons
            name={'information-circle-outline'}
            size={24}
            color={colors.black}
          />
        }
      />
      <IconMenu
        label={'instagram'}
        icon={
          <Ionicons name={'logo-instagram'} size={22} color={colors.black} />
        }
      /> */}
      <View style={{flexDirection:"row",alignItems:"center",justifyContent:"space-between",marginRight:20}}>
          <IconMenu
          label={"language"}
          icon={<Ionicons name={"language-outline"} size={22} color={colors.black} />}
          onpress={() => setModalVisible(true)}
        />

        <CustomText>{isLanguage}</CustomText>
      </View>


        <IconMenu
          label={userId ? 'logout' : "login"}
          icon={<AntDesign name={userId ? 'logout' : "login"} size={22} color={colors.red} />}
          red={true}
          onpress={() => handleLogout()}
        />


        {
          userId &&
          <TouchableOpacity onPress={() => handleLogout('delete')} style={styles.deleteAccountBtn}>
            <CustomText style={styles.deleteAccountTxt}>
              {t('deleteAccount')}
            </CustomText>
          </TouchableOpacity>

        }


      </ScreenView>
      <ProfileModal userProfileData={userProfileData} setIsProfileModal={setIsProfileModal} isProfileModal={isProfileModal} getUserProfile={getUserProfile} />


      <LanguageChangeModal
        setModalVisible={setModalVisible}
        modalVisible={modalVisible}
      />

    </View>
  );
};

export default AccountSetting;

const styles = StyleSheet.create({
  iconMenu: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginHorizontal: 20,
    paddingVertical: 10,
  },
  redText: {
    color: colors.red,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginRight: 10,
    paddingHorizontal: 20,
    marginBottom: 15,
    paddingTop: 20,
  },
  headerProfile: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  profileIcon: {
    width: 40,
    height: 40,
    borderRadius: 50,
    backgroundColor: colors.secondary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileInitial: {
    fontSize: 16,
    fontFamily: fonts.medium,
  },
  subtitleSmall: {
    fontSize: 11,
    marginVertical: 2,
    color: colors.gray3,
  },
  subtitleSmall2: {
    fontSize: 10,
    color: colors.gray3,
  },
  plusIcon: {
    top: -30,
    right: -20,
  },
  dividerHeight7: {
    height: 7,
  },
  carsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 13,
    paddingTop: 15,
    paddingHorizontal: 20,
  },
  addCarContainer: {
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  addCarRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  vehicleBrand: {
    fontSize: 15,
    color: colors.primary,
  },
  selectCarBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
  },
  selectCarText: {
    fontSize: 15,
    color: colors.gray1,
    textTransform: 'capitalize',
  },
  inputRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  inputField: {
    height: 45,
    fontFamily: fonts.regular,
    textAlign: I18nManager.isRTL ? 'right' : 'left',
    color: colors.black,
    borderBottomWidth: 1.5,
    width: '48%',
    borderColor: colors.gray,
    paddingBottom: 5,
  },
  addBtn: {
    height: 27,
    width: '25%',
    borderRadius: 50,
    alignSelf: 'center',
  },
  addBtnTxt: {
    fontSize: 12,
  },
  carDetailsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 15,
    gap: 30,
  },
  carImage: {
    width: 50,
    height: 40,
  },
  carInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 0.5 },
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 4,
    shadowOpacity: 0.29,
    shadowRadius: 1.65,
    backgroundColor: colors.white,
    elevation: 7,
    gap: 15,
  },
  carCategory: {
    fontFamily: fonts.bold,
    fontSize: 16,
  },
  plateNo: {
    fontFamily: fonts.semiBold,
    fontSize: 16,
  },
  deleteIconContainer: {
    left: 10,
  },
  noCarsContainer: {
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  noCarsText: {
    marginVertical: 8,
    fontSize: 12,
    textAlign: 'center',
    color: colors.gray1,
  },
  addNewCarBtn: {
    width: '27%',
    height: 30,
    borderRadius: 50,
    marginLeft: 'auto',
  },
  addNewCarTxt: {
    fontSize: 12,
  },
  mb20: {
    marginBottom: 20,
  },
  deleteAccountBtn: {
    marginTop: 25,
    marginHorizontal: 20,
    marginLeft: 'auto',
  },
  deleteAccountTxt: {
    fontSize: 13,
    color: colors.red,
  },
  modalTitle: {
    color: colors.primary,
    marginBottom: 10,
    textAlign: 'center',
  },
  modalList: {
    paddingBottom: 100,
  },
  modalListHeight: {
    height: height / 1.3,
  },
  modalSeparator: {
    borderBottomWidth: 1,
    borderColor: colors.gray5,
  },
  modalItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingVertical: 15,
  },
  modalItemImage: {
    width: 50,
    height: 50,
  },
  modalItemText: {
    textTransform: 'capitalize',
    fontSize: 15,
    fontFamily: fonts.medium,
  },
});
