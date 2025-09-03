import {
  MFCardPaymentView,
  MFApplePayButtonView,
  MFInitiateSessionRequest,
  MFGetPaymentStatusRequest,
  MFSDK,
  MFApplePay,
  MFInitiateSessionResponse,
  MFInvoiceItem,
  MFSupplier,
  MFApplePayStyle,
  MFBoxShadow,
  MFCardViewError,
  MFCardViewInput,
  MFCardViewLabel,
  MFCardViewPlaceHolder,
  MFCardViewStyle,
  MFCardViewText,
  MFCurrencyISO,
  MFExecutePaymentRequest,
  MFFontFamily,
  MFFontWeight,
  MFLanguage,
  MFCustomerAddress,
  MFKeyType,
  MFInitiatePaymentRequest,
  MFSendPaymentRequest,
  MFNotificationOption,
  MFCardRequest,
  MFDirectPaymentRequest,
  MFPaymentMethod,
  MFDirectPaymentResponse,
  MFGetPaymentStatusResponse,
  MFInitiatePaymentResponse,
  MFSendPaymentResponse,
  MFCountry,
  MFEnvironment,
  MFGooglePayButton,
  MFGooglePayRequest,
  GooglePayButtonConstants,
  // MFRecurringModel,
  // MFRecurringType,
} from 'myfatoorah-reactnative';
import React from 'react';
import { onError, onEventReturn, button, onSuccess } from './utils';
import { View, FlatList, TouchableOpacity, Image, Text, TextInput, ScrollView, StyleSheet, processColor, Platform, ActivityIndicator } from 'react-native';
import { Config } from './Config';
import RNBounceable from '@freakycoder/react-native-bounceable';

export default class MFPaymentCyber extends React.Component {
  cardPaymentView: MFCardPaymentView | null = null;
  googlePayButton: MFGooglePayButton | null = null;
  applePayView: MFApplePayButtonView | null = null;

  state: {
    isConfigure: boolean;
    loading: boolean;

    paymentMethods: Array<MFPaymentMethod> | null;
    selectedPaymentMethod: MFPaymentMethod | null;
    invoiceValue: string;

    sessionId: string;
    isPayBtnVisible: boolean;
    isGooglePayBtnVisible: boolean;
    initiateSessionResponse: MFInitiateSessionResponse;
  };

  constructor(props: any) {
    super(props);
    this.state = {
      isConfigure: false,
      loading: false,
      paymentMethods: null,
      selectedPaymentMethod: null,
      invoiceValue: props.totalAmount,
      sessionId: '',
      isPayBtnVisible: false,
      isGooglePayBtnVisible: false,
      initiateSessionResponse: new MFInitiateSessionResponse(),
    };
  }

  

  componentDidMount() {
    this.configure();
    this.setUpActionBar();

    this.initiatePayment();
    setTimeout(() => {
      this.initiateSessionForCardView();
      if (Platform.OS === 'android') {
        this.initiateSessionForGooglePay();
      } else if (Platform.OS === 'ios') {
        this.applePay();
      }
    }, 1000); // 1000 milliseconds = 1 seconds
  }

  //#region Config
  configure = async () => {
    this.setState({ isConfigure: true });
    await MFSDK.init(Config.apiKey, MFCountry.UNITEDARABEMIRATES, MFEnvironment.LIVE);
  };

  setUpActionBar = async () => {
    await MFSDK.setUpActionBar('Company Payment', processColor('#ffffff'), processColor('#4dc4f7'), true);
  };

  showLoading() {
    this.setState({ loading: true });
  }

  hideLoading() {
    this.setState({ loading: false });
  }
  //#endregion

  //#region MFSDK
  initiatePayment = async () => {
    var initiatePaymentRequest: MFInitiatePaymentRequest = new MFInitiatePaymentRequest(10, MFCurrencyISO.SAUDIARABIA_SAR);
    this.showLoading();
    await MFSDK.initiatePayment(initiatePaymentRequest, MFLanguage.ARABIC)
      .then((success: MFInitiatePaymentResponse) => {
        this.setState({ paymentMethods: success.PaymentMethods });
      })
      .catch(error => onError(error))
      .finally(() => this.hideLoading());
  };

