import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ScreenView from '../components/ScreenView'
import HeaderBox from '../components/HeaderBox'
import IconLabel from '../components/IconLabel'
import EvilIcons from 'react-native-vector-icons/EvilIcons'
import { colors } from '../constants/colors'
import { transactionData } from '../constants/data'
import CustomText from '../components/CustomText'
import { useTranslation } from 'react-i18next'
import { fonts } from '../constants/fonts'
import Subtitle from '../components/Subtitle'
import DividerLine from '../components/DividerLine'

const TransactionHistoryScreen = () => {
  const { t } = useTranslation()

  return (
    <ScreenView scrollable={true}>
      <HeaderBox logo={true} notification={false} search={false} />
      <IconLabel
        label={'TransactionHistory'}
        icon={<EvilIcons name={'calendar'} size={25} color={colors.black} />}
      />

      {transactionData?.map((item, index) => {
        return (
          <View key={index} style={styles.transactionContainer}>
            <CustomText style={styles.refText}>
              {t('ref')}: {item?.ref}
            </CustomText>

            <View style={styles.rowContainer}>
              <View style={styles.dot} />
              <CustomText style={styles.msgText}>{item?.msg}</CustomText>
            </View>

            <Subtitle style={styles.dateText}>{item?.dateTime}</Subtitle>

            <DividerLine />
          </View>
        )
      })}
    </ScreenView>
  )
}

export default TransactionHistoryScreen

const styles = StyleSheet.create({
  transactionContainer: {
    marginTop: 23,
  },
  refText: {
    fontSize: 15,
    fontFamily: fonts.medium,
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    marginTop: 5,
  },
  dot: {
    width: 14,
    height: 14,
    backgroundColor: colors.primary,
    borderRadius: 50,
  },
  msgText: {
    color: colors.black1,
  },
  dateText: {
    color: colors.black1,
    marginLeft: 'auto',
    marginVertical: 10,
  },
})
