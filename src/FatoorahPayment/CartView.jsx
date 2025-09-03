import React, { useState, useRef, useEffect } from 'react';
import { Animated, View, StyleSheet, Text, Image, SafeAreaView, ScrollView, Pressable, I18nManager } from 'react-native';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import { baseUrl } from '../constants/data';
import { useTranslation } from 'react-i18next';

import { useDispatch, useSelector } from "react-redux";
import { addToCart, decrementQuantity, incrementQuantity, removeFromCart, clearAllCart, getTotal, setDeliveryCharges, setDiscountCharges } from "../../../redux/modules/cart/CartReducer";


const CartView = () => {

  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const { t } = useTranslation();


  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.cart);
  const totalQuantity = useSelector(state => state.cart.totalQuantity);
  const totalAmount = useSelector(state => state.cart.totalAmount);
  const delivery = useSelector(state => state.cart.delivery);
  const discount = useSelector(state => state.cart.discount);

  const [setFavorite, getFavorite] = useState(false);
  const [setRemoveItem, getRemoveItem] = useState(0);
  const [rating, setRating] = useState(0);
  const interval = useRef();
  const [setPromoText, getPromoText] = useState();

  const [setCoponBox, getCoponBox] = useState(true);

  const fadeAnim = useRef(new Animated.Value(1)).current;

  const [isLoading, setLoading] = useState(true);

  const fadeIn = () => {
    // Will change fadeAnim value to 1 in 5 seconds
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  };

  const fadeOut = () => {
    // Will change fadeAnim value to 0 in 3 seconds
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };



  const removeItem = (i, p_ID) => {
    //getRemoveItem(!setRemoveItem);
    //fadeOut();

    interval.current = setInterval(() => {
      getRemoveItem(p_ID);
    }, 500);
  }

  const getPromoCode = async (code) => {

    setLoading(true);
    const url = `${baseUrl}getPromoValid/${code}`;
    const config = {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }
    console.log(url);
    try {
      const response = await fetch(url, config);
      const json = await response.json();
      if (json.promo_code) {
        //console.log(typeof parseFloat(json.promo_code[0].code));
        dispatch(setDiscountCharges({ "type": "remove", "amount": parseFloat(json.promo_code[0].code) }));
        getCoponBox(false);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }

  }

  /***  */

  const addItemToCart = (item) => {
    dispatch(addToCart(item));
    getCartAmount();
  };
  const removeItemFromCart = (item) => {
    dispatch(removeFromCart(item));
    getCartAmount();
  };
  const increaseQuantity = (item) => {
    dispatch(incrementQuantity(item));
    getCartAmount();
  }
  const decreaseQuantity = (item) => {
    if (item.quantity == 1) {
      dispatch(removeFromCart(item));
    } else {
      dispatch(decrementQuantity(item));
    }
    getCartAmount();
  }
  function clearCart() {
    dispatch(clearAllCart());
    getCartAmount();
  }
  function getCartAmount() {
    dispatch(getTotal());
  }
  function deliveryCharges(action) {
    dispatch(setDeliveryCharges(action));
  }
  function discountCharges() {
    getPromoCode(setPromoText);
    if (setPromoText) {

    } else {

    }


  }


  /*** */

  useEffect(() => {

  });

  return (
    <View style={{ position: 'relative', flex: 1 }}>

      {cart.length > 0 ?
        <ScrollView >
          <View style={{ marginHorizontal: 0, marginVertical: 0, }}>
            <View style={{}}>
              {cart.map((item, index) => (
                <>
                <Animated.View
                  key={index}
                  style={[
                    styles.fadingContainer,
                    {
                      opacity: fadeAnim,
                    },
                  ]}>

                  <View style={{ width: '100%', display: setRemoveItem === item.id ? 'flex' : 'flex', height: 64, marginBottom: 25, position: 'relative', backgroundColor: "#ffffff", borderRadius: 12, elevation: 2, shadowColor: "grey", shadowOpacity: 0.5, shadowOffset: 6 }}>

                    <View style={{ flexDirection: 'row', position: 'relative', }}>
                      <View style={{ marginRight: 12 }}>
                        <Image source={{ uri: item.image }} style={{ width: 64, height: 64, borderTopLeftRadius: 12, borderBottomLeftRadius: 12 }} />
                      </View>
                      <View style={{ flexDirection: 'column', justifyContent: 'center', }}>
                        <View style={{ flexDirection: 'row', width: '140%', }}>
                          <Text numberOfLines={1} style={{ color: '#000000', flexWrap: 'wrap', flex: 1, fontSize: 16, textAlign: 'left', fontFamily: I18nManager.isRTL ? 'Cairo-Regular' : 'Metrophobic-Regular' }}>{item.name}</Text>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                          {item.pcolor && <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginRight: 20, }}><Text style={{ color: 'grey', fontSize: 11, marginRight: 2 }}>{t("p_color")} : </Text><Text style={{ color: '#000', fontSize: 11 }}>{item.pcolor}</Text></View>}
                          {item.psize && <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}><Text style={{ color: 'grey', fontSize: 11, marginRight: 2 }}>{t("p_size")} : </Text><Text style={{ color: '#000', fontSize: 11 }}>{item.psize}</Text></View>}
                        </View>
                        <View>
                          <View style={{ flexDirection: 'row', marginTop: 10, marginBottom: 10, justifyContent:'space-between' }}>
                            <Text style={{ color: '#000000', fontSize: 14, fontFamily: I18nManager.isRTL ? 'Cairo-Regular' : 'Metrophobic-Regular', marginHorizontal: 0, justifyContent: 'center' }}>{t("order_text_box_qty")}: {item.quantity}</Text>
                            <Text style={{ color: '#000000', fontSize: 14, fontFamily: I18nManager.isRTL ? 'Cairo-Regular' : 'Metrophobic-Regular' }}>AED {item.qty_price.toFixed(2)}</Text>
                          </View>
                        </View>
                      </View>
                    </View>
                  </View>

                </Animated.View>

             
                </>
              ))}
            </View>

            <View>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 20 }}>
                <Text style={{ color: "grey", fontSize: 14, fontFamily: I18nManager.isRTL ? 'Cairo-Regular' : 'Metrophobic-Regular' }}>{t("sec_text_t_product")} : <Text style={{ fontWeight: 'bold', color: "#000" }}>{cart?.length}</Text></Text>
                <Text style={{ color: "grey", fontSize: 14, fontFamily: I18nManager.isRTL ? 'Cairo-Regular' : 'Metrophobic-Regular' }}>{t("order_text_box_tquatity")} : <Text style={{ fontWeight: 'bold', color: "#000" }}>{totalQuantity}</Text></Text>
              </View>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 20 }}>
                <Text style={{ color: "grey", fontSize: 14, fontFamily: I18nManager.isRTL ? 'Cairo-Regular' : 'Metrophobic-Regular' }}>{t("discount")} :</Text>
                <Text style={{ color: "#000000", fontSize: 18, fontFamily: I18nManager.isRTL ? 'Cairo-Regular' : 'Metrophobic-Regular' }}>AED {discount}</Text>
              </View>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 0 }}>
                <Text style={{ color: "grey", fontSize: 14, fontFamily: I18nManager.isRTL ? 'Cairo-Regular' : 'Metrophobic-Regular' }}>{t("p_total_amout")} :</Text>
                <Text style={{ color: "#000000", fontSize: 18, fontFamily: I18nManager.isRTL ? 'Cairo-Regular' : 'Metrophobic-Regular' }}>AED {totalAmount}</Text>
              </View>

            </View>

          </View>

        </ScrollView>
        : (
          <View style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            height: '90%',
            textAlign: 'center',
          }}>
            <Text style={{ color: 'grey', fontSize: 16, fontFamily: I18nManager.isRTL ? 'Cairo-Regular' : 'Metrophobic-Regular' }}>{t("no_items")}</Text>
          </View>
        )}

    </View>
  );
}

const styles = StyleSheet.create({

  tabNavMain: { flex: 1, position: 'relative' },

  fadingContainer: {
    padding: 0,
  },
  fadingText: {
    fontSize: 28,
  },
  buttonRow: {
    flexBasis: 100,
    justifyContent: 'space-evenly',
    marginVertical: 0,
  },

});

export default CartView;