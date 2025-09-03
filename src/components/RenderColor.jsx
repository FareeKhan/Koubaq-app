import { Dimensions, FlatList, StyleSheet, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Colors } from '../constants/data'
import Octicons from 'react-native-vector-icons/Octicons'
import { colors } from '../constants/colors'
const {width} = Dimensions.get('screen')

const RenderColor = ({ selectedColor, setSelectedColor ,layoutType}) => {

    const handleColor = (item) => {
        setSelectedColor((prev) =>
            prev?.includes(item) ?
                prev?.filter((_i) => _i !== item)
                :
                [...prev, item]
        )
    }



    const renderItem = ({ item, index }) => {
        return (
            <View style={{ width: width/6.4, }} key={index}>
                <TouchableOpacity onPress={() => handleColor(item)} style={{ width: 32, height: 32, borderRadius: 50, backgroundColor: item, alignItems: "center", justifyContent: "center" }} >
                    {
                        selectedColor?.includes(item) &&
                        <Octicons name={'check'} size={18} color={'#fff'} />
                    }
                </TouchableOpacity>
            </View>
        )
    }

    return (
        <View style={styles.container}>


            <FlatList
                data={Colors}
                keyExtractor={(item, index) => index?.toString()}
                renderItem={renderItem}
                numColumns={layoutType == "grid" ? 6 : 1}
                contentContainerStyle={layoutType == "grid" && { gap: 20 }}
                horizontal={layoutType !== "grid"}

            />
            {/* {
                Colors?.map((item, index) => {
                    return (
                        <TouchableOpacity onPress={() => handleColor(item)} key={index}>
                            <View style={{ width: 32, height: 32, borderRadius: 50, backgroundColor: item, alignItems: "center", justifyContent: "center" }} >
                                {
                                    selectedColor?.includes(item) &&
                                    <Octicons name={'check'} size={18} color={'#fff'} />
                                }

                            </View>
                        </TouchableOpacity>

                    )
                })
            } */}
        </View>
    )
}

export default RenderColor

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        gap: 10
    },
    checkContainer: {
        width: 15,
        height: 15,
        backgroundColor: colors.primary,
        alignSelf: "flex-end",
        borderRadius: 50,
        position: "absolute",
        top: -5,
        zIndex: 10,
        alignItems: "center",
        justifyContent: "center"
    }
})