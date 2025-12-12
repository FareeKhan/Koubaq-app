import { FlatList, Image, StyleSheet, TouchableOpacity, View } from 'react-native';
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
import { useDispatch, useSelector } from 'react-redux';
import { mainUrl } from '../constants/data';
import EmptyData from '../components/EmptyData';
import { removeFavorite } from '../redux/AddFavorite';
import { useNavigation } from '@react-navigation/native';

const FavoriteScreen = () => {
  const { t } = useTranslation();
  const favoriteData = useSelector((state) => state?.favorite?.AddInFavorite)

  const dispatch = useDispatch()
  const navigation = useNavigation();

  const handleRemove = (id) => {
    dispatch(removeFavorite({ id }))
  }

  const renderItem = ({ item, index }) => {
    return (
      <TouchableOpacity onPress={() => navigation?.navigate('ProductDetail', {
        id: item?.id,
        restaurant_id: item?.restID
      })} style={styles.productRow}>
        <View style={styles.productInfoContainer}>
          <View style={styles.productTextContainer}>
            <CustomText style={styles.productTitle}>{item?.title}</CustomText>
            <CustomText>{item?.price}</CustomText>
          </View>

          <CustomButton
            title={'moveToCart'}
            style={styles.reorderButton}
            btnTxtStyle={styles.reorderButtonText}
          />
        </View>

        <View style={styles.imageContainer}>
          <Image
            source={{ uri: `${mainUrl}${item?.image}` }}
            style={styles.productImage}
            borderRadius={8}
          />
          <TouchableOpacity onPress={() => handleRemove(item?.id)}>
            <CustomText style={styles.removeText}>{t('remove')}</CustomText>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    )
  }

  return (
    <ScreenView>
      <HeaderBox logo={true} notification={false} search={false} />

      <IconLabel
        label={'favorite'}
        icon={<EvilIcons name={'calendar'} size={25} color={colors.black} />}
        style={styles.iconLabel}
      />

      <FlatList
        data={favoriteData}
        keyExtractor={(item, index) => index?.toString()}
        renderItem={renderItem}
        ListEmptyComponent={<EmptyData />}
        ItemSeparatorComponent={<DividerLine verticalGap={true} />}
      />
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
    borderWidth: 1,
    borderColor: colors.gray5
  },
  removeText: {
    fontSize: 13,
    marginTop: 5,
    textDecorationLine: 'underline',
  },
});