  sendPayment = async () => {
    var sendPaymentRequest = new MFSendPaymentRequest(Number.parseFloat(this.state.invoiceValue), MFNotificationOption.LINK, 'customerName');
    sendPaymentRequest.InvoiceItems = [new MFInvoiceItem('test', 1, 2), new MFInvoiceItem('test 2', 2, 3), new MFInvoiceItem('test 3', 2, 1)];
    sendPaymentRequest.CustomerEmail = 'Test@test.com';
    sendPaymentRequest.CustomerMobile = '123456789';
    sendPaymentRequest.CustomerReference = 'Test12345';
    sendPaymentRequest.DisplayCurrencyIso = MFCurrencyISO.UNITEDSTATES_USD;
    sendPaymentRequest.ExpiryDate = '2024-06-08T17:36:23.132Z';
    sendPaymentRequest.CustomerAddress = new MFCustomerAddress('test', 'test', 'test', 'test', '');
    sendPaymentRequest.MobileCountryCode = '+966';
    sendPaymentRequest.Language = MFLanguage.ARABIC;
    sendPaymentRequest.CustomerCivilId = 'test';
    sendPaymentRequest.UserDefinedField = 'Testing';
    sendPaymentRequest.ExpiryDate = '2024-10-11T08:35:58.090Z';

    this.showLoading();
    await MFSDK.sendPayment(sendPaymentRequest, MFLanguage.ARABIC)
      .then((success: MFSendPaymentResponse) => {
        console.log("====<AAA>====");
        onSuccess(success);
        console.log("====<AAA>====");
      })
      .catch(error => onError(error))
      .finally(() => this.hideLoading());
  };

  getPaymentStatus = async () => {
    var getPaymentStatusRequest = new MFGetPaymentStatusRequest('2876101', MFKeyType.INVOICEID);
    // var getPaymentStatusRequest = new MFGetPaymentStatusRequest('2843597', MFKeyType.INVOICEID); // Error
    // var getPaymentStatusRequest = new MFGetPaymentStatusRequest('07072848062172766974', MFKeyType.PAYMENTID);
    this.showLoading();
    await MFSDK.getPaymentStatus(getPaymentStatusRequest, MFLanguage.ARABIC)
      .then((success: MFGetPaymentStatusResponse) => {
        console.log("====<BBB>====");
        onSuccess(success.InvoiceStatus);
        console.log("====<BBB>====");
      })
      .catch(error => onError(error))
      .finally(() => this.hideLoading());
  };

  executePayment = async () => {
    var executePaymentRequest = new MFExecutePaymentRequest(Number.parseFloat(this.state.invoiceValue));
    executePaymentRequest.PaymentMethodId = this.state.selectedPaymentMethod?.PaymentMethodId ?? 0; //2;
    executePaymentRequest.InvoiceItems = [new MFInvoiceItem('test', 1, 2), new MFInvoiceItem('test 2', 2, 3), new MFInvoiceItem('test 3', 2, 1)];
    executePaymentRequest.CustomerEmail = 'Test@test.com';
    executePaymentRequest.CustomerName = 'test.com';
    executePaymentRequest.CustomerMobile = '123456789';
    executePaymentRequest.CustomerReference = 'Test12345';
    executePaymentRequest.DisplayCurrencyIso = MFCurrencyISO.UAE_AED;
    executePaymentRequest.ExpiryDate = '2024-06-08T17:36:23.173';
    executePaymentRequest.CustomerAddress = new MFCustomerAddress('test', 'test', 'test', 'test', '');
    executePaymentRequest.Suppliers = [new MFSupplier(1, 5, 5), new MFSupplier(2, 5, 5)];
    executePaymentRequest.MobileCountryCode = '+966';
    executePaymentRequest.Language = MFLanguage.ARABIC;
    executePaymentRequest.CustomerCivilId = 'test';
    executePaymentRequest.UserDefinedField = 'Testing';
    executePaymentRequest.ExpiryDate = '2024-10-11T08:35:58.090Z';
    // executePaymentRequest.RecurringModel = new MFRecurringModel(MFRecurringType.CUSTOM, 10);
    // executePaymentRequest.RecurringModel.IntervalDays = 10;
    this.showLoading();
    await MFSDK.executePayment(executePaymentRequest, MFLanguage.ARABIC, (invoiceId: string) => onEventReturn('invoiceId: ' + invoiceId))
      .then((success: MFGetPaymentStatusResponse) => {
        console.log("====<CCC>====");
        onSuccess(success.InvoiceStatus);
        console.log("====<CCC>====");
      })
      .catch(error => onError(error))
      .finally(() => this.hideLoading());
  };

