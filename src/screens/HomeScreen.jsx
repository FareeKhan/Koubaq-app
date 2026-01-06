import {
  Dimensions,
  FlatList,
  I18nManager,
  Image,
  PermissionsAndroid,
  Platform,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import ScreenView from '../components/ScreenView';
import HeaderBox from '../components/HeaderBox';
import HeaderWithAll from '../components/HeaderWithAll';
import { useTranslation } from 'react-i18next';
import CustomCarousel from '../components/CustomCarousel';
import ShopsDataCard from '../components/ShopsDataCard';
import CustomButton from '../components/CustomButton';
import MapView, { Marker } from 'react-native-maps';
import { mainUrl } from '../constants/data';
import CustomText from '../components/CustomText';
import Subtitle from '../components/Subtitle';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { colors } from '../constants/colors';
import { fonts } from '../constants/fonts';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import CustomInput from '../components/CustomInput';
import { fetchRestaurentList, NearByRest } from '../userServices/UserService';
import FastImage from 'react-native-fast-image';
import ScreenLoader from '../components/ScreenLoader';
import { DEFAULT_TAB_BAR_STYLE, getAddressFromCoordinates } from '../constants/helper';
import Geolocation from '@react-native-community/geolocation';
import { showMessage } from 'react-native-flash-message';
import CustomModal from '../components/CustomModal';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import MapViewComp from '../components/MapViewComp';

const { width } = Dimensions.get('screen');

const SearchBoxComp = ({
  search,
  setIsSearch,
  t
}) => {
  return (
    <CustomInput
      placeholder={t('search')}
      rs={true}
      icon={true}
      style={styles.searchInput}
      value={search}
      onChangeText={setIsSearch}

    />
  )
}

const ListView = ({
  isShowOnlyList,
  handleSearch,
  search,
  setIsSearch,
  filterSearch,
  t,
  currentAddress,
  setIsShowOnlyList
}) => {
  return (
    <View>

      <HeaderBox
        onPressBack={() => { setIsShowOnlyList(false), setIsSearch('') }}
        logo={true}
        replaceBack={!isShowOnlyList}
        onPressSearch={handleSearch}
      />
      <CustomText style={{ marginTop: 20 }}>Location: {currentAddress?.formattedAddress}</CustomText>

      {isShowOnlyList ? (
        <SearchBoxComp
          search={search}
          setIsSearch={setIsSearch}
          t={t}
        />
      ) : (
        <>
          <CustomCarousel />
          <HeaderWithAll
            handlePress={() => setIsShowOnlyList(!isShowOnlyList)}
            title={t('shopsNear')}
            viewAll={true}
          />
        </>

      )}
      <ShopsDataCard data={filterSearch} />

    </View>
  );
};

const HomeScreen = () => {
  const tabBarHeight = useBottomTabBarHeight();
  const navigation = useNavigation();
  const { t } = useTranslation();
  const [isListingView, setIsListingView] = useState(true);
  const [isShowOnlyList, setIsShowOnlyList] = useState(false);
  const [allRestaurants, setAllRestaurants] = useState([]);
  const [isLoader, setIsLoader] = useState(false);
  const [search, setIsSearch] = useState('');
  const [currentAddress, setCurrentAddress] = useState('');

  useEffect(() => {
    fetchUserCurrentLocation()
    loadRestaurants()
  }, [])

  const fetchUserCurrentLocation = async () => {
    setIsLoader(true)
    try {

      if (Platform.OS === 'android') {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
        );

        if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
          alert('Location permission denied');
          return;
        }
      }

      Geolocation.getCurrentPosition(
        async position => {
          const { latitude, longitude } = position.coords;
          const addressData = await getAddressFromCoordinates(latitude, longitude)
          if (addressData) {
            setCurrentAddress(addressData)
            await loadRestaurants(addressData);
          }
        },
        error => {
          console.log('Geolocation error:', error);
        },
        {
          enableHighAccuracy: true,
          timeout: 15000,
          maximumAge: 10000,
        }
      );
    } catch (error) {
      console.log('error', error);
    }
  };

  const loadRestaurants = async (address) => {

    if (address?.latitude && address?.longitude) {
      console.log('addressaddress', address)
      await fetchNearRestautents(address);
    } else {
      await restaurentData();
    }
  }

  const restaurentData = async () => {
    setIsLoader(true)
    try {
      const result = await fetchRestaurentList()
      console.log('resultresssult',result)
      if (result?.success) {
        const uniqueRestaurants = Array.from(
          new Set(result?.data?.data.map(p => JSON.stringify(p.restaurant)))
        ).map(str => JSON.parse(str));
        setAllRestaurants(uniqueRestaurants)
      }
    } catch (error) {
      console.log('error', error)
    } finally {
      setIsLoader(false)
    }
  }

  const fetchNearRestautents = async () => {
    try {
      // const data = {
      //   lat: 25.18408708860248,
      //   lng: 55.26428819573816,
      // }
      const data = {
        lat: Number(currentAddress?.latitude),
        lng: Number(currentAddress?.longitude),
      }

      const result = await NearByRest(data);
      if (result?.success && result?.data?.data?.length != 0) {
        setAllRestaurants(result?.data?.data)
      } else {
        await restaurentData();
      }
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoader(false)
    }
  };

  const filterSearch = search?.length > 0 ? allRestaurants?.filter((item) => item?.name?.toLowerCase()?.includes(search?.toLowerCase())) : allRestaurants
  const handleSearch = () => {
    setIsShowOnlyList(!isShowOnlyList)
  }





  const handleMapList = () => {
    setIsListingView(prev => {
      const next = !prev;

      if (next) {
        navigation.getParent()?.setOptions({
          tabBarStyle: DEFAULT_TAB_BAR_STYLE,
        });
      } else {
        navigation.getParent()?.setOptions({
          tabBarStyle: { display: 'none' },
        });
      }

      return next;
    });
  };

 if (isLoader) {
    return (
      <ScreenLoader />
    )
  }
  return (
    <View style={styles.container}>
      <>
        {isListingView ? (
          <ScreenView scrollable={true}>
            <ListView
              isShowOnlyList={isShowOnlyList}
              handleSearch={handleSearch}
              search={search}
              setIsSearch={setIsSearch}
              filterSearch={filterSearch}
              t={t}
              currentAddress={currentAddress}
              setIsShowOnlyList={setIsShowOnlyList}
            />
          </ScreenView>
        ) : (
          <MapViewComp
          data={allRestaurants}
          setIsListingView={setIsListingView}
          />
        )}

        <CustomButton
          // onPress={() => setIsListingView(!isListingView)}
          onPress={() => handleMapList()}
          title={isListingView ? t('mapView') : t('listView')}
          style={[styles.bottomBtn, !isListingView && styles.broadBottomBtn]}
        />

    


      </>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: { flex: 1 },

  searchInput: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 40,
    borderColor: colors.gray5
  },
  shopCardWrapper: {
    gap: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  shopImage: {
    width: 60,
    height: 60,
    borderRadius: 50
  },
  shopInfoContainer: {
    // backgroundColor: colors.white,
    // paddingVertical: 15,
    // paddingHorizontal: 10,
    // borderWidth: 1,
    // borderColor: colors.gray5,
    // borderBottomLeftRadius: 10,
    // borderBottomRightRadius: 10,
  },

  shopLogoWrapper: {
    position: 'absolute',
    top: I18nManager.isRTL ? -20 : -25,
    left: 10,
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 50,
    zIndex: 100,
  },
  shopLogo: {
    width: 35,
    height: 35,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: colors.gray5
  },
  shopName: {
    fontFamily: fonts.bold,
    color: colors.primary,
  },
  servicesRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  serviceItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  mapViewContainer: {
    // paddingTop: Platform.OS === 'ios' ? 60 : 40,
  },
  mapHeader: {
    position: "absolute",
    top: 70,
    backgroundColor: colors.white,
    borderRadius: 50,
    height: 45,
    width: 45,
    alignItems: "center",
    justifyContent: "center",
    left: 20
  },
  mapWrapper: {
    marginHorizontal: -20,
    zIndex: -100,
  },
  map: {
    width: '100%',
    height: 1000,
  },
  mapListOverlay: {
    zIndex: 100,
    bottom: 0,
    height:450,
    // bottom: Platform.OS === 'ios' ?  : 420,
    position: 'absolute',
    backgroundColor: colors.white,
    width: "100%",
    borderTopLeftRadius:20,
    borderTopRightRadius:20
  },
  horizontalList: {
    gap: 15,
    paddingHorizontal: 20,
    paddingVertical: 15,
    flexGrow:1,
    paddingBottom:150
  },
  bottomBtn: {
    position: 'absolute',
    bottom: 90,
    alignSelf: 'center',
    height: 35,
    width: '25%',
    borderRadius: 50,
  },

  broadBottomBtn: {
    position: 'absolute',
    alignSelf: 'center',
    width: '75%',
    borderRadius: 50,
    height: 50,
  },
});
