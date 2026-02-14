import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import ScreenView from '../components/ScreenView'
import HeaderBox from '../components/HeaderBox'
import IconLabel from '../components/IconLabel'
import EvilIcons from 'react-native-vector-icons/EvilIcons'
import { colors } from '../constants/colors'
import CustomText from '../components/CustomText'
import { useTranslation } from 'react-i18next'
import { fonts } from '../constants/fonts'
import Subtitle from '../components/Subtitle'
import DividerLine from '../components/DividerLine'
import { useSelector } from 'react-redux'
import { walletTransaction } from '../userServices/UserService'
import EmptyData from '../components/EmptyData'
import ScreenLoader from '../components/ScreenLoader'

const TransactionHistoryScreen = () => {
  const { t } = useTranslation()
  const token = useSelector((state) => state?.auth?.loginData?.token)

  const [data, setData] = useState([])
  const [isLoader, setIsLoader] = useState(false)
  useEffect(() => {
    transactionHistory()
  }, [])

  const transactionHistory = async () => {
    try {
      setIsLoader(true)
      const result = await walletTransaction(token)
      console.log('dasdas', result)
      if (result?.success) {
        // setWalletData(result?.data)
        setData(result?.data?.data)
      }
    } catch (error) {
      console.log('error', error)
    } finally {
      setIsLoader(false)
    }
  }



  if (isLoader) {
    return (
      <ScreenLoader />
    )
  }



  return (
    <ScreenView scrollable={true}>
      <HeaderBox logo={true} notification={false} search={false} />
      <IconLabel
        label={'TransactionHistory'}
        icon={<EvilIcons name={'calendar'} size={25} color={colors.black} />}
      />


      {
        data?.length == 0 ?
          <EmptyData title={t('noTransactionFound')} />
          :
          data?.map((item, index) => {

            const input = item?.created_at;
            const d = new Date(input);

            // Month names
            const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

            // Get day with suffix
            const day = d.getDate();
            const suffix =
              day % 10 === 1 && day !== 11
                ? "st"
                : day % 10 === 2 && day !== 12
                  ? "nd"
                  : day % 10 === 3 && day !== 13
                    ? "rd"
                    : "th";

            const month = months[d.getMonth()];
            const year = d.getFullYear();

            // Time
            let hours = d.getHours();
            const minutes = d.getMinutes().toString().padStart(2, "0");
            const ampm = hours >= 12 ? "PM" : "AM";

            hours = hours % 12 || 12; // convert to 12h format
            hours = hours.toString().padStart(2, "0");

            const formatted = `${day}${suffix} ${month} ${year} at ${hours}:${minutes} ${ampm}`;

            return (
              <View key={index} style={styles.transactionContainer}>
                <CustomText style={styles.refText}>
                  {t('ref')}: {item?.reference_number}
                </CustomText>

                <View style={styles.rowContainer}>
                  <View style={styles.dot} />
                  <CustomText style={styles.msgText}>AED {item?.amount} {item?.description}</CustomText>
                </View>

                <Subtitle style={styles.dateText}>{formatted}</Subtitle>

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
