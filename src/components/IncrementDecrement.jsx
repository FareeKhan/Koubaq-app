import { I18nManager, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { colors } from '../constants/colors';
import CustomText from './CustomText';

const IncrementDecrement = ({ style,onpressPlus ,onpressMinu,pCounter}) => {

  const [counter,setCounter] = useState(1)


  const incrementCounter = () => setCounter(counter + 1);
  const decrementCounter = () => {
    if (counter > 1) setCounter(counter - 1);
  };


  return (
    <View style={[styles.counterContainer, style]}>
      <TouchableOpacity onPress={ onpressMinu? onpressMinu : decrementCounter}>
        <AntDesign name={'minus'} size={20} color={colors.black} />
      </TouchableOpacity>
      <CustomText>{pCounter?pCounter : counter}</CustomText>
      <TouchableOpacity onPress={onpressPlus ? onpressPlus :incrementCounter}>
        <AntDesign name={'plus'} size={20} color={colors.black} />
      </TouchableOpacity>
    </View>
  );
};

export default IncrementDecrement;

const styles = StyleSheet.create({
  counterContainer: {
    flexDirection: I18nManager.isRTL ? 'row-reverse': 'row',
    alignItems: 'center',
    gap: 5,
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 10,
    borderColor: colors.gray,
  },
});
