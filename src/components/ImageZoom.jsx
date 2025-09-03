import { Image, Modal, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import ImageViewer from 'react-native-image-zoom-viewer';
import { colors } from '../constants/colors';
import Entypo from 'react-native-vector-icons/Entypo'

const ImageZoom = ({ setModalVisible, modalVisible, images }) => {
    return (
        <View>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <TouchableOpacity onPress={() => setModalVisible(false)} style={{ height: 30, width: 30, backgroundColor: colors.primary, borderRadius: 50, alignItems: "center", justifyContent: "center", position: "absolute", zIndex: 1000, top: Platform.OS == 'ios' ? 50 : 30, left: Platform.OS == 'ios' ? 30 : 20 }}>
                            <Entypo name={'cross'} size={20} color={colors.white} />
                        </TouchableOpacity>
                        <ImageViewer
                            imageUrls={images}
                            backgroundColor={'#000'}
                            style={{paddingTop:20,backgroundColor:"#000"}}
                            enableSwipeDown={true}
                            onSwipeDown={() => setModalVisible(false)}
                        />
                    </View>
                </View>
            </Modal>
        </View>
    )
}

export default ImageZoom

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
    },
    modalView: {
        flex: 1,
        backgroundColor: 'white',
        borderRadius: 20,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },




})