  executeDirectPayment = async () => {
    var executePaymentRequest = new MFExecutePaymentRequest(Number.parseFloat(this.state.invoiceValue));
    executePaymentRequest.PaymentMethodId = this.state.selectedPaymentMethod?.PaymentMethodId ?? 0; //20; //9
    executePaymentRequest.DisplayCurrencyIso = MFCurrencyISO.UAE_AED;
    var mfCardRequest = new MFCardRequest('5123450000000008', '12', '25', '000', 'myFatoorah');
    // var directPaymentRequest = new MFDirectPaymentRequest(executePaymentRequest, 'TOKEN1218312359', null);
    var directPaymentRequest = new MFDirectPaymentRequest(executePaymentRequest, null, mfCardRequest);
    directPaymentRequest.SaveToken = true;
    directPaymentRequest.Bypass3DS = false;

    this.showLoading();
    await MFSDK.executeDirectPayment(directPaymentRequest, MFLanguage.ARABIC, (invoiceId: string) => onEventReturn('invoiceId:' + invoiceId))
      .then((success: MFDirectPaymentResponse) => {
        console.log("====<DDD>====");
        onSuccess(success.MfPaymentStatusResponse.InvoiceStatus);
        console.log("====<DDD>====");
      })
      .catch(error => onError(error))
      .finally(() => this.hideLoading());
  };

  cancelToken = async () => {
    let tokenId = 'TOKEN1218312360';
    this.showLoading();
    await MFSDK.cancelToken(tokenId, MFLanguage.ENGLISH)
      .then(success => {
        console.log("====<EEE>====");
        onSuccess(success);
        console.log("====<EEE>====");
      })
      .catch(error => onError(error))
      .finally(() => this.hideLoading());
  };

  cancelRecurringPayment = async () => {
    let recurringId = 'RECUR121835829';
    this.showLoading();
    await MFSDK.cancelRecurringPayment(recurringId, MFLanguage.ENGLISH)
      .then(success => {
        console.log("====<FFF>====");
        onSuccess(success);
        console.log("====<FFF>====");
      })
      .catch(error => onError(error))
      .finally(() => this.hideLoading());
  };

  paymentMethodsList() {
    if (this.state.paymentMethods != null && this.state.paymentMethods!!.length === 0) {
      return <View />;
    }
    return (
      <View>
        <FlatList
          horizontal
          data={this.state.paymentMethods}
          style={styles.flatList}
          contentContainerStyle={styles.flatListContent}
          renderItem={({ item: rowData }) => {
            return (
              <TouchableOpacity onPress={() => this.setState({ selectedPaymentMethod: rowData })} style={styles.flatListItem}>
                <View style={styles.flatListItemHolder}>
                  <Image
                    style={[this.state.selectedPaymentMethod?.PaymentMethodId === rowData.PaymentMethodId ? styles.imageSelected : styles.image]}
                    source={{ uri: rowData.ImageUrl! }}
                  />
                  <Text style={styles.label}> {rowData.PaymentMethodEn} </Text>
                </View>
              </TouchableOpacity>
            );
          }}
        />
      </View>
    );
  }

  onExecutePaymentButtonClickHandler() {
    if (this.state.selectedPaymentMethod?.IsDirectPayment) {
      this.executeDirectPayment();
    } else {
      this.executePayment();
    }
  }
  //#endregion

