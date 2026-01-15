import { Dimensions, FlatList, I18nManager, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import FastImage from 'react-native-fast-image';
import CustomText from './CustomText';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Subtitle from './Subtitle';
import { colors } from '../constants/colors';
import HeaderBox from './HeaderBox';
import MapView, { Marker } from 'react-native-maps';
import { fonts } from '../constants/fonts';
import { carNamesArray, mainUrl } from '../constants/data';
import { DEFAULT_TAB_BAR_STYLE } from '../constants/helper';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withSpring,
    useAnimatedScrollHandler,
    interpolate,
} from 'react-native-reanimated';
import { PanGestureHandler } from 'react-native-gesture-handler';
import Entypo from 'react-native-vector-icons/Entypo'
import Geolocation from '@react-native-community/geolocation';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6'


const { height } = Dimensions.get('screen')

const MapViewComp = ({ data, setIsListingView, currentAddress }) => {
    const navigation = useNavigation()
    console.log('currentAddresscurrentAsddress', currentAddress)

    const COLLAPSED_HEIGHT = Platform.OS == 'ios' ? 320 : 275;
    const EXPANDED_HEIGHT = 400;
    const sheetHeight = useSharedValue(COLLAPSED_HEIGHT);
    const scrollY = useSharedValue(0);

    const panRef = useRef();
    const scrollRef = useRef();
    const prevScrollY = useSharedValue(0);
    const [currentPosition, getCurrentPosition] = useState('')
    const mapRef = useRef(null);
    scrollY.value = Math.max(0, scrollY.value);
    const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);
    const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

    const animatedStyle = useAnimatedStyle(() => {
        let height = sheetHeight.value;

        if (sheetHeight.value === COLLAPSED_HEIGHT) {
            height = COLLAPSED_HEIGHT + Math.min(scrollY.value, EXPANDED_HEIGHT - COLLAPSED_HEIGHT);
        }

        return { height };
    });


    const scrollHandler = useAnimatedScrollHandler({
        onScroll: (event) => {
            const currentY = event.contentOffset.y;
            const diff = currentY - prevScrollY.value; // positive = scrolling down, negative = scrolling up

            // Scroll up → expand panel
            if (diff < 0 && sheetHeight.value === COLLAPSED_HEIGHT) {
                sheetHeight.value = withSpring(EXPANDED_HEIGHT);
            }

            // Scroll down → collapse panel
            if (diff > 0 && sheetHeight.value === EXPANDED_HEIGHT && currentY <= 0) {
                sheetHeight.value = withSpring(COLLAPSED_HEIGHT);
            }

            prevScrollY.value = currentY;
        },
    });

    const panGesture = event => {
        const newHeight = sheetHeight.value - event.nativeEvent.translationY;

        if (newHeight >= COLLAPSED_HEIGHT && newHeight <= EXPANDED_HEIGHT) {
            sheetHeight.value = newHeight;
        }
    };

    const panEnd = () => {
        if (sheetHeight.value > (COLLAPSED_HEIGHT + EXPANDED_HEIGHT) / 2) {
            sheetHeight.value = withSpring(EXPANDED_HEIGHT);
        } else {
            sheetHeight.value = withSpring(COLLAPSED_HEIGHT);
        }
    };

    const handleBack = () => {
        setIsListingView(true)
        navigation.getParent()?.setOptions({
            tabBarStyle: DEFAULT_TAB_BAR_STYLE,
        });
    }

    const renderItem = ({ item }) => {

        return (
            <TouchableOpacity
                onPress={() => navigation.navigate('ShopDetail', {
                    resId: item?.restaurant_id ? item?.restaurant_id : item?.id,
                })}
                style={styles.shopCardWrapper}
            >
                <FastImage
                    source={{ uri: `${mainUrl}${item?.logo}` }}
                    style={styles.shopImage}
                    resizeMode="cover"
                />

                <View style={styles.shopInfoContainer}>
                    <CustomText style={styles.shopName}>{item?.name}</CustomText>
                    <Subtitle>{[...new Set(item?.location?.split(/\r?\n/).map(s => s.trim()))].join(", ")}</Subtitle>

                    <View style={styles.servicesRow}>
                        <View style={styles.serviceItem}>
                            <MaterialIcons
                                name={'wheelchair-pickup'}
                                size={16}
                                color={colors.gray}
                            />
                            <Subtitle>Pick up</Subtitle>
                        </View>
                        <View style={styles.serviceItem}>
                            <MaterialIcons name={'handyman'} size={16} color={colors.gray} />
                            <Subtitle>In Store</Subtitle>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        );
    };


    const currentLocation = () => {
        Geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;

                // Animate the map to the current location
                mapRef.current?.animateToRegion({
                    latitude,
                    longitude,
                    latitudeDelta: 0.01,  // zoom in
                    longitudeDelta: 0.01,
                }, 500); // 500ms animation

                console.log('Moved to current location:', latitude, longitude);
            },
            (error) => {
                console.log('Error getting current location:', error);
            },
            {
                enableHighAccuracy: true,
                timeout: 15000,
                maximumAge: 10000,
            }
        );
    };
    const locationBtnStyle = useAnimatedStyle(() => {
        const top = interpolate(
            sheetHeight.value,
            [COLLAPSED_HEIGHT, EXPANDED_HEIGHT],
            [height / 1.4, Platform.OS == 'ios' ? height / 1.6 : height / 1.7],
            // Animated.Extrapolate.CLAMP
        );

        return { top };
    });
    return (
        <View style={styles.mapViewContainer}>
            <View style={styles.mapHeader}>
                <HeaderBox
                    logo={false}
                    search={false}
                    notification={false}
                    onPressBack={() => handleBack()}
                    style={{ top: -5 }}
                />
            </View>

            <AnimatedTouchable onPress={currentLocation} style={[styles.locationbtn, locationBtnStyle]}>
                <FontAwesome6 name={'location-crosshairs'} color={colors.red} size={20} />
            </AnimatedTouchable>
            <View style={styles.mapWrapper}>
                <MapView
                    ref={mapRef}
                    // initialRegion={{
                    //     latitude: currentAddress?.latitude || 25.256946,
                    //     longitude: currentAddress?.longitude || 55.359307,
                    //     latitudeDelta: 0.1,
                    //     longitudeDelta: 0.1,
                    // }}
                        region={{
                              latitude: currentAddress?.latitude || 25.256946,
                        longitude: currentAddress?.longitude || 55.359307,
                        latitudeDelta: 0.1,
                        longitudeDelta: 0.1,
                        }}
                    style={styles.map}
                    mapPadding={{ top: 0, right: 0, bottom: 300, left: 220 }}
                    showsUserLocation={true}
                    followsUserLocation={false}
                    showsMyLocationButton={true}
                    userLocationPriority="high"
                    onMapReady={() => {
                        mapRef.current?.animateToRegion(
                            {
                                latitude: currentAddress?.latitude || 25.256946,
                                longitude: currentAddress?.longitude || 55.359307,
                                latitudeDelta: 0.1,
                                longitudeDelta: 0.1,
                            },
                            500
                        );
                    }}
                >
                    {
                        data?.map((item, index) => {
                            return (
                                <Marker
                                    key={index}
                                    coordinate={{
                                        latitude: Number(item.latitude),
                                        longitude: Number(item.longitude),
                                        latitudeDelta: 0.20,
                                        longitudeDelta: 0.20,
                                    }}
                                    title={item?.name}
                                      tracksViewChanges={false}
                                >
                                    <FastImage
                                        source={{ uri: `${mainUrl}${item.logo}` }}
                                        style={{ width: 50, height: 50, borderRadius: 50, borderWidth: 1, backgroundColor: colors.white }}
                                        resizeMode="contain"
                                    />
                                </Marker>
                            )
                        })
                    }

                </MapView>


            </View>

            <PanGestureHandler
                ref={panRef}
                simultaneousHandlers={scrollRef}
                onGestureEvent={panGesture}
                onEnded={panEnd}
                activeOffsetY={[-10, 10]}
            >
                <Animated.View style={[styles.mapListOverlay, animatedStyle]}>
                    <View style={{ width: 50, height: 5, backgroundColor: colors.gray4, borderRadius: 10, marginVertical: 10, margin: "auto" }} />
                    <AnimatedFlatList
                        data={data}
                        // data={carNamesArray}
                        keyExtractor={(_, index) => index?.toString()}
                        renderItem={renderItem}
                        contentContainerStyle={styles.horizontalList}
                        showsHorizontalScrollIndicator={false}
                        showsVerticalScrollIndicator={false}
                        onScroll={scrollHandler}
                        scrollEventThrottle={16}
                        nestedScrollEnabled={true}   // ✅ MUST for Android

                    />
                </Animated.View>
            </PanGestureHandler>


        </View>

    );
}

