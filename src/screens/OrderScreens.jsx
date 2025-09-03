import {
  FlatList,
  I18nManager,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import ScreenView from '../components/ScreenView';
import HeaderBox from '../components/HeaderBox';
import IconLabel from '../components/IconLabel';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import { colors } from '../constants/colors';
import { currency, OrderData } from '../constants/data';
import EmptyData from '../components/EmptyData';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { fonts } from '../constants/fonts';
import { useTranslation } from 'react-i18next';
import DividerLine from '../components/DividerLine';
import CustomText from '../components/CustomText';
import Subtitle from '../components/Subtitle';
import CustomButton from '../components/CustomButton';
import { useNavigation } from '@react-navigation/native';

const OrderScreens = () => {
  const { t } = useTranslation();
  const navigation = useNavigation()

  const data = OrderData(t);

  const renderItem = ({ item, index }) => {
    return (
      <TouchableOpacity 
      onPress={()=>navigation.navigate('OrderDetailsScreen')}
      
      style={styles.dataContainer}>
        
<View style={{flexDirection:"row",justifyContent:"space-between"}}>
          <View>
               <View style={{ flexDirection: 'row', gap: 15 }}>
          <View>
            <CustomText style={{fontFamily:fonts.medium,marginBottom:2}}>{item?.orderID}</CustomText>
            <Subtitle>{item?.orderDate}</Subtitle>
          </View>

          <MaterialIcons
            name={I18nManager.isRTL ? 'arrow-back-ios' : 'arrow-forward-ios'}
            size={15}
            color={colors.black}
          />
        </View>


        <View style={{flexDirection:"row",gap:10,marginVertical:20}}>
            <Image source={require('../assets/cup.png')} style={{width:45,height:45}} borderRadius={10} />
            <Image source={require('../assets/cup.png')} style={{width:45,height:45}} borderRadius={10} />
        </View>

        <CustomText>{currency} 70.00</CustomText>
        </View>


        <CustomButton
        title={'reOrder'}
        style={{borderWidth:1,backgroundColor:colors.white,width:"25%",height:30,borderRadius:4}}
        btnTxtStyle={{color:colors.black}}
          onPress={()=>navigation.navigate('BasketScreen')}
        />
</View>

        <DividerLine verticalGap={true} />
      </TouchableOpacity>
    );
  };

  return (
    <ScreenView>
      <HeaderBox logo={true} notification={false} search={false} />
      <IconLabel
        label={'yourOrders'}
        icon={<EvilIcons name={'calendar'} size={25} color={colors.black} />}
        style={{marginBottom:40}}
      />

      <FlatList
        data={data}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
        scrollEnable={false}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={<EmptyData />}
      />
    </ScreenView>
  );
};

export default OrderScreens;

const styles = StyleSheet.create({
  dataContainer: {
    backgroundColor: colors.white.concat(50),
    // paddingBottom: 15,
    borderRadius: 10,
    // marginBottom: 20,
  },
  orderTopContainer: {
    // flexDirection: "row",
    justifyContent: 'space-between',
    // marginBottom: 20,
  },
  orderId: {
    color: colors.gray2,
    fontFamily: fonts.medium,
    textAlign: 'left',
    textTransform: 'uppercase',
  },
  orderIdValue: {
    // color: colors.black,
    color: colors.gray2,

    fontFamily: fonts.medium,
  },
  imageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  imageWrapper: {
    marginRight: 15,
    backgroundColor: colors.lightTheme,
    width: 55,
    height: 66,
  },
  image: {
    width: 55,
    height: 66,

    // borderRadius: 15,
  },
  statusText: {
    fontFamily: fonts.semiBold,
    color: colors.black,
    textTransform: 'capitalize',
  },
  orderDate: {
    color: colors.gray1,
    marginTop: 5,
    // textAlign: "right",
  },
  reorderButton: {
    flexDirection: 'row',
    borderColor: colors.secondary,
    paddingTop: 8,
    gap: 10,
    alignItems: 'center',
  },
  reorderText: {
    color: colors.green,
    fontFamily: fonts.medium,
    fontSize: 13,
  },
  arrowButton: {
    alignSelf: 'flex-end',
    marginTop: -15,
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerBox: {
    marginBottom: 40,
  },
});