  //#region Embedded
  pay = async () => {
    var executePaymentRequest = new MFExecutePaymentRequest(Number.parseFloat(this.state.invoiceValue));
    executePaymentRequest.SessionId = this.state.sessionId ?? '';
    executePaymentRequest.DisplayCurrencyIso = MFCurrencyISO.UAE_AED;
    executePaymentRequest.InvoiceItems = [new MFInvoiceItem('test', 1, 2), new MFInvoiceItem('test 2', 2, 3), new MFInvoiceItem('test 3', 2, 1)];
    executePaymentRequest.CustomerEmail = 'Test@test.com';
    executePaymentRequest.CustomerName = 'test.com';
    executePaymentRequest.CustomerMobile = '123456789';
    executePaymentRequest.CustomerReference = 'Test12345';
    executePaymentRequest.DisplayCurrencyIso = MFCurrencyISO.UNITEDSTATES_USD;
    executePaymentRequest.ExpiryDate = '2024-06-08T17:36:23.173';
    executePaymentRequest.CustomerAddress = new MFCustomerAddress('test', 'test', 'test', 'test', '');
    executePaymentRequest.Suppliers = [new MFSupplier(1, 5, 5), new MFSupplier(2, 5, 5)];
    executePaymentRequest.MobileCountryCode = '+966';
    executePaymentRequest.Language = MFLanguage.ARABIC;
    executePaymentRequest.CustomerCivilId = 'test';
    executePaymentRequest.UserDefinedField = 'Testing';
    executePaymentRequest.ExpiryDate = '2024-10-11T08:35:58.090Z';
    await this.cardPaymentView
      ?.pay(executePaymentRequest, MFLanguage.ARABIC, (invoiceId: string) => console.log('invoiceId: ' + invoiceId))
      .then(success => {
        if(success.InvoiceStatus == 'Paid'){
          //useNavigation().navigate("ThankYou");
          this.props.onChangeSomeState("Paid")
        }
        console.log("====<GGG>====");
        onSuccess(success.InvoiceStatus);
        console.log("====<GGG>====");
      })
      .catch(error => onError(error));
  };

  applePay = async () => {
    var executePaymentRequest = new MFExecutePaymentRequest(Number.parseFloat(this.state.invoiceValue));
    executePaymentRequest.DisplayCurrencyIso = MFCurrencyISO.UAE_AED;
    executePaymentRequest.SessionId = this.state.sessionId ?? '';
    executePaymentRequest.InvoiceItems = [new MFInvoiceItem('test', 1, 2), new MFInvoiceItem('test 2', 2, 3), new MFInvoiceItem('test 3', 2, 1)];
    executePaymentRequest.CustomerEmail = 'Test@test.com';
    executePaymentRequest.CustomerName = 'test.com';
    executePaymentRequest.CustomerMobile = '123456789';
    executePaymentRequest.CustomerReference = 'Test12345';
    executePaymentRequest.DisplayCurrencyIso = MFCurrencyISO.UAE_AED;
    executePaymentRequest.ExpiryDate = '2024-06-08T17:36:23.173';
    executePaymentRequest.CustomerAddress = new MFCustomerAddress('test', 'test', 'test', 'test', '');
    executePaymentRequest.Suppliers = [new MFSupplier(1, 5, 5), new MFSupplier(2, 5, 5)];
    executePaymentRequest.MobileCountryCode = '+966';
    executePaymentRequest.Language = MFLanguage.ARABIC;
    executePaymentRequest.CustomerCivilId = 'test';
    executePaymentRequest.UserDefinedField = 'Testing';
    executePaymentRequest.ExpiryDate = '2024-10-11T08:35:58.090Z';

    await this.applePayView
      ?.applePayPayment(executePaymentRequest, MFLanguage.ARABIC, (invoiceId: string) => console.log('invoiceId: ' + invoiceId))
      .then(success => {
        console.log("====<HHH>====");
        onSuccess(success.InvoiceStatus);
        console.log("====<HHH>====");
      })
      .catch(error => onError(error));
  };

  loadApplePayButton = async () => {
    var executePaymentRequest = new MFExecutePaymentRequest(Number.parseFloat(this.state.invoiceValue));
    executePaymentRequest.DisplayCurrencyIso = MFCurrencyISO.UAE_AED;
    await this.applePayView
      ?.applePayDisplay(executePaymentRequest, MFLanguage.ENGLISH)
      .then(success => {
        console.log(success);
        this.applePayView
          ?.applePayExecutePayment()
          .then(successPayment => {
            console.log(successPayment);
          })
          .catch(error => console.log('error : ' + error));
      })
      .catch(error => console.log('error : ' + error));
  };

