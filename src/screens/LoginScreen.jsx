// import { Image, Platform, StyleSheet, View } from 'react-native';
// import React, { useState } from 'react';

// import { useTranslation } from 'react-i18next';
// import { colors } from '../constants/colors';
// import { fonts } from '../constants/fonts';
// import ScreenView from '../components/ScreenView';
// import CustomButton from '../components/CustomButton';
// import CustomText from '../components/CustomText';
// import CustomInput from '../components/CustomInput';
// import HeaderBox from '../components/HeaderBox';
// import CheckBox from '@react-native-community/checkbox';
// import { useNavigation } from '@react-navigation/native';
// import Animated, {
//   FadeIn,
//   FadeInDown,
//   SlideInDown,
//   SlideInUp,
// } from 'react-native-reanimated';

// const LoginScreen = ({}) => {
//   const { t } = useTranslation();
//   const navigation = useNavigation();

//   const [firstName, setFirstName] = useState('');
//   const [lastName, setLastName] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [isLaoder, setIsLoader] = useState(false);
//   const [toggleCheckBox, setToggleCheckBox] = useState(false);

//   const onPressContinue = async () => {
//     navigation.navigate('VerificationScreen');
//   };

//   return (
//     <ScreenView scrollable={true}>
//       <Image
//         source={require('../assets/logo.png')}
//         style={[{ height: 33, width: 80, alignSelf: 'center', marginTop: 10 }]}
//       />

//       <Animated.View entering={FadeInDown.delay(50)}>
//         <CustomText style={styles.titleText}>{t('createAccount')}</CustomText>
//       </Animated.View>

//       <Animated.View entering={FadeInDown.delay(100)}>
//         <CustomInput
//           placeholder={t('firstName')}
//           value={firstName}
//           onChangeText={setFirstName}
//         />
//       </Animated.View>

//       <Animated.View entering={FadeInDown.delay(200)}>
//         <CustomInput
//           placeholder={t('lastName')}
//           value={lastName}
//           onChangeText={setLastName}
//         />
//       </Animated.View>

//       <Animated.View entering={FadeInDown.delay(300)}>
//         <CustomInput
//           placeholder={t('email')}
//           value={email}
//           onChangeText={setEmail}
//         />
//       </Animated.View>

//       <Animated.View entering={FadeInDown.delay(400)}>
//         <CustomInput
//           placeholder={t('password')}
//           value={password}
//           onChangeText={setPassword}
//         />
//       </Animated.View>
//       <Animated.View entering={FadeInDown.delay(700)}>
//         <CustomText style={styles.passwordHint}>
//           {t('PaswordShouldBe')}
//         </CustomText>

//         <View style={styles.checkboxContainer}>
//           <CheckBox
//             boxType="square"
//             value={toggleCheckBox}
//             onValueChange={setToggleCheckBox}
//             onFillColor={colors.gray1}
//             tintColor={colors.gray1}
//             onCheckColor={colors.white}
//             onTintColor={colors.gray1}
//             tintColors={{ true: colors.gray1, false: colors.gray1 }}
//           />
//           <CustomText>{t('CheckBoxText')}</CustomText>
//         </View>

//         <CustomButton
//           title={t('createAccount')}
//           onPress={onPressContinue}
//           style={styles.btnStyle}
//           loader={isLaoder}
//         />
//       </Animated.View>
//     </ScreenView>
//   );
// };

// export default LoginScreen;

// const styles = StyleSheet.create({
//   titleText: {
//     fontFamily: fonts.medium,
//     fontSize: 19,
//     textAlign: 'left',
//     marginTop: 60,
//     marginBottom: 30,
//   },
//   passwordHint: {
//     fontSize: 13,
//     marginTop: -10,
//     color: colors.black1,
//   },
//   checkboxContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     gap: Platform.OS == 'ios' ? 10 : 0,
//     marginTop: 30,
//     marginBottom: 10,
//     marginLeft:5
//   },
//   btnStyle: {
//     marginTop: 20,
//   },
// });










import { Dimensions, Image, Platform, StyleSheet, View } from 'react-native';
import React, { useState } from 'react';

import { useTranslation } from 'react-i18next';
import { colors } from '../constants/colors';
import { fonts } from '../constants/fonts';
import ScreenView from '../components/ScreenView';
import CustomButton from '../components/CustomButton';
import CustomText from '../components/CustomText';
import CustomInput from '../components/CustomInput';
import HeaderBox from '../components/HeaderBox';
import CheckBox from '@react-native-community/checkbox';
import { useNavigation } from '@react-navigation/native';
import Animated, {
  FadeIn,
  FadeInDown,
  SlideInDown,
  SlideInUp,
} from 'react-native-reanimated';
import { showMessage } from 'react-native-flash-message';
import { loginPhoneNo } from '../userServices/UserService';

const LoginScreen = ({route }) => {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const {isBasket} = route?.params || ''

  const [phoneNo, setphoneNo] = useState('');
  const [isLaoder, setIsLoader] = useState(false);
  const [toggleCheckBox, setToggleCheckBox] = useState(false);

  const LoginPhone = async () => {
    if (phoneNo == '' || phoneNo?.length !== 10) {
      showMessage({
        message: (phoneNo?.length !== 10) ? t('noCorrect') : t('enterPhoneNo'),
        type: "danger",
      });
      return
    }
    const PhoneWithCountryCode = phoneNo;
    try {
      setIsLoader(true)
      const result = await loginPhoneNo(PhoneWithCountryCode);
      if (result?.success) {
        showMessage({
          message: `Your OTP is ${result?.data?.otp}`,
          type: "success"
        })
        navigation.navigate('VerificationScreen', {
          phoneNo: PhoneWithCountryCode,
          otpCode: result?.data?.otp,
          isBasket:isBasket

        });
      }
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoader(false)
    }
  };




  return (
    <ScreenView style={{ paddingTop: 150 }} scrollable={true}>


      <Image
        source={require('../assets/logo.png')}
        style={[{ height: 33, width: 80, alignSelf: 'center', marginTop: 10 }]}
      />

      <Animated.View entering={FadeInDown.delay(50)}>
        <CustomText style={styles.titleText}>{t('EnterPhone')}</CustomText>
      </Animated.View>

      <Animated.View entering={FadeInDown.delay(100)}>
        <CustomInput
          placeholder={t('phoneNo')}
          value={phoneNo}
          onChangeText={setphoneNo}
        />
      </Animated.View>

      <Animated.View entering={FadeInDown.delay(700)}>
        <View style={styles.checkboxContainer}>
          <CheckBox
            boxType="square"
            value={toggleCheckBox}
            onValueChange={setToggleCheckBox}
            onFillColor={colors.gray1}
            tintColor={colors.gray1}
            onCheckColor={colors.white}
            onTintColor={colors.gray1}
            tintColors={{ true: colors.gray1, false: colors.gray1 }}
          />
          <CustomText>{t('CheckBoxText')}</CustomText>
        </View>

        <CustomButton
          title={t('login')}
          onPress={LoginPhone}
          style={styles.btnStyle}
          loader={isLaoder}
        />
      </Animated.View>

    </ScreenView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  titleText: {
    fontFamily: fonts.medium,
    fontSize: 16,
    textAlign: 'left',
    marginTop: 60,
    marginBottom: 30,
  },
  passwordHint: {
    fontSize: 13,
    marginTop: -10,
    color: colors.black1,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Platform.OS == 'ios' ? 10 : 0,
    marginBottom: 10,
    marginLeft: 5
  },
  btnStyle: {
    marginTop: 20,
  },
});
