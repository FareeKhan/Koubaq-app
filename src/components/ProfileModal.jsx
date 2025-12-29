import { Image, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import CustomModal from './CustomModal'
import EvilIcons from 'react-native-vector-icons/EvilIcons'
import CustomInput from './CustomInput'
import CustomButton from './CustomButton'
import { updateProfile } from '../userServices/UserService'
import { useSelector } from 'react-redux'
import ImagePicker from "react-native-image-crop-picker";
import { colors } from '../constants/colors'
import { showMessage } from 'react-native-flash-message'
import { useTranslation } from 'react-i18next'
import { mainUrl } from '../constants/data'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'


const ProfileModal = ({ setIsProfileModal, isProfileModal, getUserProfile, userProfileData }) => {
    const { t } = useTranslation()
    const token = useSelector((state) => state?.auth?.loginData?.token)
    const [userImage, setUserImage] = useState('')
    const [userName, setUserName] = useState(userProfileData?.name)
    const [isLoader, setsLoader] = useState(false)
    useEffect(() => {
        setUserName(userProfileData?.name)
        setUserImage(mainUrl + userProfileData?.profile_image)
    }, [userProfileData])

    const handleUpdateProfile = async () => {
        if (userName == '' || userImage == '') {
            showMessage({
                type: "danger",
                message: t('uploadImageField')
            })
            return
        }
        setsLoader(true)
        try {
            const data = {
                name: userName,
                image: userImage
            }
            const resposne = await updateProfile(data, token)
            if (resposne?.success) {
                setIsProfileModal(false)
                getUserProfile()
                showMessage({
                    type: "success",
                    message: t('updatedSuccessfully')
                })
            } else {
                showMessage({
                    type: "danger",
                    message: t('somthingWentWrong')
                })
            }
        } catch (error) {
            console.log('error', error)
        } finally {
            setsLoader(false)
        }
    }
    const handleGallery = () => {
        ImagePicker.openPicker({
            width: 300,
            height: 400,
            cropping: true,
        }).then((image) => {
            setUserImage(image);
        });
    }

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={isProfileModal}
            onRequestClose={() => {
                Alert.alert('Modal has been closed.');
                setIsProfileModal(!isProfileModal);
            }}>
            <View style={styles.centeredView}>
                <View style={styles.modalView}>

                    <TouchableOpacity onPress={()=>{
                        setIsProfileModal(!isProfileModal);
                    }} activeOpacity={0.8} style={{ marginBottom: 20, marginLeft: "auto" }}>
                            <EvilIcons name={'close-o'} size={30} color={colors.primary} />
                    </TouchableOpacity>


                    <View style={{ borderTopLeftRadius: 20 }}>
                        <TouchableOpacity onPress={handleGallery} activeOpacity={0.8} style={{ marginBottom: 20, margin: "auto" }}>
                            <Image source={{ uri: userImage?.path ? userImage?.path : userImage }} style={{ width: 90, borderWidth: 1, borderColor: colors.gray, height: 90, borderRadius: 50 }} resizeMode="cover" />
                            <View style={{ backgroundColor: "#fff", borderWidth: 1, position: "absolute", height: 20, width: 20, borderRadius: 50, right: 5, bottom: 5 }}>
                                <EvilIcons name={'pencil'} size={20} color={colors.primary} />
                            </View>
                        </TouchableOpacity>

                        <CustomInput
                            placeholder={'userName'}
                            style={{ marginBottom: 40 }}
                            value={userName}
                            onChangeText={setUserName}
                        />
                        <CustomButton loader={isLoader} onPress={handleUpdateProfile} title={"Update"} />
                    </View>
                </View>
            </View>
        </Modal>





    )
}

export default ProfileModal

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#00000020',

    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
    },
    buttonOpen: {
        backgroundColor: '#F194FF',
    },
    buttonClose: {
        backgroundColor: '#2196F3',
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
    },
});