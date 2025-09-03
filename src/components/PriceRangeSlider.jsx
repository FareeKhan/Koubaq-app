import React, { useState } from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import MultiSlider, { CustomSliderMarkerLeft } from "@ptomasroos/react-native-multi-slider";
import { colors } from "../constants/colors";
import CustomText from "./CustomText";

const PriceRangeSlider = () => {
    const [priceRange, setPriceRange] = useState([10, 1000]);

    console.log('priceRange', priceRange)


    const CustomMarker = (e,value) =>{
        return(
                <View style={styles.marker} >
                    <View style={[{ position: "absolute", top: 30,width:70, },value && {right:-30}]}>
                        <CustomText style={styles.priceTxt}>AED{e.currentValue}</CustomText>
                    </View>
                </View>
        )
    }

    return (
        <View style={styles.container}>
            {/* <View style={styles.priceBox}>

                {
                    [0, 200, 1500, 5000]?.map((item, index) => {
                        return (
                            <View key={index} style={{}}>
                                <CustomText style={styles.label}>AED{item}</CustomText>
                            </View>
                        )
                    })
                }
            </View> */}



            <MultiSlider
                values={priceRange}
                sliderLength={320}
                onValuesChange={(values) => setPriceRange(values)}
                min={0}
                max={5000}
                step={10}
                allowOverlap={false}
                snapped
                containerStyle={{ alignItems: "center",marginBottom:30 }}
                markerStyle={{ width: 20, height: 20, borderRadius: 50, backgroundColor: colors.green }}
                trackStyle={{ backgroundColor: colors.gray13, height: 3 }}
                selectedStyle={{ backgroundColor: colors.green }}
                isMarkersSeparated={true}
                customMarkerLeft={(e) => CustomMarker(e)}
                customMarkerRight={(e) => CustomMarker(e,true)}
            />

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
    },
    priceBox: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginHorizontal: 5
    },
    label: {
        top: 10,
        color: colors.gray12
    },
    marker: {
        width: 24,
        height: 24,
        borderRadius: 12,
        backgroundColor: colors.green,
    },
    priceTxt:{
        color:colors.gray1,
        fontSize:12
    }


});

export default PriceRangeSlider;
