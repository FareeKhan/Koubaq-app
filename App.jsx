import { StatusBar, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigation from './src/Navigation/AppNavigation';
import { store } from './src/redux/store';
import { Provider } from 'react-redux';
import SplashScreen from './src/SplashScreen';
import FlashMessage from 'react-native-flash-message';
import { colors } from './src/constants/colors';
import { fonts } from './src/constants/fonts';
import { STRIPE_KEY } from './src/constants/data';
import { StripeProvider } from '@stripe/stripe-react-native';

const App = () => {

  return (
    <Provider store={store}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <StripeProvider publishableKey={STRIPE_KEY}>
        <NavigationContainer>
          <AppNavigation />
        </NavigationContainer>
      </StripeProvider>

      <FlashMessage position={'top'} floating={true} textProps={{ style: { color: colors.white, fontFamily: fonts.black } }} />
    </Provider>
  );
};

export default App;

const styles = StyleSheet.create({});
