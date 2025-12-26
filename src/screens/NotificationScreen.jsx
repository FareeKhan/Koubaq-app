import { FlatList, StyleSheet, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { getNotification } from '../userServices/UserService'
import { useSelector } from 'react-redux'
import ScreenLoader from '../components/ScreenLoader'
import EmptyData from '../components/EmptyData'
import HeaderBox from '../components/HeaderBox'
import ScreenView from '../components/ScreenView'
import { colors } from '../constants/colors'
import { useTranslation } from 'react-i18next'
import CustomText from '../components/CustomText'

const NotificationScreen = () => {
    const { t } = useTranslation();
    const token = useSelector((state) => state?.auth?.loginData?.token)
    const [data, setData] = useState([])
    const [isLoader, setIsLoader] = useState(false)

    useEffect(() => {
        fetchNotification()
    }, [])

    const fetchNotification = async () => {
        setIsLoader(true)
        try {
            const response = await getNotification(token)
            console.log('asdasd', response)
            if (response?.success) {
                setData(response?.data?.data)
            }
        } catch (error) {
            console.log('error', error)
        } finally {
            setIsLoader(false)
        }
    }

    const renderItem = ({ item }) => {
        const getData = new Date(item?.created_at)
        const clearDate = getData?.toISOString()?.split("T")[0]
        return (
            <View style={styles.itemContainer}>
                <View style={styles.itemHeader}>
                    <CustomText style={styles.itemTitle}>{item?.title}</CustomText>
                    <View style={styles.itemIndicator} />
                </View>
                <CustomText style={styles.itemMessage} numberOfLines={2}>
                    {item?.message}
                </CustomText>
                <CustomText style={styles.itemDate} numberOfLines={2}>
                    {clearDate}
                </CustomText>
            </View>
        );
    };

    return (
        <ScreenView scrollable={true}>
            <HeaderBox title={t('notification')} search={false} />
            {
                isLoader ?
                    <ScreenLoader />
                    :
                    <FlatList
                        data={data}
                        keyExtractor={(item, index) => index?.toString()}
                        renderItem={renderItem}
                        scrollEnabled={false}
                        contentContainerStyle={styles.listContainer}
                        ListEmptyComponent={<EmptyData title={t('noNotification')} />}
                    />
            }
        </ScreenView>
    )
}

export default NotificationScreen

const styles = StyleSheet.create({
    listContainer: {
        gap: 15,
        marginTop: 40,
    },
    itemContainer: {
        borderWidth: 1,
        borderColor: colors.gray5,
        paddingHorizontal: 10,
        paddingVertical: 10,
        borderRadius: 7,
    },
    itemHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 5,
    },
    itemTitle: {
        fontSize: 15,
    },
    itemIndicator: {
        width: 12,
        height: 12,
        backgroundColor: colors.green,
        borderRadius: 50,
    },
    itemMessage: {
        color: colors.gray1,
        lineHeight: 21,
        marginBottom: 5,
    },
    itemDate: {
        color: colors.gray10,
        textAlign: 'right',
        fontSize: 12,
    },
})
