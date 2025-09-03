import { I18nManager, Image, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import ScreenView from '../components/ScreenView';
import CustomText from '../components/CustomText';
import HeaderBox from '../components/HeaderBox';
import { colors } from '../constants/colors';
import Octicons from 'react-native-vector-icons/Octicons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useTranslation } from 'react-i18next';
import IconLabel from '../components/IconLabel';
import { currency } from '../constants/data';
import { fonts } from '../constants/fonts';
import DividerLine from '../components/DividerLine';
import Subtitle from '../components/Subtitle';
import { useNavigation } from '@react-navigation/native';

const WalletScreen = () => {
  const { t } = useTranslation();
  const navigation = useNavigation()

  const WalletBalanceCard = () => {
    const PackagesName = ({ title }) => {
      return (
        <View style={styles.packageNameContainer}>
          <Octicons name={'feed-star'} size={12} color={colors.black} />
          <CustomText style={styles.packageNameText}>
            {t(title)}
          </CustomText>
        </View>
      );
    };

    return (
      <View style={styles.walletCard}>
        <View style={styles.walletHeader}>
          <View>
            <CustomText style={styles.walletBalanceText}>
              {t('walletBalance')}
            </CustomText>
            <View style={styles.walletAmountContainer}>
              <CustomText style={styles.walletAmountValue}>
                50.00
              </CustomText>
              <CustomText style={styles.walletCurrency}>
                {currency}
              </CustomText>
            </View>
          </View>

          <View style={styles.walletRightContainer}>
            <View style={styles.walletLogoRow}>
              <Image
                source={require('../assets/logo.png')}
                style={styles.walletLogo}
              />
              <View style={styles.walletWifiIcon}>
                <Ionicons name={'wifi'} color={colors.primary} size={25} />
              </View>
            </View>

            <CustomText style={styles.walletTierText}>
              SILVER
            </CustomText>
          </View>
        </View>

        <PackagesName title={'eachOnePoint'} />
        <PackagesName title={'silver'} />
        <PackagesName title={'gold'} />
        <PackagesName title={'daimond'} />
      </View>
    );
  };

  return (
    <ScreenView scrollable={true}>
      <HeaderBox   logo={true} notification={false} search={false} />
      <IconLabel label={'yourWallet'} />

      <WalletBalanceCard />
      <IconLabel
        label={'topUpWallet'}
        isButton={true}
        onPress={()=>navigation.navigate('TopUpWalletScreen')}
        icon={
          <Ionicons
            name={'phone-portrait-sharp'}
            size={20}
            color={colors.black}
          />
        }
      />
      <IconLabel
        label={'sendBalance'}
        isButton={true}
        icon={<Ionicons name={'cash-outline'} size={20} color={colors.black} />}
        onPress={()=>navigation.navigate('SendBalanceScreen')}

      />
      <IconLabel 
        isButton={true}
        label={'TransactionHistory'} 
        mb={true} 
        onPress={()=>navigation.navigate('TransactionHistoryScreen')}

      />

        <DividerLine borderStyle={{ height: 5}} verticalGap={true} />

      <View style={styles.coffeeHeader}>
        <Image source={require('../assets/coffee.png')} />
        <CustomText style={styles.coffeeHeaderText}>
          {t('yourCoffee')}
        </CustomText>
      </View>

      <Subtitle smallFont={true} style={styles.coffeeSub1}>
        Get a free coffe when you purchase 5 Coffes from the same shop
      </Subtitle>
      <Subtitle smallFont={true} style={styles.coffeeSub2}>
        The Free Coffe amount will be added to your Wallet
      </Subtitle>
      <Image
        source={require('../assets/coffeegroup.png')}
        style={styles.coffeeGroupImage}
      />

      <Subtitle smallFont={true} style={styles.coffeeSub2}>
        Note: The Free coffe value will be as the minimum purchased value
      </Subtitle>
    </ScreenView>
  );
};

export default WalletScreen;

const styles = StyleSheet.create({
  packageNameContainer: {
    flexDirection: 'row',
    gap: 5,
    alignItems: 'center',
    marginBottom: 10,
  },
  packageNameText: {
    color: colors.primary,
    fontSize: 10,
  },
  walletCard: {
    borderWidth: 1,
    padding: 10,
    paddingTop: 20,
    borderRadius: 10,
    backgroundColor: colors.secondary,
    borderColor: colors.gray,
    marginBottom: 10,
  },
  walletHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  walletBalanceText: {
    color: colors.primary,
    top: -5,
  },
  walletAmountContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  walletAmountValue: {
    fontSize: 19,
    color: colors.primary,
    fontFamily: fonts.medium,
  },
  walletCurrency: {
    fontSize: 13,
    color: colors.primary,
  },
  walletRightContainer: {
    top: -5,
    marginRight: 15,
  },
  walletLogoRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  walletLogo: {
    width: 80,
    height: 45,
    right: 15,
  },
  walletWifiIcon: {
    position: 'absolute',
    top: -10,
    right: -20,
    transform: [{ rotate:  I18nManager.isRTL ? '-90deg': '90deg' }],
  },
  walletTierText: {
    fontSize: 15,
    color: colors.primary,
  },
  coffeeHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 15,
  },
  coffeeHeaderText: {
    fontFamily: fonts.semiBold,
    fontSize: 16,
  },
  coffeeSub1: {
    marginBottom: 10,
    color: colors.black1,
  },
  coffeeSub2: {
    color: colors.black1,
  },
  coffeeGroupImage: {
    marginVertical: 18,
  },
});
