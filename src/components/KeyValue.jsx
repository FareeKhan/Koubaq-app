import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { fonts } from '../constants/fonts';
import { colors } from '../constants/colors';

import CurrencyImage from './CurrencyImage';

const KeyValue = ({ leftValue, rightValue, changeColor, boldData,style }) => {
  return (
    <View style={[styles.keyValueContainer,style]}>
      <View style={styles.row}>
        <Text
          style={[
            styles.keyStyle,
            boldData && styles.boldKeyStyle,
          ]}
        >
          {leftValue}
        </Text>
        <TouchableOpacity>
          <Text
            style={[
              styles.keyStyle,
              boldData && styles.boldKeyStyle,
            ]}
          >
          </Text>
        </TouchableOpacity>
      </View>
      <Text
        style={[
          styles.valueStyle,
          boldData && styles.boldValueStyle,
          changeColor && styles.greenValue,
        ]}
      >
        {rightValue > 0 &&<CurrencyImage width={9} height={9}/>}{rightValue}
      </Text>
    </View>
  );
};

export default KeyValue;

const styles = StyleSheet.create({
  keyValueContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  keyStyle: {
    fontSize: 13,
    fontFamily: fonts.regular,
    color:colors.black
  },
  boldKeyStyle: {
    fontSize: 14,
    fontFamily: fonts.medium,
  },
  valueStyle: {
    fontSize: 13,
    color: colors.black,
    fontFamily: fonts.medium,
  },
  boldValueStyle: {
    fontSize: 14,
    fontFamily: fonts.medium,
  },
  greenValue: {
    color: colors.green,
  },
});
