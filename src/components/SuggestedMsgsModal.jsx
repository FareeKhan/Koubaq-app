import { StyleSheet, TouchableOpacity, View } from 'react-native'
import React from 'react'
import CustomModal from './CustomModal';
import { colors } from '../constants/colors';
import { birthdayWishes } from '../constants/data';
import { fonts } from '../constants/fonts';
import CustomText from './CustomText';

const SuggestedMsgsModal = ({ setModalVisible, modalVisible, setSelectedMsg, data }) => {

  const handleButton = (item) => {
    setSelectedMsg(item?.message)
    setModalVisible(false)
  }

  return (
    <View>
      <CustomModal
        setModalVisible={setModalVisible}
        modalVisible={modalVisible}
        textStyle={{
          textAlign: 'center',
          fontSize: 17,
          color: colors.primary,
          fontFamily: fonts.bold,
        }}
        title={'Suggested Message'}
      >
        {data?.map((item, index) => {
          return (
            <TouchableOpacity
              onPress={() => handleButton(item)}
              key={index}
              style={[
                styles.suggestionItem,
                data?.length - 1 == index &&
                styles.lastSuggestionItem,
              ]}
            >
              <CustomText style={styles.suggestionText}>
                {item?.message}
              </CustomText>
            </TouchableOpacity>
          );
        })}
      </CustomModal>
    </View>
  )
}

export default SuggestedMsgsModal

const styles = StyleSheet.create({
  suggestionItem: {
    borderWidth: 1,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 10,
    marginBottom: 15,
    borderColor: colors.gray5,
  },
  lastSuggestionItem: {
    marginBottom: 60,
  },
  suggestionText: {
    fontSize: 15,
  },
})