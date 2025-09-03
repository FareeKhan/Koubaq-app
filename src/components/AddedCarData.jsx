import { Dimensions, FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import CustomText from './CustomText';
import { colors } from '../constants/colors';
const {width} = Dimensions.get('screen')
import Ionicons from 'react-native-vector-icons/Ionicons'
import { fonts } from '../constants/fonts';
import { carImages } from '../constants/ExportCarsLogo';
import { deleteCar } from '../redux/storeAddedCar';

const AddedCarData = ({isBorder}) => {
  const carData = useSelector(state => state.carArray?.saveCar);
  const dispatch = useDispatch()
  const handleDelete = (id) => {
    dispatch(deleteCar({id}))
  };

  return (
    <View style={isBorder && {borderWidth:1,borderRadius:10,marginBottom:10,borderColor:colors.primary}}>
  <FlatList
          data={carData}
          keyExtractor={(item, index) => index?.toString()}
          horizontal
          style={{ width:width}}
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          renderItem={({ item, index }) => {
            return (
              <View style={{width:width}}>
              <View style={[styles.carDetailsRow,isBorder && {marginVertical:10}]}>
                <Image
                  resizeMode="contain"
                  source={carImages[item?.carName]}
                  style={styles.carImage}
                />

           <View style={styles.carInfoContainer}>
                  <CustomText style={styles.carCategory}>
                    {item?.carCategory}
                  </CustomText>
                  <CustomText style={styles.plateNo}>{item?.plateNo}</CustomText>
                </View>

                <View style={styles.deleteIconContainer}>
                  <TouchableOpacity onPress={()=>handleDelete(item?.id)}>
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
    </View>
  )
}

export default AddedCarData

const styles = StyleSheet.create({
    carDetailsRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 15,
justifyContent:"center",
        left:-30,

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
 

})