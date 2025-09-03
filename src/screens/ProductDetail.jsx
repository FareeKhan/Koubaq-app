import {
  I18nManager,
  ImageBackground,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useState } from 'react';
import ScreenView from '../components/ScreenView';
import HeaderBox from '../components/HeaderBox';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { colors } from '../constants/colors';
import FilterButton from '../components/FilterButton';
import HeaderWithAll from '../components/HeaderWithAll';
import { useTranslation } from 'react-i18next';
import CustomText from '../components/CustomText';
import { fonts } from '../constants/fonts';
import Feather from 'react-native-vector-icons/Feather';
import Subtitle from '../components/Subtitle';
import { birthdayWishes, currency, extraData } from '../constants/data';
import DividerLine from '../components/DividerLine';
import CustomButton from '../components/CustomButton';
import CustomInput from '../components/CustomInput';
import IncrementDecrement from '../components/IncrementDecrement';
import ProductDataCard from '../components/ProductDataCard';
import SuggestedMsgsModal from '../components/SuggestedMsgsModal';
import { useNavigation } from '@react-navigation/native';

const ProductDetail = ({ route }) => {
  const { t } = useTranslation();
  const { isGifterPage } = route?.params || '';

  const navigation = useNavigation();

  const [counter, setCounter] = useState(1);
  const [data, setData] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState('customizeItem');
  const [modalVisible, setModalVisible] = useState(false);
  const [rcvrNameOnSticker, setRcvrNameOnSticker] = useState('');
  const [msgForReceiver, setMsgForReceiver] = useState('');

  const onPressCheckBox = item => {
    if (data?.includes(item?.id)) {
      setData(innerData => innerData.filter(inner => inner !== item?.id));
    } else {
      setData(innerData => [...innerData, item?.id]);
    }
  };

  const incrementCounter = () => setCounter(counter + 1);
  const decrementCounter = () => {
    if (counter > 1) setCounter(counter - 1);
  };

  const ExtraDataItems = () => {
    return extraData?.map((item, index) => (
      <TouchableOpacity
        key={index}
        style={styles.extraItem}
        onPress={() => onPressCheckBox(item)}
      >
        <CustomText>{item?.name}</CustomText>
        <View
          style={[
            {
              width: 15,
              height: 15,
              borderWidth: 1,
              borderColor: colors.black,
            },
            data?.includes(item?.id) && { backgroundColor: colors.primary },
          ]}
        >
          {data?.includes(item?.id) && (
            <Feather name={'check'} color={colors.white} size={13} />
          )}
        </View>
      </TouchableOpacity>
    ));
  };
  const handleRandomlySelectMsg = ()=>{
    const selectIndex = Math.floor(Math.random() * birthdayWishes?.length)
    setMsgForReceiver(birthdayWishes[selectIndex]?.message)
  }

  return (
    <View style={styles.container}>
      <ScreenView scrollable={true} mh={true} extraBottomSpace={true}>
        {/* Image Section */}
        <ImageBackground
          style={styles.productImage}
          source={require('../assets/productImage.png')}
        >
          <HeaderBox
            style={styles.headerBox}
            search={false}
            notification={false}
            heart={true}
          />

          <TouchableOpacity style={styles.shareButton}>
            <Ionicons
              name={'share-social-outline'}
              color={colors.black}
              size={25}
            />
          </TouchableOpacity>
        </ImageBackground>

        {/* Filter Button */}
        <View style={styles.contentWrapper}>
          <FilterButton
            setSelectedFilter={setSelectedFilter}
            selectedFilter={selectedFilter}
            leftValue={'customizeItem'}
            rightValue={'customizeSticker'}
          />
          {/* Code after Filer this is customizeItem */}
          {selectedFilter === 'customizeItem' ? (
            <View>
              <HeaderWithAll
                title={t('Espresso single shot Ethiopian beans - Hot')}
                style={styles.headerTitle}
              />

              <View style={styles.priceRow}>
                <CustomText style={styles.aedText}>
                  {currency}{' '}
                  <CustomText style={styles.priceText}>31</CustomText>
                </CustomText>

                <IncrementDecrement
                  pCounter={counter}
                  setCounter={setCounter}
                  onpressPlus={incrementCounter}
                  onpressMinu={decrementCounter}
                />
              </View>

              <CustomText style={styles.descriptionLabel}>
                {t('Descitpion')}
              </CustomText>
              <CustomText style={styles.descriptionText}>
                Espresso single shot ethiopian beans Espresso single shot
              </CustomText>

              <View style={styles.extrasHeader}>
                <CustomText style={styles.extrasTitle}>
                  {t('extras')}
                </CustomText>
                <CustomText style={styles.optionalLabel}>
                  {t('Optional')}
                </CustomText>
              </View>

              <Subtitle style={styles.subtitle}>{t('choseUptoSix')}</Subtitle>

              <ExtraDataItems />

              <DividerLine />

              {!isGifterPage && (
                <View style={styles.noteBox}>
                  <View style={styles.noteHeader}>
                    <Ionicons
                      name={'chatbox-outline'}
                      size={15}
                      color={colors.black}
                    />
                    <CustomText style={styles.noteLabel}>
                      {t('AddANot')}
                    </CustomText>
                  </View>
                  <TextInput
                    placeholder={t('AnythingElse')}
                    multiline
                    placeholderTextColor={colors.gray1}
                    style={styles.noteInput}
                    value={rcvrNameOnSticker}
                    onChangeText={setRcvrNameOnSticker}
                  />
                </View>
              )}
            </View>
          ) : (
            <View>
              <View style={{ alignItems: 'center', marginTop: 20 }}>
                <ImageBackground
                  source={require('../assets/bucket.png')}
                  style={{ width: 250, height: 300 }}
                >
                  <View
                    style={{
                      top: 90,
                      alignSelf: 'center',
                      borderRadius: 7,
                      paddingHorizontal: 5,
                      alignItems: 'center',
                      backgroundColor: colors.white,
                      width: '50%',
                      paddingTop: 10,
                    }}
                  >
                    <CustomText numberOfLines={1} style={{ fontSize: 10 }}>
                      Parkero Shop
                    </CustomText>
                    <CustomText
                      numberOfLines={2}
                      style={{
                        fontSize: 10,
                        fontFamily: fonts.semiBold,
                        marginTop: 10,
                        textAlign: 'center',
                      }}
                    >
                      {msgForReceiver}
                    </CustomText>
                    <CustomText
                      numberOfLines={1}
                      style={{ fontSize: 10, fontFamily: fonts.medium }}
                    >
                      {rcvrNameOnSticker}
                    </CustomText>
                    <CustomText
                      numberOfLines={1}
                      style={{ marginVertical: 10, fontSize: 10 }}
                    >
                      Espresso single shot
                    </CustomText>

                    <CustomText style={{ fontSize: 8 }}>
                      Ready at: 00:00 AM
                    </CustomText>
                    <CustomText style={{ fontSize: 8 }}>
                      Order Number: XXX
                    </CustomText>
                    <CustomText style={{ fontSize: 8 }}>
                      Car Number: XXXXX
                    </CustomText>

                    <CustomText
                      style={{ marginTop: 20, marginBottom: 5, fontSize: 10 }}
                    >
                      Powered by Koubak
                    </CustomText>
                  </View>
                </ImageBackground>
              </View>

              <DividerLine style={styles.stickerDivider} />
              <CustomInput
                label={t('nameOnSticker')}
                placeholder={'Name'}
                rs={true}
                value={rcvrNameOnSticker}
                onChangeText={setRcvrNameOnSticker}
              />

              <CustomInput
                label={t('messageOnSticker')}
                placeholder={t('messageOnSticker')}
                rs={true}
                multiline
                style={styles.messageInput}
                inputExtraStyle={styles.messageInputExtra}
                value={msgForReceiver}
                onChangeText={setMsgForReceiver}
              />

              <TouchableOpacity onPress={handleRandomlySelectMsg} style={styles.refreshRow}>
                <Ionicons name={'refresh'} size={18} color={colors.black} />
                <CustomText style={styles.underlineText}>
                  {t('letusChose')}
                </CustomText>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.selectRow}
                onPress={() => setModalVisible(true)}
              >
                <Ionicons
                  name={'list-outline'}
                  size={18}
                  color={colors.black}
                />
                <CustomText style={styles.underlineText}>
                  {t('letSelect')}
                </CustomText>
              </TouchableOpacity>

              <SuggestedMsgsModal
                setModalVisible={setModalVisible}
                modalVisible={modalVisible}
                setSelectedMsg={setMsgForReceiver}
              />
            </View>
          )}

          {/* */}

          {isGifterPage && (
            <View style={{ marginTop: 15 }}>
              <HeaderWithAll title={t('relatedProduct')} />

              <ProductDataCard data={[1, 2, 3, 4, 5, 6]} />
            </View>
          )}
        </View>
      </ScreenView>

      <View style={styles.buttonContainer}>
        <CustomButton
          totalPrice={'31.00'}
          title={isGifterPage ? 'continueRcvr' : 'AddToCart'}
          counter={counter}
          onPress={() => {
            isGifterPage
              ? navigation.navigate('GiftFilterScreen', {
                  thirdStepContinue: [1, 2],
                })
              : navigation.navigate('BasketScreen');
          }}
        />
      </View>
    </View>
  );
};

