import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { paymentCards } from '../constants/data';
import { useTranslation } from 'react-i18next';
import { colors } from '../constants/colors';
import Ionicons from 'react-native-vector-icons/Ionicons'
import CustomText from './CustomText';
import { fonts } from '../constants/fonts';

const PaymentOptions = ({ selectedPayment, setSelectedPayment, onlywallet }) => {
  const { t } = useTranslation()
  const paymentData = paymentCards(t);

  return (
    <View>
      <View style={{ marginTop: -10, marginBottom: 20 }}>
        {(onlywallet
          ? paymentData?.slice(2)
          : paymentData?.slice(0, 2)
        )?.map((item, index) => {
          return (
            <TouchableOpacity
              onPress={() => setSelectedPayment(item?.id)}
              key={index}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: 18,
                width: '70%',
                paddingHorizontal: 5,
                borderRadius: 10,
                marginBottom: 10,
                borderColor: colors.primary1,
                paddingVertical: 2,
              }}
            >
              <View
                style={[
                  {
                    height: 22,
                    width: 22,
                    borderWidth: 1,
                    borderRadius: 50,
                    borderColor: colors.gray,
                    backgroundColor: colors.white,
                    alignItems: 'center',
                    justifyContent: 'center',
                  },
                  selectedPayment == item?.id && {
                    backgroundColor: colors.black,
                  },
                ]}
              >
                {selectedPayment == item?.id && (
                  <Ionicons
                    name={'checkmark-sharp'}
                    size={15}
                    color={colors.white}
                  />
                )}
              </View>

              {item?.card}
              <CustomText style={{ fontFamily: fonts.medium }}>
                {item?.title}
              </CustomText>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  )
}

export default PaymentOptions

const styles = StyleSheet.create({})