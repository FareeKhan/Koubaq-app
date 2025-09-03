import { StyleSheet, TouchableOpacity, View } from 'react-native';
import React from 'react';
import Text from './CustomText';
import { fonts } from '../constants/fonts';
import { colors } from '../constants/colors';
import { useTranslation } from 'react-i18next';

const HeaderWithAll = ({ style, title, viewAll,titleStyle ,handlePress}) => {
  const { t } = useTranslation();
  return (
    <View style={[styles.container, style]}>
      {title && <Text style={[styles.txtStyle,titleStyle]}>{title}</Text>}

      {viewAll && (
        <TouchableOpacity onPress={handlePress} style={styles.arrowBox}>
          <Text style={styles.subText}>{t('seeAll')}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default HeaderWithAll;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  txtStyle: {
    fontFamily: fonts.semiBold,
    fontSize: 16,
  },
  subText: {
    color: colors.gray,
    textDecorationLine: 'underline',
  },
});
