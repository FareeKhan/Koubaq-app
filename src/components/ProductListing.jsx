import { FlatList, Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { colors } from '../constants/colors';
import { fonts } from '../constants/fonts';
import { useTranslation } from 'react-i18next';
import EmptyData from './EmptyData';
import CustomText from './CustomText';
import Subtitle from './Subtitle';
import { useNavigation } from '@react-navigation/native';
import RemoteImage from './RemoteImage';
import { mainUrl } from '../constants/data';

const ProductListing = ({ layoutType, isPlus, isGifterPage, data }) => {
  const { t } = useTranslation();
  const navigation = useNavigation()

  const renderItem = ({ item, index }) => {
    return (
      <TouchableOpacity onPress={() => navigation.navigate('ProductDetail', {
        isGifterPage: isGifterPage,
        id: item?.id,
        restaurant_id: item?.restaurant_id
      })} style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
        <View style={{ width: "55%" }}>
          <CustomText>{item?.name}</CustomText>
          <CustomText style={{ marginVertical: 2 }}>{item?.price}</CustomText>
          <Subtitle numberOfLines={3} style={{ fontSize: 13 }}>
            {item?.description}
          </Subtitle>
        </View>
        <RemoteImage
          uri={`${mainUrl}${item?.image}`}
          style={{ width: 115, height: 100, }}
        />
      </TouchableOpacity>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={data}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item, index) => index?.toString()}
        contentContainerStyle={{ gap: 15, }}
        ListEmptyComponent={<EmptyData style={{ height: 350 }} title={t('noDataFound')} />}
        renderItem={renderItem}
        scrollEnabled={false}
      />
    </View>
  );
};

export default ProductListing;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  txtStyle: {
    fontFamily: fonts.semiBold,
    fontSize: 16,
  },
  arrowBox: {
    width: 24,
    height: 24,
    backgroundColor: colors.primary,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
});
