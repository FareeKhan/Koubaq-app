import {
  Dimensions,
  FlatList,
  I18nManager,
  Image,
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
import MapView from 'react-native-maps';
import { mainUrl, shopsData } from '../constants/data';
import CustomText from '../components/CustomText';
import Subtitle from '../components/Subtitle';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { colors } from '../constants/colors';
import { fonts } from '../constants/fonts';
import { useNavigation } from '@react-navigation/native';
import CustomInput from '../components/CustomInput';
import { fetchRestaurentList } from '../userServices/UserService';
import FastImage from 'react-native-fast-image';
import ScreenLoader from '../components/ScreenLoader';

const { width } = Dimensions.get('screen');

const HomeScreen = () => {
  const navigation = useNavigation();
  const { t } = useTranslation();
  const [isListingView, setIsListingView] = useState(true);
  const [isShowOnlyList, setIsShowOnlyList] = useState(false);
  const [allRestaurants, setAllRestaurants] = useState([]);
  const [isLoader, setIsLoader] = useState(false);

  const restaurentData = async () => {
    setIsLoader(true)
    try {
      const result = await fetchRestaurentList()
      console.log('dasdasdas',result)
      if (result?.success) {
        setAllRestaurants(result?.data?.data)
      }
    } catch (error) {
      console.log('error', error)
    }finally{
      setIsLoader(false)
    }
  }

  useEffect(() => {
    restaurentData()
  }, [])



  const ListView = () => {
    return (
      <View>
        <HeaderBox
          onPressBack={() => setIsShowOnlyList(false)}
          logo={true}
          replaceBack={!isShowOnlyList}
        />

        {isShowOnlyList ? (
          <CustomInput
            placeholder={t('search')}
            rs={true}
            icon={true}
            style={styles.searchInput}
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

        <ShopsDataCard data={allRestaurants} />

      </View>
    );
  };

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate('ShopDetail', {
          resId: item?.restaurant_id ? item?.restaurant_id : item?.id,
        })}
        style={styles.shopCardWrapper}
      >
        <FastImage
          source={{ uri: `${mainUrl}${item?.image}` }}
          style={styles.shopImage}
        />


        <View style={styles.shopInfoContainer}>
          <View style={styles.shopLogoWrapper}>
            <FastImage
              // source={item?.imgPath}
              source={{ uri: `${mainUrl}${item?.restaurant?.cover_image}` }}
              style={styles.shopLogo}

            />
          </View>

          <CustomText style={styles.shopName}>{item?.name}</CustomText>
          <Subtitle>{item?.restaurant?.location}</Subtitle>

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
            onPressBack={() => setIsListingView(!isListingView)}
          />
          <HeaderWithAll title={t('shopsNear')} style={{ marginTop: 30 }} />
        </View>

        <View style={styles.mapWrapper}>
          <MapView
            initialRegion={{
              latitude: 37.78825,
              longitude: -122.4324,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
            style={styles.map}
          />
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
  if(isLoader){
    return(
      <ScreenLoader/>
    )
  }

  return (
    <View style={styles.container}>

      <>
        {isListingView || isListingView ? (
          <ScreenView scrollable={true}>
            <ListView />
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
