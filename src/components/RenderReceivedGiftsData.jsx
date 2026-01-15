// import React from 'react';
// import { FlatList, StyleSheet, View } from 'react-native';
// import Animated, {
//   Easing,
//   runOnJS,
//   useAnimatedStyle,
//   useSharedValue,
//   withTiming,
// } from 'react-native-reanimated';
// import { useTranslation } from 'react-i18next';

// import GiftImage from './GiftImage';
// import CustomButton from './CustomButton';
// import EmptyData from './EmptyData';

// /* ---------------------------------- */
// /* Per Item Card (IMPORTANT) */
// /* ---------------------------------- */
// const ReceivedGiftCard = ({
//   item,
//   index,
//   isReceiverSender,
//   setIsReceiverSender,
//   setIsShowSenderDetail,
// }) => {
//   const { t } = useTranslation();
//   const rotateY = useSharedValue(0);

//   const animatedStyle = useAnimatedStyle(() => ({
//     transform: [
//       { perspective: 1000 }, // 👈 REQUIRED for 3D
//       { rotateY: `${rotateY.value}deg` },
//     ],
//   }));

//   const flipCard = () => {
//     rotateY.value = withTiming(
//       rotateY.value === 0 ? 180 : 0,
//       {
//         duration: 500,
//         easing: Easing.inOut(Easing.cubic),
//       },
//       () => {
//         runOnJS(setIsShowSenderDetail)(item);
//       }
//     );
//   };

//   return (
//     <View>
//       {/* FRONT / IMAGE */}
//       {isReceiverSender === index ? (
//         <GiftImage
//           handleHidePress={() => setIsReceiverSender(null)}
//           onPress={() => setIsReceiverSender(null)}
//           imagePath={item?.gift_theme}
//           label={item?.gift_message}
//           senderName={item?.sender?.phone_number}
//         />
//       ) : (
//         <Animated.View style={[styles.cardContainer, animatedStyle]}>
//           <GiftImage style={{ width: '100%' }} imagePath={item?.gift_theme} />
//         </Animated.View>
//       )}

//       {/* ACTION BUTTONS */}
//       <View style={styles.receivedButtonsRow}>
//         {isReceiverSender !== index && (
//           <CustomButton
//             title={t('showSender')}
//             onPress={() => setIsReceiverSender(index)}
//             style={styles.receiverSenderButton}
//             btnTxtStyle={styles.receiverSenderBtnText}
//           />
//         )}

//         <CustomButton
//           title={t('showAllDetails')}
//           onPress={flipCard}
//           style={styles.receiverSenderButton}
//           btnTxtStyle={styles.receiverSenderBtnText}
//         />
//       </View>
//     </View>
//   );
// };

// /* ---------------------------------- */
// /* FlatList Wrapper */
// /* ---------------------------------- */
// const RenderReceivedGiftsData = ({
//   data,
//   isReceiverSender,
//   setIsReceiverSender,
//   setIsShowSenderDetail,
// }) => {
//   return (
//     <FlatList
//       data={data}
//       keyExtractor={(item, index) => index.toString()}
//       renderItem={({ item, index }) => (
//         <ReceivedGiftCard
//           item={item}
//           index={index}
//           isReceiverSender={isReceiverSender}
//           setIsReceiverSender={setIsReceiverSender}
//           setIsShowSenderDetail={setIsShowSenderDetail}
//         />
//       )}
//       ListEmptyComponent={<EmptyData />}
//       showsVerticalScrollIndicator={false}
//     />
//   );
// };

// export default RenderReceivedGiftsData;

// /* ---------------------------------- */
// /* Styles */
// /* ---------------------------------- */
// const styles = StyleSheet.create({
//   cardContainer: {
//     width: '100%',
//   },
//   receivedButtonsRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     paddingHorizontal: 20,
//     marginTop: 10,
//     marginBottom: 25,
//   },
//   receiverSenderButton: {
//     backgroundColor: '#F4F4F4',
//     borderWidth: 1,
//     height: 31,
//     width: 120,
//     borderRadius: 5,
//     borderColor: '#7A4DFF',
//   },
//   receiverSenderBtnText: {
//     fontSize: 11,
//     color: '#7A4DFF',
//   },
// });











