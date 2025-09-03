import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import CustomText from './CustomText';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { colors } from '../constants/colors';
import { fonts } from '../constants/fonts';
import { useNavigation } from '@react-navigation/native';

const ShopsDataCard = ({ data,scrollEnabled,onPress }) => {
  const navigation =  useNavigation()
  const renderItem = () => {
    return (
      <TouchableOpacity onPress={onPress ? onPress: ()=>navigation.navigate('ShopDetail')} style={styles.cardBox}>
        <Image
          source={require('../assets/shopName.png')}
          style={{ width: 70, height: 65 }}
          borderRadius={10}
        />

        <View style={{ gap: 2 }}>
          <CustomText style={styles.title}>Parkero</CustomText>
          <CustomText style={styles.subTitle}>
            lorem ipsum lorem ipsum
          </CustomText>

          <CustomText style={{ fontSize: 12, color: colors.gray1 }}>
            <AntDesign name={'star'} size={12} color={'#FF9F00'} /> 4.7 (1666
            ratings)
          </CustomText>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={{flex:1}}>
      <FlatList
        data={data}
        keyExtractor={(item, index) => index?.toString()}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        style={{}}
        contentContainerStyle={{paddingBottom:30}}
        scrollEnabled={scrollEnabled?scrollEnabled:false}
      />
    </View>
  );
};

export default ShopsDataCard;

const styles = StyleSheet.create({
  cardBox: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 10,
    padding: 12,
    gap: 10,
    marginBottom: 15,
    borderColor: colors.gray,
  },
  title: {
    fontFamily: fonts.medium,
    fontSize: 16,
  },
  subTitle: {
    color: colors.gray1,
    fontSize: 10,
    fontFamily: fonts.medium,
  },
});