export default MapViewComp

const styles = StyleSheet.create({
    container: { flex: 1 },

    searchInput: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 40,
        borderColor: colors.gray5
    },
    shopCardWrapper: {
        gap: 10,
        flexDirection: "row",
        alignItems: "center",
    },
    shopImage: {
        width: 60,
        height: 60,
        borderRadius: 50
    },
    shopInfoContainer: {
        // backgroundColor: colors.white,
        // paddingVertical: 15,
        // paddingHorizontal: 10,
        // borderWidth: 1,
        // borderColor: colors.gray5,
        // borderBottomLeftRadius: 10,
        // borderBottomRightRadius: 10,
    },

    shopLogoWrapper: {
        position: 'absolute',
        top: I18nManager.isRTL ? -20 : -25,
        left: 10,
        borderWidth: 1,
        borderColor: '#fff',
        borderRadius: 50,
        zIndex: 100,
    },
    shopLogo: {
        width: 35,
        height: 35,
        borderRadius: 50,
        borderWidth: 1,
        borderColor: colors.gray5
    },
    shopName: {
        fontFamily: fonts.bold,
        color: colors.primary,
    },
    servicesRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },
    serviceItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5,
    },
    mapViewContainer: {
        // paddingTop: Platform.OS === 'ios' ? 60 : 40,
    },
    mapHeader: {
        position: "absolute",
        top: 70,
        backgroundColor: colors.white,
        borderRadius: 50,
        height: 45,
        width: 45,
        alignItems: "center",
        justifyContent: "center",
        left: 20
    },
    locationbtn: {
        position: "absolute",
        // top: height / 1.6,
        backgroundColor: colors.white,
        borderRadius: 50,
        height: 45,
        width: 45,
        alignItems: "center",
        justifyContent: "center",
        right: 20,
        borderWidth: 1,
        borderColor: colors.gray,
        zIndex: 999
    },
    mapWrapper: {
        zIndex: -100,
    },
    map: {
        width: '100%',
        height: 1000,
    },
    mapListOverlay: {
        zIndex: 100,
        bottom: 0,
        height: 450,
        // bottom: Platform.OS === 'ios' ?  : 420,
        position: 'absolute',
        backgroundColor: colors.white,
        width: "100%",
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20
    },
    horizontalList: {
        gap: 15,
        paddingHorizontal: 20,
        paddingVertical: 15,
        flexGrow: 1,
        paddingBottom: 150
    },
    bottomBtn: {
        position: 'absolute',
        bottom: 90,
        alignSelf: 'center',
        height: 35,
        width: '25%',
        borderRadius: 50,
    },

    broadBottomBtn: {
        position: 'absolute',
        alignSelf: 'center',
        width: '75%',
        borderRadius: 50,
        height: 50,
    },
    currentLocationBtn: {
        top: 400,
        // right: 20,
        backgroundColor: 'red',
        // width: 50,
        // height: 50,
        // borderRadius: 25,
        // justifyContent: "center",
        // alignItems: "center",
        // shadowColor: "#000",
        // shadowOffset: { width: 0, height: 2 },
        // shadowOpacity: 0.3,
        // shadowRadius: 3,
        // elevation: 5,
        zIndex: 999
    }
});