import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Check from '../assets/svg/check.svg'
import ScreenView from '../components/ScreenView'
import CustomText from '../components/CustomText'
import { useTranslation } from 'react-i18next'
import CustomButton from '../components/CustomButton'
import { fonts } from '../constants/fonts'
import { colors } from '../constants/colors'
import { CommonActions } from '@react-navigation/native'
import { clearCart } from '../redux/ProductAddToCart'

const SuccessfulScreen = ({ navigation }) => {
  const { t } = useTranslation()

  const handleBtn = ()=>{
    // () => navigation.navigate('HomeScreen')
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: 'BottomNavigation' }],  // Reset to BottomNavigation
      })
    );
  }
  

  return (
    <ScreenView style={styles.container}>
      <Check />
      <View style={styles.textContainer}>
        <CustomText style={styles.title}>{t('paymentSuccess')}</CustomText>
        <CustomText style={styles.subtitle}>{t('paidMoney')}</CustomText>
      </View>
      <CustomButton
        title={t('continueShopping')}
        style={styles.button}
        onPress={handleBtn}

      />
    </ScreenView>
  )
}
export default SuccessfulScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textContainer: {
    marginTop: 30,
    marginBottom: 50,
  },
  title: {
    textAlign: 'center',
    fontSize: 24,
    fontFamily: fonts.bold,
  },
  subtitle: {
    textAlign: 'center',
    color: colors.gray1,
    marginTop: 10,
  },
  button: {
    width: '60%',
    backgroundColor:colors.primary
  },
})
