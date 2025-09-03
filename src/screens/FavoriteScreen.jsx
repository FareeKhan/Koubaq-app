import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import React from 'react';
import ScreenView from '../components/ScreenView';
import HeaderBox from '../components/HeaderBox';
import IconLabel from '../components/IconLabel';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import { colors } from '../constants/colors';
import CustomButton from '../components/CustomButton';
import CustomText from '../components/CustomText';
import { useTranslation } from 'react-i18next';
import DividerLine from '../components/DividerLine';

const FavoriteScreen = () => {
  const { t } = useTranslation();
  return (
    <ScreenView>
      <HeaderBox logo={true} notification={false} search={false} />

      <IconLabel
        label={'favorite'}
        icon={<EvilIcons name={'calendar'} size={25} color={colors.black} />}
        style={styles.iconLabel}
      />

      {/* First Product */}
      <View style={styles.productRow}>
        <View style={styles.productInfoContainer}>
          <View style={styles.productTextContainer}>
            <CustomText style={styles.productTitle}>Cappuccino Cup</CustomText>
            <CustomText>21.00</CustomText>
          </View>

          <CustomButton
            title={'moveToCart'}
            style={styles.reorderButton}
            btnTxtStyle={styles.reorderButtonText}
          />
        </View>

        <View style={styles.imageContainer}>
          <Image
            source={require('../assets/cup.png')}
            style={styles.productImage}
            borderRadius={8}
          />
          <TouchableOpacity>
            <CustomText style={styles.removeText}>{t('remove')}</CustomText>
          </TouchableOpacity>
        </View>
      </View>

      <DividerLine verticalGap={true} />

      {/* Second Product */}
      <View style={styles.productRow}>
        <View style={styles.productInfoContainer}>
          <View style={styles.productTextContainer}>
            <CustomText style={styles.productTitle}>Cappuccino Cup</CustomText>
            <CustomText>21.00</CustomText>
          </View>

          <CustomButton
            title={'moveToCart'}
            style={styles.reorderButton}
            btnTxtStyle={styles.reorderButtonText}
          />
        </View>

        <View style={styles.imageContainer}>
          <Image
            source={require('../assets/cup.png')}
            style={styles.productImage}
            borderRadius={8}
          />
          <TouchableOpacity>
            <CustomText style={styles.removeText}>{t('remove')}</CustomText>
          </TouchableOpacity>
        </View>
      </View>
    </ScreenView>
  );
};

export default FavoriteScreen;

const styles = StyleSheet.create({
  iconLabel: {
    marginBottom: 40,
  },
  productRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  productInfoContainer: {
    justifyContent: 'space-between',
  },
  productTextContainer: {
    gap: 3,
  },
  productTitle: {
    fontSize: 16,
  },
  reorderButton: {
    borderWidth: 1,
    backgroundColor: colors.white,
    width: '65%',
    height: 30,
    borderRadius: 4,
  },
  reorderButtonText: {
    color: colors.black,
    fontSize: 12,
  },
  imageContainer: {
    alignItems: 'center',
  },
  productImage: {
    width: 94,
    height: 88,
  },
  removeText: {
    fontSize: 13,
    marginTop: 5,
    textDecorationLine: 'underline',
  },
});
