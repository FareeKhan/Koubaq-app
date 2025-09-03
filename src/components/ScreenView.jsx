import { Platform, ScrollView, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { colors } from '../constants/colors';

const ScreenView = ({ scrollable, children, style,mh ,growFlex,extraBottomSpace}) => {
  return (
    <View style={[styles.container, style]}>
      {scrollable ? (
        <ScrollView
          style={[mh && {marginHorizontal:-20}]}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={[{ paddingBottom: 100 },growFlex && {paddingBottom: 25,flexGrow:1},extraBottomSpace && {paddingBottom:150}]}
        >
          {children}
        </ScrollView>
      ) : (
        children
      )}
    </View>
  );
};

export default ScreenView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    paddingHorizontal: 20,
    paddingTop: Platform.OS == 'ios' ? 65 : 45,
  },
});

// marginHorizontal:-20,paddingHorizontal:20
