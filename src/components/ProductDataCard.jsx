import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import CustomText from './CustomText'
import { currency } from '../constants/data'
import { fonts } from '../constants/fonts'
import Subtitle from './Subtitle'

const ProductDataCard = ({data}) => {
    const renderItem =()=>{
        return(
          <TouchableOpacity style={{width:120}}>
            <Image source={require('../assets/cup.png')} style={{width:120,height:110}} borderRadius={5}/>
            <CustomText style={{fontFamily:fonts.medium,marginTop:10}}>Saint Gobain Gyp rope rford Dot</CustomText>

           <Subtitle>{currency} <CustomText style={{fontSize:18,fontFamily:fonts.semiBold}}>26</CustomText>   </Subtitle>
          </TouchableOpacity>
        )
    }
  return (
    <View>
      <FlatList 
      data={data}
      keyExtractor={(item,index)=>index?.toString()}
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{gap:20}}
      renderItem={renderItem}
      />
    </View>
  )
}

export default ProductDataCard

const styles = StyleSheet.create({})