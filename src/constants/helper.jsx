import { initPaymentSheet, presentPaymentSheet } from "@stripe/stripe-react-native";
import { getPaymentIntentApi } from "../userServices/UserService";
import { showMessage } from "react-native-flash-message";
import { GOOGLE_API } from "./data";
import { colors } from "./colors";

export const initializePaymentSheet = async (price,setLoading) => {
    const paymentIntent = await getPaymentIntentApi(price);


    if (!paymentIntent) {
      console.error("Failed to get payment intent");
      Alert.alert("Error", "Unable to initialize payment.");
      return;
    }

    const { error } = await initPaymentSheet({
      paymentIntentClientSecret: paymentIntent,
      merchantDisplayName: "OnWay"
    });

    if (!error) {
    //   setLoading(true);
    } else {
      console.error("PaymentSheet Initialization Error:", error);
      Alert.alert("Error", error.message);
    }
  };


  export const openPaymentSheet = async (processOrder) => {
    //   if (!loading) {
    //     Alert.alert("Error", "Payment sheet not initialized.");
    //     return;
    //   }
  
      const { error } = await presentPaymentSheet();
      if (error) {
        showMessage({
          type: "danger",
          message: error.message
        })
      } else {
        processOrder()
      }
    };




export const getAddressFromCoordinates = async (latitude,longitude ) => {
  try {
    const apiKey = GOOGLE_API;
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}`
    );

    const data = await response.json();
    const result = data.results?.[0];

    if (!result) return null;

    const components = result.address_components;

    const get = (type) =>
      components.find(c => c.types.includes(type))?.long_name || '';

    return {
      formattedAddress: result.formatted_address,
      emirate: get('administrative_area_level_1'),
      city: get('locality'),
      area: get('sublocality') || get('neighborhood'),
      street: get('route'),
      buildingNumber: get('street_number'),
      country: get('country'),
      postalCode: get('postal_code'),
      latitude,
      longitude,
    };

  } catch (error) {
    console.log('error', error);
    return null;
  }
};


export const DEFAULT_TAB_BAR_STYLE = {
  position: "absolute",
  bottom: 20,
  marginHorizontal: 20,
  borderRadius: 18,
  alignItems: "center",
  justifyContent: "center",
  height: 60,
  borderWidth: 1,
  borderColor: colors.black1,
  paddingTop: 10,
};