  paymentCardStyle = () => {
    var cardViewInput = new MFCardViewInput(
      processColor('black'),
      13,
      MFFontFamily.SansSerif,
      30,
      10,
      processColor('#c7c7c7'),
      2,
      5,
      new MFBoxShadow(0, 0, 0, 0, processColor('#c7c700')),
      new MFCardViewPlaceHolder('Name On Card test', 'Number test', 'MM / YY test', 'CVV test'),
    );
    var cardViewLabel = new MFCardViewLabel(
      false,
      processColor('black'),
      12,
      MFFontFamily.Tahoma,
      MFFontWeight.Normal,
      new MFCardViewText('Card Holder Name test', 'Card Number test', 'Expiry Date test', 'Security Code test'),
    );
    var cardViewError = new MFCardViewError(processColor('red'), 8, new MFBoxShadow(10, 10, 10, 10, processColor('#c7c700')));
    var cardViewStyle = new MFCardViewStyle(false, 'ltr', 300, cardViewInput, cardViewLabel, cardViewError);

    return cardViewStyle;
  };

  applePayStyle = () => {
    var applePayButton = new MFApplePayStyle(40, 10, 'Buy with', true);
    return applePayButton;
  };

  initiateSessionForCardView = async () => {
    var initiateSessionRequest = new MFInitiateSessionRequest('testCustomer');
    this.showLoading();

    await MFSDK.initiateSession(initiateSessionRequest)
      .then((response: MFInitiateSessionResponse) => {
        this.setState({
          initiateSessionResponse: response,
          sessionId: response.SessionId,
        });

        this.loadCardView();
        // this.loadApplePay();
        // this.loadAppleButton();
      })
      .catch(error => onError(error))
      .finally(() => this.hideLoading());
  };

  loadCardView = async () => {
    await this.cardPaymentView
      ?.load(this.state.initiateSessionResponse, (bin: string) => console.log('bin: ' + bin))
      .then(success => {
        console.log("====<III>====");
        onSuccess(success);
        console.log("====<III>====");
        this.setState({ isPayBtnVisible: true });
      })
      .catch(error => onError(error));
  };

  loadAppleButton = async () => {
    var executePaymentRequest = new MFExecutePaymentRequest(Number.parseFloat(this.state.invoiceValue));
    executePaymentRequest.DisplayCurrencyIso = MFCurrencyISO.UAE_AED;
    await this.applePayView
      ?.displayApplePayButton(this.state.initiateSessionResponse, executePaymentRequest, MFLanguage.ENGLISH)
      .then(success => {
        console.log(success);
        this.applePayView
          ?.applePayExecutePayment()
          .then(successPayment => {
            console.log(successPayment);
          })
          .catch(error => console.log('error : ' + error));
      })
      .catch(error => console.log('error : ' + error));
  };
  //#endregion

  //#region GooglePay
  initiateSessionForGooglePay = async () => {
    var initiateSessionRequest = new MFInitiateSessionRequest('testCustomer2');

    await MFSDK.initiateSession(initiateSessionRequest)
      .then((response: MFInitiateSessionResponse) => {
        const result = JSON.stringify(response, null, 2);
        console.log('result : ' + result);

        this.setState({ isGooglePayBtnVisible: true });
        var sessionId = response.SessionId ?? '';
        this.setupGooglePayHelper(sessionId);
      })
      .catch(error => console.log('error : ' + error));
  };

  setupGooglePayHelper = async (sessionId: String) => {
    var request = new MFGooglePayRequest('1', Config.merchantIdForGoogle, 'Test Vendor', MFCountry.UNITEDARABEMIRATES, MFCurrencyISO.UAE_AED);
    await this.googlePayButton
      ?.setupGooglePayHelper(sessionId, request, (invoiceId: string) => console.log('invoiceId: ' + invoiceId))
      .then(success => {console.log("====<JJJ>===="); onSuccess(success.InvoiceStatus); console.log("====<JJJ>====");})
      .catch(error => onError(error));
  };
  //#endregion

  //#region New Apple Pay
  loadApplePay = async () => {
    var executePaymentRequest = new MFExecutePaymentRequest(Number.parseFloat(this.state.invoiceValue));
    executePaymentRequest.DisplayCurrencyIso = MFCurrencyISO.UAE_AED;
    await MFApplePay.loadApplePay(this.state.initiateSessionResponse, executePaymentRequest, MFLanguage.ENGLISH, undefined, (loaded: Boolean) =>
      console.log('loaded: ' + loaded),
    )
      .then(success => {
        console.log(success);
      })
      .catch(error => console.log('error : ' + error));
  };

