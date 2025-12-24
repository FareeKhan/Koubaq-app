import {
  I18nManager,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import CustomText from './CustomText';
import { fonts } from '../constants/fonts';
import { colors } from '../constants/colors';
import { useTranslation } from 'react-i18next';

const GiftImage = ({
  style,
  imagePath,
  label,
  senderName,
  setIsShowDetails,
  onPress,
  handleHidePress,
  receiver
}) => {
  const { t } = useTranslation();
  return (
    <TouchableOpacity
      activeOpacity={!handleHidePress}
      onPress={handleHidePress}
      style={style}
    >
      <Image
        source={imagePath ? { uri: imagePath } : require('../assets/giftCard.png')}
        style={{ width: '100%', height: 180 }}
        borderRadius={10}

      />

      {label && (
        <View
          style={{
            position: 'absolute',
            top: 30,
            left: I18nManager.isRTL ? null : 15,
            right: I18nManager.isRTL ? 15 : null,
          }}
        >
          <CustomText
            style={{ fontFamily: fonts.semiBold, color: colors.primary }}
          >
            {label}
          </CustomText>
        </View>
      )}

      {senderName && (
        <TouchableOpacity
          onPress={onPress ? onPress : () => setIsShowDetails(null)}
          activeOpacity={1}
          style={{
            shadowColor: '#00000090',
            shadowOffset: {
              width: 0,
              height: 3,
            },
            shadowOpacity: 0.15,
            shadowRadius: 1.5,
            elevation: 7,
            backgroundColor: '#fff',
            paddingLeft: 10,
            borderBottomLeftRadius: 10,
            borderBottomRightRadius: 10,
            paddingTop: 20,
            paddingBottom: 10,
            zIndex: -100,
          }}
        >
          <CustomText style={{ fontSize: 15, color: colors.primary }}>
            {receiver ? t('receiver') : t('sender')}  : {senderName}{' '}
          </CustomText>
        </TouchableOpacity>
      )}
    </TouchableOpacity>
  );
};

export default GiftImage;

const styles = StyleSheet.create({});
