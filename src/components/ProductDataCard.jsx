import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import CustomText from './CustomText'
import { currency, ImageBaseUrl, mainUrl } from '../constants/data'
import { fonts } from '../constants/fonts'
import Subtitle from './Subtitle'
import RemoteImage from './RemoteImage'
import { useNavigation } from '@react-navigation/native'

const ProductDataCard = ({ data ,relatedData}) => {
  const navigation = useNavigation()
  const renderItem = ({ item, index }) => {
    console.log('---', `${mainUrl}${item?.image}`)
    return (
      <TouchableOpacity style={{ width: 120 }}
        onPress={() => navigation.push('ProductDetail', {
          id: item?.id,
          isGifterPage: true,
          data: relatedData
        })}
      >
        {/* <Image source={}  borderRadius={5}/>
            
            */}
        <RemoteImage uri={`${mainUrl}${item?.image}`} style={{ width: 120, height: 110 }} />
        <CustomText style={{ fontFamily: fonts.medium, marginTop: 10 }}>{item?.name}</CustomText>

        <Subtitle>{currency} <CustomText style={{ fontSize: 18, fontFamily: fonts.semiBold }}>{item?.price}</CustomText>   </Subtitle>
      </TouchableOpacity>
    )
  }
  return (
    <View>
      <FlatList
        data={data}
        keyExtractor={(item, index) => index?.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ gap: 20 }}
        renderItem={renderItem}
      />
    </View>
  )
}

export default ProductDataCard

const styles = StyleSheet.create({})