  openPaymentSheet = async () => {
    await MFApplePay.openApplePaymentSheet()
      .then(success => {
        console.log(success.CardBrand);
        this.applePayPayment();
      })
      .catch(error => console.log('error : ' + error));
  };

  applePayPayment = async () => {
    var executePaymentRequest = new MFExecutePaymentRequest(Number.parseFloat(this.state.invoiceValue));
    executePaymentRequest.DisplayCurrencyIso = MFCurrencyISO.UAE_AED;
    await MFApplePay.completeApplePayment(executePaymentRequest, (InvoiceId: string) => console.log('InvoiceId: ' + InvoiceId))
      .then(success => {
        console.log("====<KKK>====");
        onSuccess(success.InvoiceStatus);
        console.log("====<KKK>====");
      })
      .catch(error => console.log('error : ' + error));
  };

  validate = async () => {
    await this.cardPaymentView
      ?.validate()
      .then(success => {console.log("====<LLL>===="); onSuccess(success); console.log("====<LLL>====");})
      .catch(error => onError(error));
  };
  //#endregion

  //#region UI
  payButton() {
    var isDisabledPayButton = this.state.selectedPaymentMethod === null;
    var buttonStyles = isDisabledPayButton ? [styles.disabledButtonStyle] : [styles.buttonStyle];

    return (
      <TouchableOpacity disabled={isDisabledPayButton} style={buttonStyles} onPress={() => this.onExecutePaymentButtonClickHandler()}>
        <Text style={styles.buttonText}>Pay</Text>
      </TouchableOpacity>
    );
  }

  applePayButton() {
    return (
      <TouchableOpacity onPress={() => this.openPaymentSheet()} style={styles.applePayButton}>
        <View style={styles.applePayButtonContainer}>
          <Text style={styles.applePayText}>Pay with </Text>
          <Image source={require('./apple-pay-logo.png')} style={styles.applePayLogo} />
          <Text style={styles.applePayText}>Pay</Text>
        </View>
      </TouchableOpacity>
    );
  }

  label(title: String) {
    return (
      <View style={styles.label}>
        <Text style={styles.instructions}>{title}</Text>
      </View>
    );
  }

  input() {
    return (
      <View style={styles.inputHolder}>
        <TextInput
          style={styles.input}
          placeholder="Invoice value"
          onChangeText={text => this.setState({ invoiceValue: text })}
          defaultValue={this.state.invoiceValue}
          keyboardType="decimal-pad"
        />
      </View>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        {this.state.loading && (
          <View style={styles.loading}>
            <ActivityIndicator size="large" color="balck" />
          </View>
        )}
        {!this.state.isConfigure && button('Configure', this.configure)}
        

        {/*this.label('Please Enter Payment Amount:')*/}
        {/*this.input()*/}
        {/* {this.applePayButton()} */}


        {this.state.sessionId !== '' && <MFCardPaymentView ref={ref => (this.cardPaymentView = ref)} style={styles.cardView} />}
        {/* {this.state.sessionId !== '' && (
          <MFCardPaymentView ref={ref => (this.cardPaymentView = ref)} style={styles.cardView} paymentStyle={this.paymentCardStyle()} />
        )} */}


        {this.label('Please Select Payment Method:')}
        {this.paymentMethodsList()}

          {Platform.OS === 'android' && this.state.isGooglePayBtnVisible && (
            <MFGooglePayButton
              ref={ref => (this.googlePayButton = ref)}
              style={styles.googlePay}
              theme={GooglePayButtonConstants.Themes.Dark}
              type={GooglePayButtonConstants.Types.Checkout}
              radius={10}
            />
          )}
          {Platform.OS === 'ios' && (
            <MFApplePayButtonView ref={ref => (this.applePayView = ref)} style={styles.applePay} applePayButtonStyle={this.applePayStyle()} />
          )}

        <ScrollView style={styles.buttons_container}>
          {/*this.payButton()*/}
          {/*button('Reload CardView', this.initiateSessionForCardView)*/}
        

          {this.state.isPayBtnVisible && (
            <View style={styles.container_horizontal}>
              {/*button('Validate', this.validate, styles.btn_half)*/}
              {/*button('Pay', this.pay, styles.btn_half)*/}
              <RNBounceable
                onPress={this.pay}
                bounceEffectIn={1.1}
                bounceEffectOut={1}
                style={{ borderRadius: 20, flexDirection: 'row', alignItems: 'center', borderWidth: 1, paddingHorizontal: 15, paddingVertical: 15, backgroundColor: "#301A58", width: '100%' }}
              >
                <Text style={{ color: '#ffffff', fontSize: 14, alignContent: 'center', alignItems: 'center', width: '100%', fontFamily: 'Metrophobic-Regular', textAlign: 'center', textTransform: 'uppercase' }}>Pay</Text>
              </RNBounceable>
            </View>
          )}
          {/*Platform.OS === 'android' && button('Reload GooglePay', this.initiateSessionForGooglePay)*/}


          {/*button('Initiate Payment', this.initiatePayment)*/}
          {/*button('Send Payment', this.sendPayment)*/}
          {/*button('Get Payment Status', this.getPaymentStatus)*/}
          {/*button('Cancel Token', this.cancelToken)*/}
          {/*button('Cancel Recurring Payment', this.cancelRecurringPayment)*/}
        </ScrollView>
      </View>
    );
  }
  //#endregion
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',

