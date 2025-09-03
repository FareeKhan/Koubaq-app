import {
  Dimensions,
  FlatList,
  I18nManager,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useState } from 'react';
import ScreenView from '../components/ScreenView';
import { differentTheme, giftFilters, namesData } from '../constants/data';
import HeaderBox from '../components/HeaderBox';
import { useTranslation } from 'react-i18next';
import CustomText from '../components/CustomText';
import Subtitle from '../components/Subtitle';
import { colors } from '../constants/colors';
import HeaderWithAll from '../components/HeaderWithAll';
import ShopsDataCard from '../components/ShopsDataCard';
import ShopDetail from './ShopDetail';
import { fonts } from '../constants/fonts';
const { width } = Dimensions.get('screen');
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import CustomButton from '../components/CustomButton';
import CheckBox from '@react-native-community/checkbox';
import CustomInput from '../components/CustomInput';
import SuggestedMsgsModal from '../components/SuggestedMsgsModal';
import CheckoutScreen from './CheckoutScreen';
import CartProducts from '../components/CartProducts';

const GiftFilterScreen = ({route}) => {
  const { t } = useTranslation();
  const giftData = giftFilters(t);
  const {thirdStepContinue} = route?.params || ''

  const [selectedFilter, setSelectedFilter] = useState(thirdStepContinue?thirdStepContinue:[1]);
  const [selectedTheme, setSelectedTheme] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedMsg, setSelectedMsg] = useState('');
    const [msg, setMsg] = useState('');
    const [isSelectedShop,setIsSelectedShop] = useState(false)
    const [selectThemeCard,setSelectThemeCard] = useState(false)
  

  const handleFilterBox = clickedId => {
    const selectedIds = giftData
      .filter(item => item.id <= clickedId)
      .map(item => item.id);
    setSelectedFilter(selectedIds);
  };

  // Content Data Here
  const HorizontalFilterBox = () => {
    return (
      <View style={styles.filterBoxContainer}>
        {giftData?.map((item, index) => {
          const isSelected = selectedFilter.includes(item?.id);
          return (
            <View key={index} style={styles.filterItemContainer}>
              <TouchableOpacity onPress={() => handleFilterBox(item?.id)}>
                <View
                  style={[
                    styles.filterBox,
                    isSelected && styles.filterBoxSelected,
                  ]}
                >
                  {item?.icon}
                </View>
                <Subtitle style={styles.filterSubtitle}>{item?.title}</Subtitle>
              </TouchableOpacity>
              {giftData?.length - 1 !== index && (
                <View style={styles.filterSeparator} />
              )}
            </View>
          );
        })}
      </View>
    );
  };

  const SelectedReceiver = () => {
    return (
      <View>
        {/* Selected Users */}
        <View style={styles.namesContainer}>
          {namesData?.map((item, index) => {
            return (
              <View style={styles.nameItem} key={index}>
                <View
                  style={[styles.outerCircle, { borderColor: item?.color }]}
                >
                  <View
                    style={[
                      styles.innerCircle,
                      {
                        backgroundColor: item?.color,
                        borderColor: item?.color,
                      },
                    ]}
                  >
                    <CustomText style={styles.initialText}>
                      {item?.title?.charAt(0)?.toUpperCase()}
                    </CustomText>
                  </View>

                  <TouchableOpacity style={styles.minusButton}>
                    <AntDesign
                      name="minus"
                      size={15}
                      style={styles.minusIcon}
                      color={colors.white}
                    />
                  </TouchableOpacity>
                </View>
                <CustomText style={styles.nameText}>{item?.title}</CustomText>
              </View>
            );
          })}
        </View>

        <TouchableOpacity
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: 20,
            paddingHorizontal: 12,
            gap: 15,
            borderWidth: 1,
            borderColor: colors.primary2,
            paddingVertical: 10,
            borderRadius: 10,
          }}
        >
          <MaterialIcons name={'contacts'} size={20} color={colors.primary} />
          <CustomText style={{ fontFamily: fonts.medium }}>
            {t('selectFromContacts')}
          </CustomText>
          <Entypo
            name={
              I18nManager.isRTL ? 'chevron-small-left' : 'chevron-small-right'
            }
            size={24}
            color={colors.black}
            style={{ marginLeft: 'auto' }}
          />
        </TouchableOpacity>

        <HeaderWithAll title={t('typePhone')} style={{ marginTop: 12 }} />

        <TouchableOpacity
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: -5,
            paddingHorizontal: 12,
            gap: 15,
            borderColor: colors.primary2,
            paddingVertical: 12,
            borderRadius: 10,
            backgroundColor: colors.primary1,
          }}
        >
          <FontAwesome5 name={'mobile'} size={20} color={colors.primary} />
          <CustomText style={{ fontFamily: fonts.medium }}>
            {t('addNewNumber')}
          </CustomText>
          <Entypo
            name={
              I18nManager.isRTL ? 'chevron-small-left' : 'chevron-small-right'
            }
            size={24}
            color={colors.black}
            style={{ marginLeft: 'auto' }}
          />
        </TouchableOpacity>
      </View>
    );
  };




  const SelectCard = ()=>{
    return(
    <View>
          <HeaderWithAll  title={t('selectTheme')} style={{marginTop:30}} />
          <FlatList 
           data={differentTheme}
           keyExtractor={(item,index)=>index?.toString()}
           numColumns={2}
           columnWrapperStyle={{justifyContent:"space-between"}}
           contentContainerStyle={{gap:20,paddingBottom:100}}
           showsVerticalScrollIndicator={false}
           renderItem={renderItem}
           scrollEnabled={false}
          />
         
         
        <View style={{flex:1,justifyContent:"flex-end",bottom:50}}>
           <CustomButton title={t('continue')} 
           
           onPress={()=>setSelectThemeCard(true)}
           />
         </View> 
    </View> 
    )
  }

  const renderItem = ({ item, index }) => {
    return (
      <TouchableOpacity
        onPress={() => setSelectedTheme(item?.id)}
        key={index}
        style={{
          backgroundColor: colors.white,
          width: '48%',
          borderRadius: 20,
          borderWidth: 2,
          height: 200,
          borderColor: colors.primary,
        }}
      >
        <View
          style={{
            width: '100%',
            height: 155,
            backgroundColor: colors.primary2,
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
          }}
        />
        <CustomText
          style={{
            textAlign: 'center',
            marginTop: 12,
            fontFamily: fonts.semiBold,
            fontSize: 15,
            color: colors.primary,
          }}
        >
          {item?.name}
        </CustomText>

        {selectedTheme == item?.id && (
          <View style={{ position: 'absolute', right: 10, top: 10 }}>
            <MaterialIcons
              name={'check-box'}
              size={30}
              color={colors.primary}
            />
          </View>
        )}
      </TouchableOpacity>
    );
  };

  const lastStep = 
  selectedFilter.length > 0
    ? selectedFilter[selectedFilter.length - 1]
    : null;

  return (
    <ScreenView scrollable={true} >
      <HeaderBox  logo={true} 
        
          {...(isSelectedShop && { onPressBack: () => setIsSelectedShop(false) })}
          {...(selectThemeCard && { onPressBack: () => setSelectThemeCard(false) })}
        />

      <HorizontalFilterBox />

      {/* ***** Shop Card Data ****** */}
      {lastStep == 1 && (
        <>
        {
          isSelectedShop ?
      <View style={{ flex: 1, marginHorizontal: -20 ,marginTop:15}}>
        <ShopDetail
          title={t('The Coffee Merchant ')}
          isHeader={false}
          isGifterPage ={true}
        />
      </View>

      :
<>

<HeaderWithAll title={t('selectShop')} style={{ marginTop: 30 }} />
          <ShopsDataCard data={[1, 2, 3, 4, 5]} onPress={()=>setIsSelectedShop(true)}/>

</>


        }
          


         
        </>
      )}

      {lastStep == 2 && (
        <>
          <HeaderWithAll
            title={t('selectedReceiver')}
            style={{ marginTop: 30 }}
          />
          <SelectedReceiver />

          <View
            style={{ flexGrow: 1, justifyContent: 'flex-end', marginTop: 30  }}
          >
            <CustomButton title={t('continueTheme')}  onPress={()=>setSelectedFilter([1,2,3])}/>
          </View>
        </>
      )}

      {
        lastStep == 3 && (
          <>
          {
       selectThemeCard ?

  <View>
        <HeaderWithAll title={t('cardPreview')} style={{ marginTop: 30 }} />

        <View
          style={{
            backgroundColor: colors.secondary,
            height: 170,
            borderRadius: 10,
            borderBottomLeftRadius: 0,
            padding: 30,
          }}
        >
          <CustomText
            style={{ color: colors.primary, fontFamily: fonts.medium }}
          >
            {t('yourGift')}
          </CustomText>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 3 }}>
            <CustomText
              style={{
                color: colors.primary,
                fontFamily: fonts.bold,
                fontSize: 15,
              }}
            >
              1 item from
            </CustomText>
            <CustomText
              style={{ color: colors.primary, fontFamily: fonts.medium }}
            >
              The Coffee Merchant
            </CustomText>
          </View>
        </View>

        <HeaderWithAll
          title={t('yourName')}
          style={{ marginTop: 30, marginBottom: 5 }}
        />
        <CustomText style={{ marginBottom: 10 }}>{t('shownCard')}</CustomText>

        <CustomInput
          placeholder={t('yourName')}
          rs={true}
          style={{
            backgroundColor: colors.secondary,
          }}
        />

        <HeaderWithAll title={t('addAMessage')} style={{ marginBottom: 6 }} />
        <CustomInput
          placeholder={'haveAGoodDay'}
          rs={true}
          multiline
          style={{
            backgroundColor: colors.secondary,
            borderWidth: 0,
            borderBottomWidth: 0,
          }}
          inputExtraStyle={{ height: 140,    verticalAlign:"top" ,paddingTop:15}}
         value={selectedMsg}
          onChangeText={setSelectedMsg}
        />

        <TouchableOpacity
        onPress={()=>setModalVisible(true)}
          style={{
            backgroundColor: colors.secondary,
            paddingVertical: 10,
            paddingHorizontal: 20,
            borderRadius: 10,
            marginTop: 15,
            marginBottom: 30,
          }}
        >
          <CustomText style={{ fontFamily: fonts.medium }} >
            {t('suggestedMessages')}
          </CustomText>
          <Subtitle style={{ fontSize: 14 }}>{t('selectAmessage')}</Subtitle>
        </TouchableOpacity>

          <CustomButton title={t('continuePayment')}
          onPress={()=>setSelectedFilter([1,2,3,4])}
          
          />

      </View>
          :

          <SelectCard/>

          }

          </>
        )

      }


         {
        lastStep == 4 && (
          <View style={{marginHorizontal:-20}}>
                <CartProducts />

      <Image source={require('../assets/giftCard.png')} style={{width:"91%",marginTop:20,alignSelf:"center"}} borderRadius={10}   /> 
         <CheckoutScreen
         isHeader={false}
         
         />

       
          </View>
        )

      }


      <SuggestedMsgsModal
      setModalVisible={setModalVisible}
      modalVisible={modalVisible}
      setSelectedMsg={setSelectedMsg}
      />
    </ScreenView>
  );
};

export default GiftFilterScreen;

const styles = StyleSheet.create({
  filterBoxContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 30,
  },
  filterItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  filterBox: {
    width: 45,
    height: 44,
    backgroundColor: colors.primary2,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  filterBoxSelected: {
    backgroundColor: colors.primary,
  },
  filterSubtitle: {
    textAlign: 'center',
    marginTop: 5,
    fontSize: 11,
  },
  filterSeparator: {
    width: width / 6.6,
    height: 1,
    backgroundColor: colors.primary1,
    top: -10,
  },
  namesContainer: {
    flexDirection: 'row',
    gap: 15,
  },
  nameItem: {
    alignItems: 'center',
  },
  outerCircle: {
    marginTop: -5,
    borderWidth: 1,
    width: 50,
    height: 50,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  innerCircle: {
    borderWidth: 1,
    width: 42,
    height: 42,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  initialText: {
    fontSize: 18,
    fontFamily: fonts.medium,
  },
  minusButton: {
    position: 'absolute',
    backgroundColor: 'red',
    width: 15,
    height: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
    top: -3,
    right: 0,
  },
  minusIcon: {
    top: -3,
  },
  nameText: {
    marginTop: 5,
    fontSize: 11,
  },
});
