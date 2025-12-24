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
import React, { useEffect, useState } from 'react';
import ScreenView from '../components/ScreenView';
import HeaderBox from '../components/HeaderBox';
import HeaderWithAll from '../components/HeaderWithAll';
import { useTranslation } from 'react-i18next';
import CustomCarousel from '../components/CustomCarousel';
import ShopsDataCard from '../components/ShopsDataCard';
import CustomButton from '../components/CustomButton';
import MapView, { Marker } from 'react-native-maps';
import { mainUrl, shopsData } from '../constants/data';
import CustomText from '../components/CustomText';
import Subtitle from '../components/Subtitle';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { colors } from '../constants/colors';
import { fonts } from '../constants/fonts';
import { useNavigation } from '@react-navigation/native';
import CustomInput from '../components/CustomInput';
import { fetchRestaurentList, NearByRest } from '../userServices/UserService';
import FastImage from 'react-native-fast-image';
import ScreenLoader from '../components/ScreenLoader';
import { getAddressFromCoordinates } from '../constants/helper';
import Geolocation from '@react-native-community/geolocation';
import { showMessage } from 'react-native-flash-message';

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
  }, [])


  const fetchUserCurrentLocation = async () => {
    setIsLoader(true)
    try {
      if (Platform.OS === 'android') {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
        );

        if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
          console.log('Location permission denied');
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
      await fetchNearRestautents(address);
    } else {
      await restaurentData();
    }
  }

  const restaurentData = async () => {
    setIsLoader(true)
    try {
      const result = await fetchRestaurentList()
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

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate('ShopDetail', {
          resId: item?.restaurant_id ? item?.restaurant_id : item?.id,
        })}
        style={styles.shopCardWrapper}
      >
        <FastImage
          source={{ uri: `${mainUrl}${item?.cover_image}` }}
          style={styles.shopImage}
        />


        <View style={styles.shopInfoContainer}>
          <View style={styles.shopLogoWrapper}>
            <FastImage
              source={{ uri: `${mainUrl}${item?.logo}` }}
              style={styles.shopLogo}

            />
          </View>

          <CustomText style={styles.shopName}>{item?.name}</CustomText>
          <Subtitle>{item?.location}</Subtitle>

          <View style={styles.servicesRow}>
            <View style={styles.serviceItem}>
              <MaterialIcons
                name={'wheelchair-pickup'}
                size={16}
                color={colors.gray}
              />
              <Subtitle>Pick up</Subtitle>
            </View>
            <View style={styles.serviceItem}>
              <MaterialIcons name={'handyman'} size={16} color={colors.gray} />
              <Subtitle>In Store</Subtitle>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const MapViewComp = () => {
    return (
      <View style={styles.mapViewContainer}>
        <View style={styles.mapHeader}>
          <HeaderBox
            logo={true}
            search={false}
            onPressBack={() => setIsListingView(!isListingView)}
          />
          <HeaderWithAll title={t('shopsNear')} style={{ marginTop: 30 }} />
        </View>

        <View style={styles.mapWrapper}>
          <MapView
            initialRegion={{
              latitude: 25.256946,
              longitude: 55.359307,
              latitudeDelta: 0.20,
              longitudeDelta: 0.20,
            }}

            style={styles.map}
          >
            {
              allRestaurants?.map((item, index) => {
                return (
                  <Marker

                    key={index}
                    coordinate={{
                      latitude: Number(item.latitude),
                      longitude: Number(item.longitude),
                      latitudeDelta: 0.20,
                      longitudeDelta: 0.20,
                    }}
                    title={item?.name}
                  />
                )
              })
            }

          </MapView>
        </View>

        <View style={styles.mapListOverlay}>
          <FlatList
            // data={shopsData}
            data={allRestaurants}
            keyExtractor={(_, index) => index?.toString()}
            renderItem={renderItem}
            contentContainerStyle={styles.horizontalList}
            horizontal
            showsHorizontalScrollIndicator={false}
          />
        </View>
      </View>
    );
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
          <MapViewComp />
        )}

        <CustomButton
          onPress={() => setIsListingView(!isListingView)}
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
    // gap: 3,


  },
  shopImage: {
    width: width / 2,
    height: 160,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10

  },
  shopInfoContainer: {
    backgroundColor: colors.white,
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: colors.gray5,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
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
    paddingTop: Platform.OS === 'ios' ? 60 : 40,
  },
  mapHeader: {
    paddingHorizontal: 20,
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
    bottom: Platform.OS === 'ios' ? 480 : 420,
    position: 'absolute',
  },
  horizontalList: {
    gap: 15,
    paddingHorizontal: 20,
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
