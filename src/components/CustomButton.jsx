import {
  ActivityIndicator,
  I18nManager,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import Text from './CustomText';
import { fonts } from '../constants/fonts';
import { colors } from '../constants/colors';
import { useTranslation } from 'react-i18next';
import AntDesign from 'react-native-vector-icons/AntDesign';
import CustomText from './CustomText';
import { currency } from '../constants/data';

const CustomButton = ({
  arrow,
  onPress,
  title,
  disabled,
  loader,
  appleIcon,
  productID,
  style,
  btnTxtStyle,
  totalPrice,
  counter,
}) => {
  const { t } = useTranslation();

  return (
    <TouchableOpacity
      disabled={disabled}
      onPress={onPress}
      style={[
        styles.container,
        totalPrice && styles.counterStyle,
        arrow && styles.btnContainer,
        disabled && styles.disabled,
        style,
      ]}
    >
      {appleIcon && (
        <AntDesign name={'apple1'} size={15} color={colors.white} />
      )}

      <View style={styles.textWrapper}>
        {counter && (
          <View style={styles.counterBox}>
            <CustomText style={styles.counterText}>{counter}</CustomText>
          </View>
        )}

        <Text style={[styles.buttonText, btnTxtStyle]}>
          {t(title)}
        </Text>
      </View>

      {totalPrice && (
        <Text style={[styles.buttonText, btnTxtStyle]}>
          {currency} {totalPrice}
        </Text>
      )}

      {arrow && (
        <AntDesign
          name={I18nManager.isRTL ? 'arrowleft' : 'arrowright'}
          color={colors.white}
          size={20}
        />
      )}

      {loader && (
        <ActivityIndicator
          style={styles.loader}
          size={'small'}
          color={colors.white}
        />
      )}
    </TouchableOpacity>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  container: {
    height: 48,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
    borderRadius: 10,
  },
  disabled: {
    backgroundColor: colors.gray,
  },
  btnContainer: {
    gap: 5,
    paddingHorizontal: 9,
    paddingVertical: 5,
    borderRadius: 50,
    width: '40%',
    alignSelf: 'center',
  },
  counterStyle: {
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  textWrapper: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
  },
  counterBox: {
    width: 30,
    height: 30,
    backgroundColor: colors.white1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 7,
    marginLeft: -10,
  },
  counterText: {
    color: colors.white,
    fontFamily: fonts.semiBold,
    fontSize: 17,
  },
  buttonText: {
    fontFamily: fonts.medium,
    color: colors.white,
  },
  loader: {
    marginLeft: 10,
  },
});
