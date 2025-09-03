import { FlatList, Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { colors } from '../constants/colors';
import { fonts } from '../constants/fonts';
import { useTranslation } from 'react-i18next';
import EmptyData from './EmptyData';
import CustomText from './CustomText';
import Subtitle from './Subtitle';
import { useNavigation } from '@react-navigation/native';

const ProductListing = ({ layoutType, isPlus,isGifterPage }) => {
  const { t } = useTranslation();
  const navigation = useNavigation()

  const renderItem = () => {
    return (
      <TouchableOpacity onPress={()=>navigation.navigate('ProductDetail',{
        isGifterPage:isGifterPage
      })} style={{flexDirection:"row",alignItems:"center",justifyContent:"space-between"}}>
        <View style={{width:"55%"}}>
          <CustomText>Cappuccino Cup</CustomText>
          <CustomText style={{marginVertical:2}}>21.0</CustomText>
          <Subtitle style={{ fontSize: 13 }}>
            Garlic, olive oil base, mozarella, cremini mushrooms, ricotta,
            thyme, white truffle oil. Add arugula for an extra charge
          </Subtitle>
        </View>


        <Image source={require('../assets/cup.png')} style={{width:115,height:100}} borderRadius={8}/>
      </TouchableOpacity>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={[1, 2, 3]}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item, index) => index?.toString()}
        contentContainerStyle={{ gap: 15,}}
        ListEmptyComponent={<EmptyData title={t('noDataFound')} />}
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
