
import Feather from 'react-native-vector-icons/Feather'
import CustomText from './CustomText'
import { Dimensions, FlatList, I18nManager, Image, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native'
import CustomButton from './CustomButton'
import { useTranslation } from 'react-i18next'
import { colors } from '../constants/colors'
import { useCallback, useEffect, useState } from 'react'
import { fonts } from '../constants/fonts'
import CustomModal from './CustomModal'
import { carLogoJson } from '../constants/carData';
import CustomInput from './CustomInput'
import { addVehicle, fetchVehicles } from '../userServices/UserService'
import { useSelector } from 'react-redux'
import { showMessage } from 'react-native-flash-message'
import { storeCarData } from '../redux/storeAddedCar'
import AddedCarData from './AddedCarData'
import ScreenLoader from './ScreenLoader'
import { useFocusEffect } from '@react-navigation/native'
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';




const { height } = Dimensions.get('screen')

const AddBrandedCar = ({ setSelectedCarId, selectedCarId, style }) => {
    const { t } = useTranslation()
    const token = useSelector((state) => state?.auth?.loginData?.token)

    const [carCategory, setCarCategory] = useState('')
    const [plateNo, setPlateNo] = useState('')
    const [searchCar, setSearchCar] = useState('')
    const [isCarModal, setIsCarModal] = useState(false)
    const [selectedCar, setSelectedCar] = useState('');
    const [carData, setCarData] = useState([]);
    const [isAddNewCar, setIsAddNewCar] = useState(false);
    const [isLoader, setIsLoader] = useState(false);

    useEffect(() => {
        loadAddedVechicle()
    }, [])


    const loadAddedVechicle = async (value) => {
        setIsLoader(true)
        try {
            const response = await fetchVehicles(token)
            console.log('dasdas', response)
            if (response?.success) {
                setCarData(response?.data)
            }
        } catch (error) {
            console.log('Vehicle Error', error)
        } finally {
            setIsLoader(false)
        }
    }

    const filterSearch = searchCar
        ? carLogoJson?.filter(item =>
            item?.name?.toLowerCase()?.includes(searchCar.toLowerCase()),
        )
        : carLogoJson;

    const handleCarSelection = item => {
        setSelectedCar(item);
        setIsCarModal(false);
    };

    const handleAddCar = async () => {


        const data = {
            carCategory,
            carName: selectedCar?.name,
            plateNo,
        };
        try {
            const response = await addVehicle(data, token)
            console.log('Show me Veichle Response', response)
            if (response?.success) {
                showMessage({
                    type: "success",
                    message: t('vehicleAdded')
                })
                loadAddedVechicle()
                setCarCategory('')
                setPlateNo('')
                setSelectedCar('')
                setIsAddNewCar(false);
            } else {
                showMessage({
                    type: "danger",
                    message: t('vehicleNotAdded')
                })
            }
            // dispatch(storeCarData(data));
        } catch (error) {
            console.log('Vehicle Error', error)

        }
    }


    if (isLoader) {
        return (
            <ScreenLoader />
        )
    }

    return (
        <View>
            <View style={[{ flexDirection: "row", justifyContent: "space-between",  },style]}>
                <View style={[styles.carsHeader,]}>
                    <Ionicons name={'car-sport-outline'} size={25} color={colors.black} />
                    <CustomText>{t('yourCars')}</CustomText>
                </View>

                <TouchableOpacity style={{ marginTop: 12 ,marginRight:5}} onPress={() => setIsAddNewCar(!isAddNewCar)}>
                    <Ionicons name={'car-sport-outline'} size={25} color={colors.black} />
                    <Entypo
                        name={'plus'}
                        size={12}
                        color={colors.black}
                        style={styles.plusIcon}
                    />
                </TouchableOpacity>
            </View>


            {
                carData?.length > 0 ?
                    <View style={{ paddingHorizontal: 20 }}>
                        <AddedCarData loadAddedVechicle={loadAddedVechicle} carData={carData} setSelectedCarId={setSelectedCarId} selectedCarId={selectedCarId} />
                    </View>
                    :
                    !isAddNewCar &&
                    <View style={[styles.noCarsContainer,style]}>
                        <CustomText style={styles.noCarsText}>{t('noCars')}</CustomText>

                        <CustomButton
                            title={t('addNewCar')}
                            style={styles.addNewCarBtn}
                            btnTxtStyle={styles.addNewCarTxt}
                            onPress={() => setIsAddNewCar(true)}
                        />
                    </View>
            }


            {
                isAddNewCar &&
                <View style={[styles.addCarContainer,style]}>
                    <View style={styles.addCarRow}>
                        <CustomText style={styles.vehicleBrand}>
                            {t('vehicleBrand')}
                        </CustomText>
                        <TouchableOpacity
                            onPress={() => setIsCarModal(true)}
                            style={styles.selectCarBtn}
                        >
                            <CustomText style={styles.selectCarText}>
                                {selectedCar ? selectedCar?.name : t('selectCar')}
                            </CustomText>
                            <Feather
                                name={I18nManager.isRTL ? 'chevron-left' : 'chevron-right'}
                                size={20}
                                color={colors.gray}
                            />
                        </TouchableOpacity>
                    </View>

                    <View style={styles.inputRow}>
                        <TextInput
                            placeholder={t('category')}
                            placeholderTextColor={colors.gray}
                            style={styles.inputField}
                            numberOfLines={1}
                            maxLength={10}
                            value={carCategory}
                            onChangeText={setCarCategory}
                        />
                        <TextInput
                            placeholder={t('plateNo')}
                            placeholderTextColor={colors.gray}
                            style={styles.inputField}
                            numberOfLines={1}
                            maxLength={10}
                            value={plateNo}
                            onChangeText={setPlateNo}
                        />
                    </View>

                    <CustomButton
                        title={t('save')}
                        style={styles.addBtn}
                        btnTxtStyle={styles.addBtnTxt}
                        onPress={handleAddCar}
                    />
                </View>

            }







            <CustomModal
                modalVisible={isCarModal}
                setModalVisible={setIsCarModal}
                title={'Select vehicle brand'}
                textStyle={styles.modalTitle}
            >
                <CustomInput
                    placeholder={t('search')}
                    icon={true}
                    rs={true}
                    value={searchCar}
                    onChangeText={setSearchCar}
                    style={{ flexDirection: "row", alignItems: "center" }}
                />

                <FlatList
                    data={filterSearch}
                    keyExtractor={(item, index) => index?.toString()}
                    style={styles.modalListHeight}
                    contentContainerStyle={styles.modalList}
                    showsVerticalScrollIndicator={false}
                    ItemSeparatorComponent={<View style={styles.modalSeparator} />}
                    renderItem={({ item }) => {
                        return (
                            <TouchableOpacity
                                onPress={() => handleCarSelection(item)}
                                style={styles.modalItemContainer}
                            >
                                <Image
                                    resizeMode="contain"
                                    source={item?.image}
                                    style={styles.modalItemImage}
                                />
                                <CustomText style={styles.modalItemText}>
                                    {item?.name}
                                </CustomText>
                            </TouchableOpacity>
                        );
                    }}
                />
            </CustomModal>
        </View>
    )
}

export default AddBrandedCar

const styles = StyleSheet.create({
    iconMenu: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        marginHorizontal: 20,
        paddingVertical: 10,
    },
    redText: {
        color: colors.red,
    },
    headerRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginRight: 10,
        paddingHorizontal: 20,
        marginBottom: 15,
        paddingTop: 20,
    },
    headerProfile: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    profileIcon: {
        width: 40,
        height: 40,
        borderRadius: 50,
        backgroundColor: colors.secondary,
        alignItems: 'center',
        justifyContent: 'center',
    },
    profileInitial: {
        fontSize: 16,
        fontFamily: fonts.medium,
    },
    subtitleSmall: {
        fontSize: 10,
        marginVertical: 2,
        color: colors.gray3,
    },
    subtitleSmall2: {
        fontSize: 10,
        color: colors.gray3,
    },
    plusIcon: {
        top: -30,
        right: -20,
    },
    dividerHeight7: {
        height: 7,
    },
    carsHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 13,

    },
    addCarContainer: {
        paddingVertical: 15,
    },
    addCarRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    vehicleBrand: {
        fontSize: 15,
        color: colors.primary,
    },
    selectCarBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 3,
    },
    selectCarText: {
        fontSize: 15,
        color: colors.gray1,
        textTransform: 'capitalize',
    },
    inputRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 15,
    },
    inputField: {
        height: 45,
        fontFamily: fonts.regular,
        textAlign: I18nManager.isRTL ? 'right' : 'left',
        color: colors.black,
        borderBottomWidth: 1.5,
        width: '48%',
        borderColor: colors.gray,
        paddingBottom: 5,
    },
    addBtn: {
        height: 27,
        width: '25%',
        borderRadius: 50,
        alignSelf: 'center',
    },
    addBtnTxt: {
        fontSize: 12,
    },
    carDetailsRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 15,
        gap: 30,
    },
    carImage: {
        width: 50,
        height: 40,
    },
    carInfoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 0.5 },
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 4,
        shadowOpacity: 0.29,
        shadowRadius: 1.65,
        backgroundColor: colors.white,
        elevation: 7,
        gap: 15,
    },
    carCategory: {
        fontFamily: fonts.bold,
        fontSize: 16,
    },
    plateNo: {
        fontFamily: fonts.semiBold,
        fontSize: 16,
    },
    deleteIconContainer: {
        left: 10,
    },
    noCarsContainer: {
        paddingVertical: 15,
    },
    noCarsText: {
        marginVertical: 8,
        fontSize: 12,
        textAlign: 'center',
        color: colors.gray1,
    },
    addNewCarBtn: {
        width: '27%',
        height: 30,
        borderRadius: 50,
        marginLeft: 'auto',
    },
    addNewCarTxt: {
        fontSize: 12,
    },
    mb20: {
        marginBottom: 20,
    },
    deleteAccountBtn: {
        marginTop: 25,
        marginHorizontal: 20,
        marginLeft: 'auto',
    },
    deleteAccountTxt: {
        fontSize: 13,
        color: colors.red,
    },
    modalTitle: {
        color: colors.primary,
        marginBottom: 10,
        textAlign: 'center',
    },
    modalList: {
        paddingBottom: 100,
    },
    modalListHeight: {
        height: height / 1.3,
    },
    modalSeparator: {
        borderBottomWidth: 1,
        borderColor: colors.gray5,
    },
    modalItemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        paddingVertical: 15,
    },
    modalItemImage: {
        width: 50,
        height: 50,
    },
    modalItemText: {
        textTransform: 'capitalize',
        fontSize: 15,
        fontFamily: fonts.medium,
    },
});