import { initPaymentSheet, presentPaymentSheet } from "@stripe/stripe-react-native";
import { getPaymentIntentApi } from "../userServices/UserService";
import { showMessage } from "react-native-flash-message";

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