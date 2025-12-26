import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import CustomText from './CustomText';
import { fonts } from '../constants/fonts';
import { colors } from '../constants/colors';
import { useTranslation } from 'react-i18next';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

const CustomModal = ({
  modalVisible,
  setModalVisible,
  title,
  children,
  style,
  textStyle,
  animationType
}) => {
  const { t } = useTranslation();
  return (
    <Modal
      animationType={animationType ? animationType : "slide"}
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(!modalVisible);
      }}
    >
      <View style={[styles.centeredView, style]}>

        <TouchableOpacity
          activeOpacity={1}
          onPress={() => setModalVisible(false)}
          style={styles.backdrop}
        />


        <View style={styles.modalView}>

          <View style={styles.innerModelView}>

            <View style={styles.dragHandle} />
            <KeyboardAwareScrollView
              enableOnAndroid
              enableAutomaticScroll
              keyboardOpeningTime={0}
              keyboardShouldPersistTaps="handled"
              extraScrollHeight={10}
              showsVerticalScrollIndicator={false}
            >
              <View
                style={{
                  marginTop: 18,
                  marginBottom: 30,
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  width: '70%',
                }}
              >
                <TouchableOpacity onPress={() => setModalVisible(false)}>
                  <EvilIcons name={'close'} size={20} color={colors.black} />
                </TouchableOpacity>
                <CustomText style={[styles.sortingTitle, textStyle]}>
                  {title}
                </CustomText>
              </View>
              {children}
            </KeyboardAwareScrollView>

          </View>

        </View>
      </View>
    </Modal>
  );
};

export default CustomModal;

const styles = StyleSheet.create({
  inputBox: {
    marginTop: 30,
  },
  filterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 12,
    marginBottom: 25,
  },

  centeredView: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  backdrop: {
    backgroundColor: '#00000040',
    flex: 1,
  },
  modalView: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    backgroundColor: '#00000040',
  },
  dragHandle: {
    width: 50,
    height: 4,
    backgroundColor: colors.gray,
    borderRadius: 10,
    marginTop: 10,
    alignSelf: 'center',
  },
  sortingTitle: {
    fontSize: 16,
    fontFamily: fonts.medium,
  },
  innerModelView: {
    backgroundColor: colors.white,
    paddingHorizontal: 25,
  },

  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
