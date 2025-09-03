import {
    ActivityIndicator,
    Dimensions,
    FlatList,
    Image,
    StyleSheet,
    TouchableOpacity,
    View,
} from 'react-native';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { colors } from '../constants/colors';
import CustomText from './CustomText';
import { useNavigation } from '@react-navigation/native';



const Categories = ({ data }) => {
    const navigation = useNavigation();
    const { t } = useTranslation();
    const [isLoading, setIsLoading] = useState(true);

    const renderItem = ({ item, index }) => {
        const localImage = typeof item?.image;

        return (
            <TouchableOpacity
                onPress={() =>
                    navigation.navigate('SameCategoryProducts', {
                        title: item?.name,
                        subC_ID: item?.id,
                    })
                }
                style={styles.itemContainer}
            >
                {isLoading && (
                    <View style={styles.loaderContainer}>
                        <ActivityIndicator size={'large'} color={colors.primary} />
                    </View>
                )}

                <Image
                    // borderRadius={10}
                    resizeMode={localImage == 'number' ? 'center' : 'cover'}
                    source={localImage == 'number' ? item?.image : { uri: item?.image }}
                    style={[
                        styles.image,
                        localImage == 'number' && styles.imageLocal,
                    ]}
                    onLoad={() => setIsLoading(false)}
                />

                <View style={styles.labelContainer}>
                    <CustomText numberOfLines={1} style={styles.labelText}>
                        {item?.name}
                    </CustomText>
                </View>
            </TouchableOpacity>
        );
    };

    return (
        <View>
            <FlatList
                data={data}
                keyExtractor={(item, index) => index?.toString()}
                renderItem={renderItem}
                horizontal
                contentContainerStyle={styles.flatListContent}
                showsHorizontalScrollIndicator={false}
            />
        </View>
    );
};

export default Categories;

const styles = StyleSheet.create({
    itemContainer: {
        width: 100,
        height: 100,
        backgroundColor: colors.gray14,
        // borderRadius: 10,
        marginRight: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    loaderContainer: {
        position: 'absolute',
        zIndex: 100,
        backgroundColor: colors.gray14,
        width: 100,
        height: 100,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: {
        width: '100%',
        height: '100%',
    },
    imageLocal: {
        height: 68,
    },
    labelContainer: {
        position: 'absolute',
        bottom: 0,
        backgroundColor: '#00000050',
        width: '100%',
        alignItems: 'center',
        // borderBottomLeftRadius: 10,
        // borderBottomRightRadius: 10,
    },
    labelText: {
        color: colors.white,
    },
    flatListContent: {
        paddingHorizontal: 25,
        marginTop: 20,
    },
});