import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, View, Pressable } from 'react-native';
import Animated, {
    Easing,
    runOnJS,
    useAnimatedStyle,
    useSharedValue,
    withTiming,
} from 'react-native-reanimated';

import GiftImage from './GiftImage';
import EmptyData from './EmptyData';
import { colors } from '../constants/colors';
import CustomText from './CustomText';
import { useTranslation } from 'react-i18next';
import { fonts } from '../constants/fonts';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'


const ReceivedGiftCard = ({ item, setIsShowSenderDetail, isFlipped }) => {
    const rotateY = useSharedValue(0);
    const { t } = useTranslation()
    const [cardHeight, setCardHeight] = useState(null);

    useEffect(() => {
        rotateY.value = withTiming(isFlipped ? 180 : 0, {
            duration: 500,
            easing: Easing.inOut(Easing.cubic),
        });
    }, [isFlipped]);

    const frontStyle = useAnimatedStyle(() => ({
        transform: [
            { perspective: 1000 },
            { rotateY: `${rotateY.value}deg` },
        ],
    }));

    const backStyle = useAnimatedStyle(() => ({
        transform: [
            { perspective: 1000 },
            { rotateY: `${rotateY.value + 180}deg` },
        ],
    }));

    const flipCard = () => {
        rotateY.value = withTiming(
            rotateY.value === 0 ? 180 : 0,
            {
                duration: 500,
                easing: Easing.inOut(Easing.cubic),
            },
            () => {
                runOnJS(setIsShowSenderDetail)(item);
            }
        );
    };

    return (
        <View style={styles.wrapper}>
            {/* FRONT — BLACK COVER (same height as card) */}
            {cardHeight && (
                <Animated.View
                    style={[
                        styles.blackCard,
                        { height: 200 },
                        frontStyle,
                    ]}
                >
                    <Pressable style={{ flex: 1 }} onPress={flipCard} >
                        <View>
                            <CustomText style={{ color: colors.white, fontSize: 18, fontFamily: fonts.bold, marginTop: 30, marginLeft: 20 }}>{item?.recipient_name}</CustomText>
                            <View style={{ marginTop: 30, marginLeft: 20, flexDirection: "row", gap: 10, alignItems: "center" }}>
                                <MaterialIcons name={'flip'} size={20} color={colors.white} />
                                <CustomText style={{ color: colors.white, fontFamily: fonts.bold, }}>{t('flipCard')}</CustomText>
                            </View>
                        </View>
                        <View style={{ marginTop: "auto", bottom: -40, borderWidth: 1, paddingVertical: 10, borderTopWidth: 0, borderBottomLeftRadius: 10, borderBottomRightRadius: 10, paddingHorizontal: 10, borderColor: colors.gray4 }}>
                            <CustomText>{t('sender')}: {item?.sender?.name || item?.sender?.phone_number}</CustomText>
                        </View>
                    </Pressable>

                </Animated.View>
            )}

            {/* BACK — REAL GIFT CARD */}
            <Animated.View
                style={[styles.backCard, backStyle]}
                onLayout={(e) => {
                    if (!cardHeight) {
                        setCardHeight(e.nativeEvent.layout.height);
                    }
                }}
            >
                <Pressable onPress={flipCard}>
                    <GiftImage
                        imagePath={item?.gift_theme}
                        label={item?.gift_message}
                        senderName={item?.sender?.phone_number}
                    />
                </Pressable>
            </Animated.View>
        </View>
    );
};


const RenderReceivedGiftsData = ({ data, setIsShowSenderDetail, isShowSenderDetail }) => {

    return (
        <FlatList
            data={data}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
                <ReceivedGiftCard
                    item={item}
                    isFlipped={isShowSenderDetail === item?.id}
                    setIsShowSenderDetail={setIsShowSenderDetail}
                />
            )}
            ListEmptyComponent={<EmptyData />}
            showsVerticalScrollIndicator={false}
        />
    );
};

export default RenderReceivedGiftsData;

const styles = StyleSheet.create({
    wrapper: {
        width: '100%',
        marginBottom: 25,
    },

    blackCard: {
        position: 'absolute',
        width: '100%',
        backgroundColor: colors.primary,
        backfaceVisibility: 'hidden',
        zIndex: 2,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10
    },

    backCard: {
        backfaceVisibility: 'hidden',
    },
});
