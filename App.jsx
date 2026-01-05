import { PermissionsAndroid, Platform, StatusBar, StyleSheet, Text, View } from 'react-native';
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
import notifee from '@notifee/react-native';
import messaging, { firebase } from '@react-native-firebase/messaging';


const App = () => {
  useEffect(() => {
    onDisplayNotification('ssdasdasdsas', 'adadasdsasdasss')
  }, [])

  async function requestUserPermission() {
    const authorizationStatus = await messaging().requestPermission({
      sound: true,
      alert: true,
      badge: true,
    });

    if (authorizationStatus) {
      // handle notification here
      const token = await messaging().getToken();
      console.log('asdas', token)
    }
  }

  async function onDisplayNotification(title, body) {
    // Request permissions (required for iOS)
    await notifee.requestPermission()

    // Create a channel (required for Android)
    const channelId = await notifee.createChannel({
      id: 'koubak',
      name: 'Koubak Notifications',
      importance: notifee.AndroidImportance.HIGH,
    });
    // Display a notification
    await notifee.displayNotification({
      title,
      body,
      android: {
        channelId,
        smallIcon: 'ic_notification', // ✅ REQUIRED
        pressAction: {
          id: 'default',
          importance: notifee.AndroidImportance.HIGH,

        },
      },
    });
  }


  const checkApplicationPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
        );
      } catch (error) {
      }
    }

    //console.log(firebase);
    if (Platform.OS === 'ios') {
      const authStatus = await messaging().requestPermission();
      const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;

      if (enabled) {
        //console.log('Authorization status:', authStatus);
      }
    } else {

      const hasPermission = await firebase.messaging().hasPermission();
      const authStatus = await messaging().requestPermission();
      //console.log('hasPermission status:', hasPermission);
      if (hasPermission) {
        const enabled =
          authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
          authStatus === messaging.AuthorizationStatus.PROVISIONAL;
        if (enabled) {
          // console.log('Authorization status:', authStatus);
        } else {
          Alert.alert("POST NOTIFICATIONS REQUIRED");
        }
      } else {
        PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS);
      }
    }

  }


  useEffect(() => {
    checkApplicationPermission();
    async function showNotification(remoteMessage) {
      console.log('ssss', remoteMessage)
      let id = '5';
      // let name = 'SkDeliveryApp';
      let name = 'KuwaitiDeliveryApp';
      const channelId = await notifee.createChannel({
        id,
        name,
      });

      await notifee.displayNotification({
        title: remoteMessage.notification.title,
        body: remoteMessage.notification.body,
        android: {
          channelId,
        },
      });
    }

    requestUserPermission();
    messaging().setBackgroundMessageHandler(showNotification);

    const unsubscribe = messaging().onMessage(async remoteMessage => {
      try {
        console.log('============foreground notification', remoteMessage.notification);
        onDisplayNotification(remoteMessage.notification.title, remoteMessage.notification.body);
      } catch (err) { console.log(err) }
    });

    return unsubscribe;
  }, []);


  const linking = {
    prefix: ["https://koubak-deeplinking.vercel.app"],
    config: {
      screens: {
        BottomNavigation: {
          screens: {
            HomeStack: {
              screens: {
                ProductDetail: 'productDetail/:id',
              }
            }
          }
        }
      }
    }
  }
  return (
    <Provider store={store}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <StripeProvider publishableKey={STRIPE_KEY}>
        <NavigationContainer linking={linking}>
          <AppNavigation />
        </NavigationContainer>
      </StripeProvider>

      <FlashMessage position={'top'} floating={true} textProps={{ style: { color: colors.white, fontFamily: fonts.black } }} />
    </Provider>
  );
};

export default App;

const styles = StyleSheet.create({});
