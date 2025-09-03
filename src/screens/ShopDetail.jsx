import {
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useState } from 'react';
import ScreenView from '../components/ScreenView';
import HeaderBox from '../components/HeaderBox';
import HeaderWithAll from '../components/HeaderWithAll';
import CustomText from '../components/CustomText';
import { colors } from '../constants/colors';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Subtitle from '../components/Subtitle';
import { drinks } from '../constants/data';
import ProductListing from '../components/ProductListing';

const ShopDetail = ({isHeader=true,title,isGifterPage}) => {
  const [selectedDrink, setSelectedDrink] = useState('');

  const renderItem = ({ item, index }) => {
    return (
      <TouchableOpacity
        onPress={() => setSelectedDrink(item?.id)}
        style={[
          styles.innerDrinkBox,
          item?.id == selectedDrink && { backgroundColor: colors.gray5 },
        ]}
      >
        <CustomText
          style={[
            { fontSize: 12, color: colors.black1 },
            item?.id == selectedDrink && { color: colors.black },
          ]}
        >
          {item?.name}
        </CustomText>
      </TouchableOpacity>
    );
  };

  return (
    <ScreenView scrollable={true} mh={true} style={!isHeader && {paddingTop:0}}>
      {
        isHeader && 
      <HeaderBox logo={true} style={{ paddingHorizontal: 20 }} />
      }
      <View style={{ marginVertical: 15 }}>
        <Image
          source={require('../assets/shop.png')}
          style={{ width: '100%', height: 200 }}
        />
      </View>

      <View style={{ paddingHorizontal: 20 }}>
        <HeaderWithAll style={{ marginBottom: 8 }} title={title ? title :'Parkero'} />

        <CustomText style={{ fontSize: 12, color: colors.gray1 }}>
          <AntDesign name={'star'} size={12} color={colors.black} />{' '}
          4.7 (1666 ratings)
        </CustomText>
        <Subtitle>Open Until 03:00 Am</Subtitle>
        <Subtitle>Preparation time 15 mins</Subtitle>

        <View style={{ marginHorizontal: -20 }}>
          <FlatList
            data={drinks}
            keyExtractor={(item, index) => item?.id}
            renderItem={renderItem}
            horizontal
            contentContainerStyle={styles.drinkContainer}
            showsHorizontalScrollIndicator={false}
          />
        </View>

        <ProductListing
        
        isGifterPage={isGifterPage}
        />
      </View>
    </ScreenView>
  );
};

export default ShopDetail;

const styles = StyleSheet.create({
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
