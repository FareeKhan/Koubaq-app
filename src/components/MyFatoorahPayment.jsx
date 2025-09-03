import { Modal, processColor, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import {
    MFApplePayButtonView,
    MFApplePayStyle,
    MFBoxShadow,
    MFCardPaymentView,
    MFCardViewError,
    MFCardViewInput,
    MFCardViewLabel,
    MFCardViewPlaceHolder,
    MFCardViewStyle,
    MFCardViewText,
    MFCountry,
    MFEnvironment,
    MFExecutePaymentRequest,
    MFFontFamily,
    MFFontWeight,
    MFInitiateSessionRequest,
    MFInitiateSessionResponse,
    MFLanguage,
    MFSDK
} from 'myfatoorah-reactnative';
import CustomText from './CustomText';
import CustomButton from './CustomButton';
import Entypo from 'react-native-vector-icons/Entypo'

const MyFatoorahPayment = ({ modalVisible, setModalVisible ,confirmOrder,finalCheckoutPrice}) => {
    const [sessionId, setSessionId] = useState('');
    const [invoiceId, setInvoiceId] = useState('');

    useEffect(() => {
        configure()
        setUpActionBar()
    }, [])

    useEffect(() => {
    if (modalVisible) {
        initiateSession();
    }
}, [modalVisible]);

    // const configure = async () => {
    //     await MFSDK.init(
    //         'rLtt6JWvbUHDDhsZnfpAhpYk4dxYDQkbcPTyGaKp2TYqQgG7FGZ5Th_WD53Oq8Ebz6A53njUoo1w3pjU1D4vs_ZMqFiz_j0urb_BH9Oq9VZoKFoJEDAbRZepGcQanImyYrry7Kt6MnMdgfG5jn4HngWoRdKduNNyP4kzcp3mRv7x00ahkm9LAK7ZRieg7k1PDAnBIOG3EyVSJ5kK4WLMvYr7sCwHbHcu4A5WwelxYK0GMJy37bNAarSJDFQsJ2ZvJjvMDmfWwDVFEVe_5tOomfVNt6bOg9mexbGjMrnHBnKnZR1vQbBtQieDlQepzTZMuQrSuKn-t5XZM7V6fCW7oP-uXGX-sMOajeX65JOf6XVpk29DP6ro8WTAflCDANC193yof8-f5_EYY-3hXhJj7RBXmizDpneEQDSaSz5sFk0sV5qPcARJ9zGG73vuGFyenjPPmtDtXtpx35A-BVcOSBYVIWe9kndG3nclfefjKEuZ3m4jL9Gg1h2JBvmXSMYiZtp9MR5I6pvbvylU_PP5xJFSjVTIz7IQSjcVGO41npnwIxRXNRxFOdIUHn0tjQ-7LwvEcTXyPsHXcMD8WtgBh-wxR8aKX7WPSsT1O8d8reb2aR7K3rkV3K82K_0OgawImEpwSvp9MNKynEAJQS6ZHe_J_l77652xwPNxMRTMASk1ZsJL',
    //         MFCountry.KUWAIT,
    //         MFEnvironment.TEST
    //     );
    // };


    const configure = async () => {
        await MFSDK.init(
            // 'rLtt6JWvbUHDDhsZnfpAhpYk4dxYDQkbcPTyGaKp2TYqQgG7FGZ5Th_WD53Oq8Ebz6A53njUoo1w3pjU1D4vs_ZMqFiz_j0urb_BH9Oq9VZoKFoJEDAbRZepGcQanImyYrry7Kt6MnMdgfG5jn4HngWoRdKduNNyP4kzcp3mRv7x00ahkm9LAK7ZRieg7k1PDAnBIOG3EyVSJ5kK4WLMvYr7sCwHbHcu4A5WwelxYK0GMJy37bNAarSJDFQsJ2ZvJjvMDmfWwDVFEVe_5tOomfVNt6bOg9mexbGjMrnHBnKnZR1vQbBtQieDlQepzTZMuQrSuKn-t5XZM7V6fCW7oP-uXGX-sMOajeX65JOf6XVpk29DP6ro8WTAflCDANC193yof8-f5_EYY-3hXhJj7RBXmizDpneEQDSaSz5sFk0sV5qPcARJ9zGG73vuGFyenjPPmtDtXtpx35A-BVcOSBYVIWe9kndG3nclfefjKEuZ3m4jL9Gg1h2JBvmXSMYiZtp9MR5I6pvbvylU_PP5xJFSjVTIz7IQSjcVGO41npnwIxRXNRxFOdIUHn0tjQ-7LwvEcTXyPsHXcMD8WtgBh-wxR8aKX7WPSsT1O8d8reb2aR7K3rkV3K82K_0OgawImEpwSvp9MNKynEAJQS6ZHe_J_l77652xwPNxMRTMASk1ZsJL',
           
           '7r5neVAxGen8pOlc_au98I1DhQqn0auMKj7QdWKr2z1UGDwP5DbAPp5yePRz9xNN07OWNdprCnoZ_yKfmCHaTP8OHqWpD1SHvHPPLECi3oQObPJsam8M9aUAQWe1wqBU6Y0p7Ovk3IH6eAOsMNKPYkG3gjdbXA8YJz9QPv-ChPXjhwzpn3esgXVit2MoprAtXeCbb74qNB6Tmu4h7lfphSEoQKi6xjJ9R7SlStTdUhf_7YyX41NXSHtKNbFdULITfTKi339TQa5aQhY1DA4LhhuICWwHOKVf9WFhW-wNfJZRQ9nBISIAPNqxNEo27JozPkVFoZ3cBNOVbWNR-gw6dy_QSrTB0lMNXPnvRbvQXUOLSr3RCWyW-V3AVNP2GGqlhKOo_dHlrUlRzSWgLTUDFNn8BkejSp75GCGgT9TA3fGW6mKVtrjNfTG1X_JKsPv8VpmpI7yapNEHDs-_aOoBQa3ngg11MSwPQjQHu-ejMtKHfVNfHCFBtWrr9iWyzjjdqtxzD9WTU_qyq8Hf_crGLJOt_zDRsYmX3lkEbNf99Fo5fesOmhUw4cQ5YIjDCg-vmyqDi9WPQbjH_h_x6sy9YmpaQ3aL5VaDqY7NkSpeLdwZdcPscvbIPMp8cL2l_bzfRbx1f9GTD_U5y5QjnJbW9OtSZtVvd-Mu-YtGwhHr9RMSoP6yJL6tMhT29ui9vpmLsjpxTQ',
            MFCountry.UNITEDARABEMIRATES,
            MFEnvironment.LIVE
        );
    };


    const setUpActionBar = async () => {
        await MFSDK.setUpActionBar('Company Payment', processColor('#FFFFFF'), processColor('#000000'), true);
    };

    var cardPaymentView: MFCardPaymentView | null;

    const paymentCardStyle = () => {
        var cardViewInput = new MFCardViewInput(
            processColor('gray'),
            13,
            MFFontFamily.SansSerif,
            32,
            0,
            processColor('#c7c7c7'),
            2,
            8,
            new MFCardViewPlaceHolder('Name On Card test', 'Number test', 'MM / YY', 'CVV test')
        );
        var cardViewLabel = new MFCardViewLabel(
            true,
            processColor('black'),
            13,
            MFFontFamily.CourierNew,
            MFFontWeight.Bold,
            new MFCardViewText('Card Holder Name test', 'Card Number test', 'Expiry Date test', 'Security Code test')
        );
        var cardViewError = new MFCardViewError(processColor('red'), 8, new MFBoxShadow(10, 10, 5, 0, processColor('yellow')));
        var cardViewStyle = new MFCardViewStyle(false, 'initial', 230, cardViewInput, cardViewLabel, cardViewError);
        return cardViewStyle;
    };


    initiateSession = async () => {
        var initiateSessionRequest = new MFInitiateSessionRequest('testCustomer');

        await MFSDK.initiateSession(initiateSessionRequest)
            .then((success: MFInitiateSessionResponse) => {
                console.log(success);
                setSessionId(success.SessionId);
                loadCardView(success);
            })
            .catch((error) => console.log('error : ' + error));
    };

    loadCardView = async (initiateSessionResponse: MFInitiateSessionResponse) => {
        await cardPaymentView
            ?.load(initiateSessionResponse, (bin: string) => console.log('bin: ' + bin))
            .then((success) => {
                console.log('cardLaoded', success);
            })
            .catch((error) => console.log('error : ' + error));
    };

    const pay = async () => {
        var executePaymentRequest = new MFExecutePaymentRequest(finalCheckoutPrice|| 10);
        executePaymentRequest.sessionId = sessionId ?? '';

        await cardPaymentView
            ?.pay(executePaymentRequest, MFLanguage.ARABIC, (invoiceId: string) => onEventReturn('invoiceId: ' + invoiceId))
            .then((success) => onSuccess(success))
            .catch((error) => onError(error));
    };


    const onEventReturn = (invoice) => {
        setInvoiceId(invoice);
        console.warn(invoice);
    };

    const onSuccess = (success) => {
        setModalVisible(false)
        confirmOrder()
    }

    const onError = (error) => {
        console.log('error', error)
    }

    return (
        <View style={{ flex: 1, marginTop: 50 }}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>

                        <TouchableOpacity onPress={()=>setModalVisible(false)}  style={{alignSelf:"flex-start"}}>
                            <Entypo  name={'cross'}  size={22} />
                        </TouchableOpacity>
                        <MFCardPaymentView
                            ref={(ref) => (cardPaymentView = ref)}
                            paymentStyle={paymentCardStyle()}
                            style={{
                                height: 270,
                                width: '100%',
                                opacity: sessionId ? 1 : 1,
                                backgroundColor: 'white',
                            }}
                        />

                        <CustomButton
                            title={"PAY"}
                            style={{ width: "80%" }}
                            onPress={pay}
                        />

                    </View>
                </View>
            </Modal>




        </View>
    )
}

export default MyFatoorahPayment

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#00000070',

    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 5,
        padding: 10,
        alignItems: 'center',
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