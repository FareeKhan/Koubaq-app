import {
  FlatList,
  I18nManager,
  StyleSheet,
  TouchableOpacity,
  View,
  Dimensions,
  TextInput,
  Image,
} from 'react-native';
import React, { useState } from 'react';
import ScreenView from '../components/ScreenView';
import CustomText from '../components/CustomText';
import Subtitle from '../components/Subtitle';
import { colors } from '../constants/colors';
import { fonts } from '../constants/fonts';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import DividerLine from '../components/DividerLine';
import { useTranslation } from 'react-i18next';
import CustomButton from '../components/CustomButton';
import CustomInput from '../components/CustomInput';
import CustomModal from '../components/CustomModal';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { language } from '../redux/Auth';
import RNRestart from 'react-native-restart';
import { carLogoJson } from '../constants/carData';
import { carImages } from '../constants/ExportCarsLogo';
import { deleteCar, removeStoreCarData, storeCarData } from '../redux/storeAddedCar';
import AddedCarData from '../components/AddedCarData';

const { height, width } = Dimensions.get('screen');

const AccountSetting = () => {
  const isLanguage = useSelector(state => state.auth?.isLanguage);
    const carData = useSelector(state => state.carArray?.saveCar);
  
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const navigation = useNavigation();
  const [isAddNewCar, setIsAddNewCar] = useState(false);
  const [isCarModal, setIsCarModal] = useState(false);
  const [carCategory, setCarCategory] = useState('');
  const [selectedCar, setSelectedCar] = useState('');
  const [plateNo, setPlateNo] = useState('');
  const [searchCar, setSearchCar] = useState('');

  const IconMenu = ({ onpress, icon, label, red }) => {
    return (
      <TouchableOpacity style={styles.iconMenu} onPress={onpress}>
        {icon}
        <CustomText style={red && styles.redText}>{t(label)}</CustomText>
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

  const handleAddCar = () => {
    const data = {
      id: carData?.length + 1,
      carCategory,
      carName: selectedCar?.name,
      plateNo,
    };

    
    dispatch(storeCarData(data));
    setCarCategory('')
    setPlateNo('')
    setSelectedCar('')
    setIsAddNewCar(false);

  };


  const filterSearch = searchCar
    ? carLogoJson?.filter(item =>
        item?.name?.toLowerCase()?.includes(searchCar.toLowerCase()),
      )
    : carLogoJson;

  return (
    <ScreenView scrollable={true} mh={true}>
      {/* Header Profile Data */}
      <View style={styles.headerRow}>
        <View style={styles.headerProfile}>
          <View style={styles.profileIcon}>
            <CustomText style={styles.profileInitial}>H</CustomText>
          </View>
          <View>
            <CustomText>Hamid</CustomText>
            <Subtitle style={styles.subtitleSmall}>+966 50224467</Subtitle>
            <Subtitle style={styles.subtitleSmall2}>Hamid@gmail.com</Subtitle>
          </View>
        </View>

        <TouchableOpacity     onPress={() => setIsAddNewCar(!isAddNewCar)}>
          <Ionicons name={'car-sport-outline'} size={25} color={colors.black} />
          <Entypo
            name={'plus'}
            size={12}
            color={colors.black}
            style={styles.plusIcon}
          />
        </TouchableOpacity>
      </View>

      <DividerLine h={true} borderStyle={styles.dividerHeight7} />

      {/* Your Cars */}
      <View style={styles.carsHeader}>
        <Ionicons name={'car-sport-outline'} size={25} color={colors.black} />
        <CustomText>{t('yourCars')}</CustomText>
      </View>

      {/* {isAddNewCar ? (
        <View style={styles.addCarContainer}>
          <View style={styles.addCarRow}>
            <CustomText style={styles.vehicleBrand}>
              {t('vehicleBrand')}
            </CustomText>
            <TouchableOpacity
              onPress={() => setIsCarModal(true)}
              style={styles.selectCarBtn}
            >
              <CustomText style={styles.selectCarText}>
                {selectedCar ? selectedCar?.name : t('selectCar')}
              </CustomText>
              <Feather
                name={I18nManager.isRTL ? 'chevron-left' : 'chevron-right'}
                size={20}
                color={colors.gray}
              />
            </TouchableOpacity>
          </View>

          <View style={styles.inputRow}>
            <TextInput
              placeholder={t('category')}
              placeholderTextColor={colors.gray}
              style={styles.inputField}
              numberOfLines={1}
              maxLength={10}
              value={carCategory}
              onChangeText={setCarCategory}
            />
            <TextInput
              placeholder={t('plateNo')}
              placeholderTextColor={colors.gray}
              style={styles.inputField}
              numberOfLines={1}
              maxLength={10}
              value={plateNo}
              onChangeText={setPlateNo}
            />
          </View>

          <CustomButton
            title={t('save')}
            style={styles.addBtn}
            btnTxtStyle={styles.addBtnTxt}
            onPress={handleAddCar}
          />
        </View>
      ) : carCategory && plateNo && selectedCar ? (
        <FlatList
          data={carData}
          keyExtractor={(item, index) => index?.toString()}
          horizontal
          style={{ flex: 1 }}
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          renderItem={({ item, index }) => {
            return (
              <View style={{width:width}}>
              <View style={styles.carDetailsRow}>
                <Image
                  resizeMode="contain"
                  source={carImages[item?.carName]}
                  style={styles.carImage}
                />

                <View style={styles.carInfoContainer}>
                  <CustomText style={styles.carCategory}>
                    {carCategory}
                  </CustomText>
                  <CustomText style={styles.plateNo}>{plateNo}</CustomText>
                </View>

                <View style={styles.deleteIconContainer}>
                  <TouchableOpacity onPress={handleDelete}>
                    <Ionicons
                      name={'trash-outline'}
                      size={15}
                      color={colors.gray}
                    />
                  </TouchableOpacity>
                </View>
              </View>
              </View>
            );
          }}
        />
      ) : (
        <View style={styles.noCarsContainer}>
          <CustomText style={styles.noCarsText}>{t('noCars')}</CustomText>

          <CustomButton
            title={t('addNewCar')}
            style={styles.addNewCarBtn}
            btnTxtStyle={styles.addNewCarTxt}
            onPress={() => setIsAddNewCar(true)}
          />
        </View>
      )} */}

      {isAddNewCar && (
        <View style={styles.addCarContainer}>
          <View style={styles.addCarRow}>
            <CustomText style={styles.vehicleBrand}>
              {t('vehicleBrand')}
            </CustomText>
            <TouchableOpacity
              onPress={() => setIsCarModal(true)}
              style={styles.selectCarBtn}
            >
              <CustomText style={styles.selectCarText}>
                {selectedCar ? selectedCar?.name : t('selectCar')}
              </CustomText>
              <Feather
                name={I18nManager.isRTL ? 'chevron-left' : 'chevron-right'}
                size={20}
                color={colors.gray}
              />
            </TouchableOpacity>
          </View>

          <View style={styles.inputRow}>
            <TextInput
              placeholder={t('category')}
              placeholderTextColor={colors.gray}
              style={styles.inputField}
              numberOfLines={1}
              maxLength={10}
              value={carCategory}
              onChangeText={setCarCategory}
            />
            <TextInput
              placeholder={t('plateNo')}
              placeholderTextColor={colors.gray}
              style={styles.inputField}
              numberOfLines={1}
              maxLength={10}
              value={plateNo}
              onChangeText={setPlateNo}
            />
          </View>

          <CustomButton
            title={t('save')}
            style={styles.addBtn}
            btnTxtStyle={styles.addBtnTxt}
            onPress={handleAddCar}
          />
        </View>
      )
     }

      {/* :
        <View style={styles.noCarsContainer}>
          <CustomText style={styles.noCarsText}>{t('noCars')}</CustomText>

          <CustomButton
            title={t('addNewCar')}
            style={styles.addNewCarBtn}
            btnTxtStyle={styles.addNewCarTxt}
            onPress={() => setIsAddNewCar(true)}
          />
        </View> */}



{/* Lets do Testing */}
{
  carData?.length > 0 ?
   <View style={{paddingHorizontal:20}}>
        <AddedCarData />
   </View>

  :

       !isAddNewCar &&
         <View style={styles.noCarsContainer}>
          <CustomText style={styles.noCarsText}>{t('noCars')}</CustomText>

          <CustomButton
            title={t('addNewCar')}
            style={styles.addNewCarBtn}
            btnTxtStyle={styles.addNewCarTxt}
            onPress={() => setIsAddNewCar(true)}
          />
        </View>
}







      <DividerLine
        h={true}
        borderStyle={styles.dividerHeight7}
        style={styles.mb20}
      />

      {/* Menu Items */}
      <IconMenu
        onpress={() => navigation.navigate('OrderScreens')}
        label={'yourOrders'}
        icon={<EvilIcons name={'calendar'} size={25} color={colors.black} />}
      />
      <IconMenu
        onpress={() => navigation.navigate('FavoriteScreen')}
        label={'favorite'}
        icon={<EvilIcons name={'heart'} size={25} color={colors.black} />}
      />
      <IconMenu
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
      />
      <IconMenu
        label={'logout'}
        icon={<AntDesign name={'logout'} size={22} color={colors.red} />}
        red={true}
        onpress={() => navigation.navigate('LoginScreen')}
      />

      <TouchableOpacity style={styles.deleteAccountBtn}>
        <CustomText style={styles.deleteAccountTxt}>
          {t('deleteAccount')}
        </CustomText>
      </TouchableOpacity>

      {/* Car Selection Modal */}
      <CustomModal
        modalVisible={isCarModal}
        setModalVisible={setIsCarModal}
        title={'Select vehicle brand'}
        textStyle={styles.modalTitle}
      >
        <CustomInput
          placeholder={t('search')}
          icon={true}
          rs={true}
          value={searchCar}
          onChangeText={setSearchCar}
        />

        <FlatList
          data={filterSearch}
          keyExtractor={(item, index) => index?.toString()}
          style={styles.modalListHeight}
          contentContainerStyle={styles.modalList}
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={<View style={styles.modalSeparator} />}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity
                onPress={() => handleCarSelection(item)}
                style={styles.modalItemContainer}
              >
                <Image
                  resizeMode="contain"
                  source={item?.image}
                  style={styles.modalItemImage}
                />
                <CustomText style={styles.modalItemText}>
                  {item?.name}
                </CustomText>
              </TouchableOpacity>
            );
          }}
        />
      </CustomModal>



    </ScreenView>
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
    fontSize: 10,
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