export default ProductDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  productImage: {
    width: '100%',
    height: 300,
  },
  headerBox: {
    paddingHorizontal: 20,
  },
  shareButton: {
    position: 'absolute',
    bottom: 15,
    right: 20,
  },
  contentWrapper: {
    paddingHorizontal: 20,
    marginVertical: 15,
  },
  headerTitle: {
    width: '70%',
    marginBottom: 5,
    marginTop: 20,
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  aedText: {
    color: colors.gray1,
    fontSize: 17,
  },
  priceText: {
    fontSize: 28,
    fontFamily: fonts.semiBold,
  },
  counterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 10,
    borderColor: colors.gray,
  },
  descriptionLabel: {
    fontFamily: fonts.semiBold,
    marginVertical: 10,
  },
  descriptionText: {
    width: '80%',
    marginBottom: 15,
  },
  extrasHeader: {
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  extrasTitle: {
    fontFamily: fonts.semiBold,
  },
  optionalLabel: {
    backgroundColor: colors.gray5,
    paddingHorizontal: 5,
    borderRadius: 50,
    fontSize: 13,
  },
  subtitle: {
    fontSize: 13,
    marginBottom: 15,
  },
  extraItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  checkbox: {
    borderRadius: 0,
  },
  noteBox: {
    borderWidth: 1,
    height: 140,
    borderColor: colors.gray5,
    padding: 10,
    borderRadius: 10,
    marginTop: 20,
  },
  noteHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  noteLabel: {
    color: colors.black,
  },
  noteInput: {
    color: colors.black,
    height: 100,
    textAlign: I18nManager.isRTL ? 'right' : 'left',
    fontFamily: fonts.regular,
    textAlignVertical: 'top',
  },
  buttonContainer: {
    position: 'absolute',
    width: '90%',
    bottom: 100,
    alignSelf: 'center',
  },
  stickerDivider: {
    marginVertical: 10,
    marginBottom: 20,
  },
  messageInput: {
    height: 100,
  },
  messageInputExtra: {
    height: 90,
  },
  refreshRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
    marginBottom: 10,
    marginTop: 15,
  },
  selectRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
  },
  underlineText: {
    textDecorationLine: 'underline',
  },
});
