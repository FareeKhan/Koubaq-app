import {
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import ScreenView from '../components/ScreenView';
import HeaderBox from '../components/HeaderBox';
import HeaderWithAll from '../components/HeaderWithAll';
import CustomText from '../components/CustomText';
import { colors } from '../constants/colors';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Subtitle from '../components/Subtitle';
import {  mainUrl } from '../constants/data';
import ProductListing from '../components/ProductListing';
import { fetchResaurentsItems } from '../userServices/UserService';
import RemoteImage from '../components/RemoteImage';

const ShopDetail = ({ isHeader = true, title, isGifterPage, route ,selectedShopId}) => {
  const id = route?.params?.resId || 0
  const resId = id || selectedShopId
  const [selectedDrink, setSelectedDrink] = useState('');
  const [drinksData, setDrinksData] = useState([]);
  const [singleRestaurentData, setSingleRestaurentData] = useState([]);
  const [isLoader, setIsLoader] = useState(false)


  useEffect(() => {
    getRestaurentItems()
  }, [])

  const getRestaurentItems = async () => {
    setIsLoader(true)
    try {
      const response = await fetchResaurentsItems(resId)
      console.log('dasdasd', response?.data)
      if (response?.success) {
        setSingleRestaurentData(response?.data)
        if (response?.data?.sections?.length > 0) {
          setSelectedDrink(response.data.sections[0]);
          setDrinksData(response.data.sections)
        }
      }
    } catch (error) {
      console.log('shopDetail', error)
    } finally {
      setIsLoader(false)
    }
  }

  const formate12Hours = (timeSlot) => {
    if (!timeSlot) return

    const [hour, minutes] = timeSlot?.split(':')
    const h = parseInt(hour)
    const m = minutes?.padStart(2, '0');
    const amPm = h >= 12 ? "PM" : "AM"
    const formatedHours = h % 12 || 12
    return `${formatedHours?.toString()?.padStart(2, '0')} : ${m} ${amPm}`
  }

  const renderItem = ({ item, index }) => {
    return (
      <TouchableOpacity
        onPress={() => setSelectedDrink(item)}
        style={[
          styles.innerDrinkBox,
          item?.product_section == selectedDrink?.product_section && { backgroundColor: colors.gray5 },
        ]}
      >
        <CustomText
          style={[
            { fontSize: 12, color: colors.black1 },
            item?.product_section == selectedDrink && { color: colors.black },
          ]}
        >
          {item?.product_section}
        </CustomText>
      </TouchableOpacity>
    );
  };




  return (
    <ScreenView scrollable={true} mh={true} style={!isHeader && { paddingTop: 0 }}>
      {
        isHeader &&
        <HeaderBox logo={true} style={{ paddingHorizontal: 20 }} search={false}/>
      }
      <View style={{ marginVertical: 15 }}>
        <RemoteImage
          uri={`${mainUrl}${singleRestaurentData?.restaurant?.cover_image}`}
          style={styles.coverImage}
          isBorder={false}
        />
      </View>

      <View style={{ paddingHorizontal: 20 }}>
        <HeaderWithAll style={{ marginBottom: 8 }} title={singleRestaurentData?.restaurant?.name || 'Parkero'} />

        <CustomText style={{ fontSize: 12, color: colors.gray1 }}>
          <AntDesign name={'star'} size={12} color={colors.black} />{' '}
          {singleRestaurentData?.restaurant?.average_rating} ||  4.7 (1666 ratings)
        </CustomText>
        <Subtitle>Open Until {formate12Hours(singleRestaurentData?.restaurant?.closing_time)}</Subtitle>
        <Subtitle>Preparation time 30 mins</Subtitle>

        <View style={{ marginHorizontal: -20 }}>
          <FlatList
            data={drinksData}
            keyExtractor={(item, index) => index?.toString()}
            renderItem={renderItem}
            horizontal
            contentContainerStyle={styles.drinkContainer}
            showsHorizontalScrollIndicator={false}
          />
        </View>

        <ProductListing
          data={selectedDrink?.product_section_items || []}
          isGifterPage={isGifterPage}
        />
      </View>
    </ScreenView>
  );
};

export default ShopDetail;

const styles = StyleSheet.create({
  coverImage: {
    width: '100%',
    height: 200,
  },
  drinkContainer: {
    gap: 10,
    paddingHorizontal: 20,
    marginTop: 15,
    marginBottom: 25,
  },
  innerDrinkBox: {
    borderWidth: 1,
    paddingHorizontal: 25,
    paddingVertical: 8,
    borderRadius: 50,
    borderColor: colors.gray,
  },
});
