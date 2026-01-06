import { FlatList, StyleSheet, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { deleteNotification, getNotification, readNotification } from '../userServices/UserService'
import { useSelector } from 'react-redux'
import ScreenLoader from '../components/ScreenLoader'
import EmptyData from '../components/EmptyData'
import HeaderBox from '../components/HeaderBox'
import ScreenView from '../components/ScreenView'
import { colors } from '../constants/colors'
import { useTranslation } from 'react-i18next'
import CustomText from '../components/CustomText'
import { Swipeable } from 'react-native-gesture-handler'
import { fonts } from '../constants/fonts'
import { showMessage } from 'react-native-flash-message'

const NotificationScreen = () => {
    const { t } = useTranslation();
    const token = useSelector((state) => state?.auth?.loginData?.token)
    const [data, setData] = useState([])
    const [isLoader, setIsLoader] = useState(false)
    const swipeableRefs = useRef([]);

    useEffect(() => {
        fetchNotification(true)
    }, [])

    const fetchNotification = async (value) => {
        setIsLoader(value)
        try {
            const response = await getNotification(token)
            console.log('sss', response)
            if (response?.success) {
                setData(response?.data?.data)
            }
        } catch (error) {
            console.log('error', error)
        } finally {
            setIsLoader(false)
        }
    }

    const markReadNotification = async (id) => {
        try {
            const response = await readNotification(id, token)
            console.log('sss', response)
            if (response?.success) {
                fetchNotification(false)
            }
        } catch (error) {
            console.log('error', error)
        }
    }

    const deleteSingleNotification = async (item) => {
        try {
            const response = await deleteNotification(token, item?.id)
            console.log('asdasd', response)
            if (response?.success) {
                showMessage({
                    type: "success",
                    message: t('notDeleted')
                })
                fetchNotification(false)
                closeOtherRows(item?.id)
            }
        } catch (error) {
            console.log('error', error)
        }
    }

    const RightActions = (item) => {
        return (
            <TouchableOpacity onPress={() => deleteSingleNotification(item)} style={{ backgroundColor: 'red', flex: 1 / 6, justifyContent: 'center', paddingHorizontal: 15 }}>
                <CustomText style={{ color: 'white', fontFamily: fonts.semiBold }}>{t('delete')}</CustomText>
            </TouchableOpacity>
        )
    }

    const closeOtherRows = (currentKey) => {
        Object.keys(swipeableRefs.current).forEach(key => {
            if (key !== currentKey && swipeableRefs.current[key]) {
                swipeableRefs.current[key].close();
            }
        });
    };

    const renderItem = ({ item, index }) => {
        console.log('dasdasdas', item?.read_at)
        const getData = new Date(item?.created_at)
        const clearDate = getData?.toISOString()?.split("T")[0]
        return (
            <Swipeable
                ref={ref => swipeableRefs.current[`${item?.id}`] = ref}
                renderRightActions={() => RightActions(item)}
                onSwipeableWillOpen={() => closeOtherRows(`${item?.id}`)}
            >
                <TouchableOpacity onPress={() => markReadNotification(item?.id)} style={styles.itemContainer}>
                    <View style={styles.itemHeader}>
                        <CustomText style={styles.itemTitle}>{item?.title}</CustomText>
                        {
                            item?.read_at == null &&
                            <View style={styles.itemIndicator} />
                        }
                    </View>
                    <CustomText style={styles.itemMessage} numberOfLines={2}>
                        {item?.message}
                    </CustomText>
                    <CustomText style={styles.itemDate} numberOfLines={2}>
                        {clearDate}
                    </CustomText>
                </TouchableOpacity>
            </Swipeable>
        );
    };

    return (
        <ScreenView scrollable={true}>
            <HeaderBox isShowNotNmbr={false} title={t('notification')} search={false} />
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
        backgroundColor: colors.white
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
