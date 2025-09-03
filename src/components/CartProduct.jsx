import { Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { colors } from '../constants/colors'
import Entypo from 'react-native-vector-icons/Entypo'
import CustomText from './CustomText'
import { fonts } from '../constants/fonts'
import { decrementCounter, incrementCounter } from '../redux/ProductAddToCart'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { removeHTMLCode } from '../constants/helper'
import { showMessage } from 'react-native-flash-message'

const CartProduct = ({ item, isCounter, isQuantity }) => {
    const dispatch = useDispatch()

    const data = useSelector(state => state.cart?.cartProducts);

    const { t } = useTranslation()

    const onPressDecrement = () => {
        dispatch(decrementCounter(item?.id))
    }


    const onPressIncrement = () => {
        // dispatch(incrementCounter(item?.id))

            const checkStock = data?.find((i) => i?.id == item?.id)
        if (checkStock?.counter < item?.Variants_stock) {
            dispatch(incrementCounter(item?.id));
        }else{
            showMessage({
                type:"warning",
                message:t('noMoreStock')
            })
        }
    }

    return (
        <View style={{ flexDirection: "row", gap: 15, alignItems: "center", backgroundColor: colors.white }}>
            <View style={styles.cartImg}>
                <ImageBackground style={styles.innerImg} source={{ uri: item?.image }} >
                    {
                        isQuantity &&
                        <View style={{ width: 22, height: 22, borderRadius: 50, backgroundColor: colors.primary, alignItems: "center", justifyContent: "center", marginLeft: 'auto', margin: 5 }}>
                            <CustomText style={[styles.boldText, styles.itemQuantity, { color: colors.white, fontSize: 12 }]}>X{item?.counter}</CustomText>
                        </View>
                    }
                </ImageBackground>
            </View>



            <View style={{ justifyContent: "space-between", width: "47%" }}>
                <CustomText numberOfLines={2} style={styles.productName}>{item?.productName}</CustomText>

                <CustomText numberOfLines={2} style={styles.sizeTxt}>{removeHTMLCode(item?.description)}</CustomText>

                {
                    Object.entries(item?.Variants || {}).map(([key, value]) => {
                        if (key === "undefined" || value === undefined) return null;
                        return (
                            <CustomText key={key} numberOfLines={2}>
                                {key}: {value}
                            </CustomText>
                        );
                    })
                }

                <CustomText style={{ color: colors.black1, fontFamily: fonts.bold }}>AED {item?.price}</CustomText>
            </View>


            {
                isCounter &&
                <View style={styles.priceCounterContainer}>
                    {/* <CustomText style={styles.price}>AED {item?.price}</CustomText> */}
                    <View style={{ flexDirection: "row", gap: 5, height: 100, alignItems: "flex-end" }}>
                        <TouchableOpacity onPress={onPressDecrement}>
                            <Entypo name={'squared-minus'} size={23} color={colors.green} />
                        </TouchableOpacity>

                        <CustomText style={styles.counter}>{item?.counter}</CustomText>

                        <TouchableOpacity onPress={onPressIncrement}>
                            <Entypo name={'squared-plus'} size={23} color={colors.green} />
                        </TouchableOpacity>
                    </View>
                </View>
            }
        </View>
    )
}

export default CartProduct
const styles = StyleSheet.create({
    cartImg: {
        width: 90,
        height: 90,
        backgroundColor: colors.primary?.concat(30),
        // borderRadius: 10,
        alignItems: "center",
        // paddingBottom: 70,
        // width: "23%",
    },
    innerImg: {
        width: 90,
        height: 90,
    },
    productName: {
        fontFamily: fonts.semiBold,
        fontSize: 15
    },
    sizeTxt: {
        fontFamily: fonts.semiBold,
        fontSize: 12
    },
    priceCounterContainer: {
        justifyContent: "flex-end",
        marginLeft: "auto",
        width: "30%",
    },
    price: {
        fontFamily: fonts.bold,
        fontSize: 17,
        textAlign: "left"
    },
    counter: {
        fontFamily: fonts.bold,
        fontSize: 16
    }
})