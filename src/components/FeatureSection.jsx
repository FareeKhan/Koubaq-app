import { FlatList, Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { colors } from '../constants/colors'
import { useNavigation } from '@react-navigation/native'
import CustomText from './CustomText'
import { useTranslation } from 'react-i18next'

const FeatureSection = ({ data }) => {
    const navigation = useNavigation()
    const { t } = useTranslation()

    // const renderItem = ({ item, index }) => {

    //   const isFifthItem = (index + 1) % 5 === 0;

    //   return (
    //     <TouchableOpacity
    // onPress={() => navigation.navigate('SameCategoryProducts', {
    //   title: item?.name,
    //   subC_ID: item?.id,
    // })}
    //       style={[styles.newCatContainer, isFifthItem && { width: "100%", height: 197 }]}>
    //       <Image source={{ uri: item?.image }} style={{ width: "100%", height: 197 }} />

    //       <View style={styles.innerNewCatBox}>
    //         <Text style={styles.txtNewCat}>{item?.name}</Text>
    //       </View>


    //     </TouchableOpacity>
    //   )
    // }




    const renderItem = ({ item }) => {
        if (item.type === 'grid') {
            return (
                <View style={styles.row}>
                    {item?.items?.map((itm, idx) => (
                        <TouchableOpacity
                            key={idx}

                            onPress={() =>
                                
                                
                                navigation.navigate('SameCategoryProducts', {
                                title: itm?.name,
                                subC_ID: itm?.id,

                                
                            })
                        }


                            
                            style={styles.gridItem}
                        >
                            <ImageBackground
                                source={{ uri: itm?.image }}
                                style={styles.imageBackground}
                            >
                                {itm?.name && (
                                    <View style={styles.overlay}>
                                        <CustomText
                                            numberOfLines={1}
                                            style={styles.itemText}
                                        >
                                            {itm?.name}
                                        </CustomText>
                                    </View>
                                )}
                            </ImageBackground>
                        </TouchableOpacity>
                    ))}
                </View>
            );
        }

        // Full width item
        return (
            <TouchableOpacity
                onPress={() =>
                    // navigation.navigate('SameCategoryProducts', {
                    //     title: item?.item?.name,
                    //     subC_ID: item?.item?.id,
                    // })

                             navigation.navigate('SameCategoryProducts', {
                        title: item?.name,
                        subC_ID: item?.id,
                    })
                }
                style={styles.fullWidthItem}
            >
                <ImageBackground
                    source={{ uri: item?.item?.image }}
                    style={styles.imageBackground}
                >
                    {item?.item?.name && (
                        <View style={styles.overlay}>
                            <CustomText numberOfLines={1} style={styles.itemText}>
                                {item?.item?.name}
                            </CustomText>
                        </View>
                    )}
                </ImageBackground>
            </TouchableOpacity>
        );
    };

    return (
        <View>
            {/* <FlatList
        key={'2-cols'}
        numColumns={2}
        data={data}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        columnWrapperStyle={{ justifyContent: "space-between",marginBottom:8}}
      /> */}


            <FlatList
                data={data}
                renderItem={renderItem}
                keyExtractor={(item, index) => index.toString()}
                // ListEmptyComponent={<EmptyData />}
                contentContainerStyle={styles.flatListContainer}
            />

            {/* {
        data?.length > 5 &&
        <TouchableOpacity onPress={() => navigation.navigate('FeatureScreen', {
          data: data
        })} style={{ position: "absolute", right: 20, top: -20 }}>
          <CustomText>{t('viewAll')}</CustomText>
        </TouchableOpacity>
      } */}


        </View>
    )
}

export default FeatureSection

const styles = StyleSheet.create({
    newCatContainer: {
        width: "48%",
        height: 197,
        // borderRadius: 15,
        // overflow: "hidden"
    },
    innerNewCatBox: {
        position: "absolute",
        left: "5%",
        top: 10,
        backgroundColor: "#00000050",
        paddingHorizontal: 10,
        borderRadius: 2
    },
    txtNewCat: {
        fontSize: 13,
        color: colors.white,
        fontWeight: "500"
    },

    inputBox: {
        marginTop: 30,
        backgroundColor: "#fff",
        borderWidth: 1,
        borderColor: colors.gray4,
        marginHorizontal: 15,
        height: 45,
    },
    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 10,
    },
    gridItem: {
        width: "48%",
    },
    fullWidthItem: {
        width: "100%",
        marginBottom: 10,
    },
    imageBackground: {
        height: 190,
        paddingTop: 10,
    },
    overlay: {
        position: "absolute",
        top: 10,
        backgroundColor: "#00000050",
        width: "50%",
        alignItems: "center",
    },
    itemText: {
        color: colors.white,
        fontSize: 16,
    },
    flatListContainer: {
        marginTop: 10,
    },


})