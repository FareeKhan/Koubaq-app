import { StyleSheet, TouchableOpacity, View } from 'react-native';
import React from 'react';
import CustomText from './CustomText';
import { useTranslation } from 'react-i18next';
import { colors } from '../constants/colors';

const FilterButton = ({
  setSelectedFilter,
  selectedFilter,
  leftValue,
  rightValue,
}) => {
  const { t } = useTranslation();

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[
          styles.button,
          selectedFilter === leftValue && styles.selectedButton,
        ]}
        onPress={() => setSelectedFilter(leftValue)}
      >
        <CustomText
          style={[
            styles.text,
            selectedFilter === leftValue && styles.selectedText,
          ]}
        >
          {t(leftValue)}
        </CustomText>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.button,
          selectedFilter === rightValue && styles.selectedButton,
        ]}
        onPress={() => setSelectedFilter(rightValue)}
      >
        <CustomText
          style={[
            styles.text,
            selectedFilter === rightValue && styles.selectedText,
          ]}
        >
             {t(rightValue)}
        </CustomText>
      </TouchableOpacity>
    </View>
  );
};

export default FilterButton;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderRadius: 50,
    borderColor: colors.primary,
    backgroundColor: colors.secondary,
    marginBottom:20
  },
  button: {
    width: '50%',
    paddingVertical: 15,
    alignItems: 'center',
    borderRadius: 50,
  },
  selectedButton: {
    backgroundColor: colors.primary,
  },
  text: {
    color: colors.black,
  },
  selectedText: {
    color: colors.white,
  },
});