    paddingTop: 10,
    paddingBottom: 20,
  },
  loading: {
    zIndex: 1,
    opacity: 1,
    backgroundColor: '#00000093',
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },

  //#region Embedded
  buttons_container: {
    width: '100%',
  },
  cardView: {
    width: '100%',
    height: 220,
    borderRadius: 20, elevation: 2, shadowColor: "grey", shadowOpacity: 0.5, shadowOffset: 6,
    marginBottom: 30
  },
  googlePay: {
    width: '100%',
    height: 70,
    margin: 10,
  },
  applePay: {
    width: '100%',
    marginBottom: 2,
    borderWidth:0,
    marginTop:50,
    paddingTop:20,
    textAlign:'center',
    justifyContent:'center',
  },
  container_horizontal: {
    flexDirection: 'row',
    paddingRight: 20,
    paddingLeft: 20,
  },
  btn_half: {
    width: '49%',
    marginTop: 10,
    paddingTop: 10,
    paddingBottom: 10,
    borderColor: '#fff',
    borderRadius: 10,
  },
  //#endregion

  //#region PaymentMethodsList
  flatList: {
    height: 100,
    flexGrow: 0,
  },
  flatListContent: {
    justifyContent: 'center',
  },
  flatListItem: {
    padding: 10,
  },
  flatListItemHolder: {
    alignItems: 'center',
  },
  image: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
  },
  imageSelected: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
    borderColor: '#301A58',
    borderWidth: 3,
    borderRadius: 5,
  },
  //#endregion

  label: {
    fontSize: 16,
    textAlign: 'center',
    margin: 3,
    color: '#000000',
    marginBottom: 0,
    flexDirection: 'row',
    fontFamily: 'Metrophobic-Regular'
  },
  disabledButtonStyle: {
    marginRight: 20,
    marginLeft: 20,
    marginTop: 10,
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: 'lightgray',
    borderRadius: 10,
    borderColor: '#fff',
  },
  buttonStyle: {
    marginRight: 20,
    marginLeft: 20,
    marginTop: 10,
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    borderColor: '#fff',
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    paddingLeft: 10,
    paddingRight: 10,
    fontSize: 18,
    fontWeight: '500',
  },
  instructions: {
    alignSelf: 'stretch',
    textAlign: 'left',
    color: '#333333',
    marginBottom: 5,
    fontWeight: '800',
    fontSize: 15,
    width: '100%',
    fontFamily: 'Metrophobic-Regular'
  },
  inputHolder: {
    margin: 10,
    marginTop: 0,
    flexDirection: 'row',
  },
  input: {
    height: 40,
    width: '100%',
    textAlign: 'center',
    fontSize: 15,
    fontWeight: '500',
    borderColor: 'lightgray',
    borderRadius: 5,
  },
  applePayButton: {
    backgroundColor: 'red',
    borderRadius: 8,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  applePayButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  applePayLogo: {
    width: 16,
    height: 16,
  },
  applePayText: {
    fontSize: 16,
    fontWeight: '400',
    color: '#fff',
  },
});
