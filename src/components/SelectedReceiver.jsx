import { Dimensions, I18nManager, Keyboard, KeyboardAvoidingView, Platform, StyleSheet, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import AntDesign from 'react-native-vector-icons/AntDesign'
import Entypo from 'react-native-vector-icons/Entypo'
import { colors } from "../constants/colors";
import { fonts } from "../constants/fonts";
import CustomText from "./CustomText";
import { useTranslation } from "react-i18next";
import HeaderWithAll from "./HeaderWithAll";
const { width } = Dimensions.get('screen')
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import { showMessage } from "react-native-flash-message";




const SelectedReceiver = ({
    selectedContacts,
    setSelectedContacts,
    manualNumber,
    setManualNumber,
    setIsContactPickerModal,
}) => {


    const getRandomColor = () => {
        const letters = "0123456789ABCDEF"
        let color = "#"
        for (let i = 0; i < 6; i++) {
            color = color + letters[Math.floor(Math.random() * 16)]
        }
        return color
    }
    const { t } = useTranslation()
    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >

            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                <View>
                    <View style={styles.namesContainer}>
                        {selectedContacts?.map((item, index) => {
                            if (!item.color) item.color = getRandomColor();


                            const fullName = item?.givenName + ' ' + (item?.familyName || '');

                            return (
                                <View style={styles.nameItem} key={item.recordID || index}>
                                    <View style={[styles.outerCircle, { borderColor: item.color }]}>
                                        <View
                                            style={[
                                                styles.innerCircle,
                                                { backgroundColor: item.color, borderColor: item.color },
                                            ]}
                                        >
                                            <CustomText style={styles.initialText}>
                                                {item.givenName?.charAt(0)?.toUpperCase()}
                                            </CustomText>
                                        </View>

                                        <TouchableOpacity
                                            style={styles.minusButton}
                                            onPress={() => {
                                                // Remove contact from selection
                                                setSelectedContacts(prev =>
                                                    prev.filter(c => c.recordID !== item.recordID)
                                                );
                                            }}
                                        >
                                            <AntDesign name="minus" size={15} style={styles.minusIcon} color={colors.white} />
                                        </TouchableOpacity>
                                    </View>
                                    <CustomText style={styles.nameText}>{fullName}</CustomText>
                                </View>
                            );
                        })}
                    </View>

                    <TouchableOpacity
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            marginTop: 20,
                            paddingHorizontal: 12,
                            gap: 15,
                            borderWidth: 1,
                            borderColor: colors.black1,
                            paddingVertical: 10,
                            borderRadius: 10,
                        }}
                        onPress={() => setIsContactPickerModal(true)}
                    >
                        <MaterialIcons name={'contacts'} size={20} color={colors.primary} />
                        <CustomText style={{ fontFamily: fonts.medium }}>
                            {t('selectFromContacts')}
                        </CustomText>
                        <Entypo
                            name={
                                I18nManager.isRTL ? 'chevron-small-left' : 'chevron-small-right'
                            }
                            size={24}
                            color={colors.black}
                            style={{ marginLeft: 'auto' }}
                        />
                    </TouchableOpacity>

                    <HeaderWithAll title={t('typePhone')} style={{ marginTop: 12 }} />

                    <View
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            marginTop: -5,
                            paddingHorizontal: 12,
                            gap: 15,
                            borderColor: colors.black1,
                            borderRadius: 10,
                            backgroundColor: colors.white,
                            borderWidth: 1
                            
                        }}
                    >
                        <FontAwesome5 name={'mobile'} size={20} color={colors.primary} />

                        <TextInput
                            placeholder={t('addNewNumber')}
                            style={{ width: "90%",color:colors.black,height:40 }}
                            placeholderTextColor={colors.gray}
                            value={manualNumber}
                            onChangeText={setManualNumber}
                            onBlur={() => {
                                if (manualNumber?.length == 0) return

                                if (manualNumber?.length < 10) {
                                    showMessage({
                                        type: "warning",
                                        message: t("invalid")
                                    })
                                } else {
                                    const alreadyAdded = selectedContacts?.some((item) => item?.phoneNumber == manualNumber)

                                    if (!alreadyAdded) {
                                        setSelectedContacts((prev) => [
                                            ...prev,
                                            {
                                                recordID: Date.now().toString(), // unique ID
                                                givenName: manualNumber, // you can treat as number contact
                                                phoneNumber: manualNumber,
                                            }
                                        ])
                                    }
                                }
                            }}
                        />


                        {/* <Entypo
            name={
              I18nManager.isRTL ? 'chevron-small-left' : 'chevron-small-right'
            }
            size={24}
            color={colors.black}
            style={{ marginLeft: 'auto' }}
          /> */}
                    </View>
                    <CustomText style={{ fontSize: 11, marginTop: 5, color: colors.gray2 }}>{t('EnterNoWithCountryCode')}</CustomText>

                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
};
export default SelectedReceiver



const styles = StyleSheet.create({
    filterBoxContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 30,
    },
    filterItemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    filterBox: {
        width: 45,
        height: 44,
        backgroundColor: colors.primary2,
        borderRadius: 4,
        alignItems: 'center',
        justifyContent: 'center',
    },
    filterBoxSelected: {
        backgroundColor: colors.primary,
    },
    filterSubtitle: {
        textAlign: 'center',
        marginTop: 5,
        fontSize: 11,
    },
    filterSeparator: {
        width: width / 6.6,
        height: 1,
        backgroundColor: colors.primary1,
        top: -10,
    },
    namesContainer: {
        flexDirection: 'row',
        gap: 15,
    },
    nameItem: {
        alignItems: 'center',
    },
    outerCircle: {
        marginTop: -5,
        borderWidth: 1,
        width: 50,
        height: 50,
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
    },
    innerCircle: {
        borderWidth: 1,
        width: 42,
        height: 42,
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
    },
    initialText: {
        fontSize: 18,
        fontFamily: fonts.medium,
    },
    minusButton: {
        position: 'absolute',
        backgroundColor: 'red',
        width: 15,
        height: 10,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 50,
        top: -3,
        right: 0,
    },
    minusIcon: {
        top: -3,
    },
    nameText: {
        marginTop: 5,
        fontSize: 11,
    },
});