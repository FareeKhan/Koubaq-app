import {
  ActivityIndicator,
  I18nManager,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import { useTranslation } from 'react-i18next';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { colors } from '../constants/colors';
import CustomText from './CustomText';
import { fonts } from '../constants/fonts';
import Octicons from 'react-native-vector-icons/Octicons';

const CustomInput = ({
  label,
  placeholder,

  style,
  icon,
  isApply,
  promoLoader,
  discountAmount,
  onPressApply,
  countryCode,
  shadow,
  inputExtraStyle,
  rs,
  ...props
}) => {    
  const { t } = useTranslation();
  return (
    <View>
      {label && <CustomText style={styles.label}>{t(label)}</CustomText>}
       <View
        style={[
          styles.container,
          shadow && styles.shadowBox,
          rs && styles.roundStyle,
          style,
        ]}
      >
        {icon && <AntDesign name={'search1'} color={colors.gray3} size={20} />}
        {countryCode && (
          <View style={{}}>
            <CustomText>{`\u2066${countryCode}\u2069`}</CustomText>
          </View>
        )}
        <TextInput
          placeholder={t(placeholder)}
          placeholderTextColor={colors.gray1}
          style={[styles.inputStyle, icon && { width: '90%' }, inputExtraStyle]}
          {...props}
        />

        {isApply && (
          <TouchableOpacity
            disabled={discountAmount}
            style={{}}
            onPress={onPressApply}
          >
            {promoLoader ? (
              <ActivityIndicator />
            ) : discountAmount ? (
              <Octicons
                style={{ marginLeft: 30 }}
                name={'check-circle-fill'}
                size={20}
                color={'green'}
              />
            ) : (
              <CustomText
                style={{ textDecorationLine: 'underline', marginLeft: 20 }}
              >
                {t('apply')}
              </CustomText>
            )}
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default CustomInput;

const styles = StyleSheet.create({
  container: {
    // flexDirection: 'row',
    // alignItems: 'center',
    gap: 5,
    marginBottom: 17,
    borderBottomWidth: 1.5,
    borderColor: colors.gray5,
  },
  shadowBox: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    backgroundColor: colors.white,
    elevation: 6,
    shadowRadius: 4.65,
  },
  inputStyle: {
    color: colors.black,
    width: '90%',
    textAlign: I18nManager.isRTL ? 'right' : 'left',
    fontFamily: fonts.regular,
    height: 45,
   
  },
  label: {
    color: colors.black,
    fontFamily: fonts.medium,
    marginBottom: 8,
    textAlign: 'left',
  },
  roundStyle: {
    borderWidth: 1.5,
    paddingHorizontal: 10,
    borderRadius: 10,
  },
});
