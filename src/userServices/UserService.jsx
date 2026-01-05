import axios from "axios";
import { baseUrl, ImageBaseUrl, mainUrl } from "../constants/data";
import { showMessage } from "react-native-flash-message";


export const loginPhoneNo = async (phoneNo) => {
    let num = phoneNo;
    let result = num.replace(/^0/, "");
    const data = JSON.stringify({ phone_number: "+971" + result })
    try {
        const response = await axios.post(
            `${baseUrl}customer/generate-otp`,
            data,
            {
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                },
            }
        );
        return response.data;
    } catch (e) {
        console.log(e?.response?.data || e.message);
    }
};

export const verifyOtp = async (phoneNo, otp, token) => {
    let num = phoneNo;
    let result = num.replace(/^0/, "");
    const data = JSON.stringify({
        "phone_number": "+971" + result,
        "otp": otp,
        fcm_token: token
    })
    try {
        const response = await axios.post(
            `${baseUrl}customer/verify-otp`,
            data,
            {
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                },
            }
        );
        return response.data;
    } catch (e) {
        console.log(e?.response?.data || e.message);
    }
};

// export const bannerData = async () => {
//     try {
//         const response = await axios.get(
//             `${baseUrl}customer/verify-otp`,
//             {
//                 headers: {
//                     'Content-Type': 'application/json',
//                     Accept: 'application/json',
//                 },
//             }
//         );
//         return response.data;
//     } catch (e) {
//         console.log(e?.response?.data || e.message);
//     }
// };

export const fetchCategories = async () => {
    try {
        const response = await axios.get(
            `${baseUrl}categories?is_active=true`,
            {
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                },
            }
        );
        return response.data;
    } catch (e) {
        console.log(e?.response?.data || e.message);
    }
};


export const fetchBanners = async () => {
    try {
        const response = await axios.get(
            `${baseUrl}banners`,
            {
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                },
            }
        );
        return response.data;
    } catch (e) {
        console.log(e?.response?.data || e.message);
    }
};



export const fetchResaurentsByCategory = async (id) => {
    try {
        const response = await axios.get(
            `${baseUrl}categories/${id}/items`,
            {
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                },
            }
        );
        return response.data;
    } catch (e) {
        console.log(e?.response?.data || e.message);
    }
};

export const fetchResaurentsItems = async (id) => {
    console.log('sasdasdasd', `${baseUrl}restaurants/${id}/items`)
    try {
        const response = await axios.get(
            `${baseUrl}restaurants/${id}/items`,
            {
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                },
            }
        );
        return response.data;
    } catch (e) {
        console.log(e?.response?.data || e.message);
    }
};


export const fetchProductDetails = async (id) => {
    try {
        const response = await axios.get(
            `${baseUrl}items/${id}`,
            {
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                },
            }
        );
        return response.data;
    } catch (e) {
        console.log(e?.response?.data || e.message);
    }
};


export const fetchSuggestedMsgs = async (id) => {
    try {
        const response = await axios.get(
            `${baseUrl}restaurants/${id}/suggested-messages`,
            {
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                },
            }
        );
        return response.data;
    } catch (e) {
        console.log(e?.response?.data || e.message);
    }
};


export const fetchRestaurentList = async (id) => {
    try {
        const response = await axios.get(
            `${baseUrl}items`,
            {
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                },
            }
        );
        return response.data;
    } catch (e) {
        console.log(e?.response?.data || e.message);
    }
};

export const fetchTheme = async (id) => {
    console.log('--->dasdasd>>', id)
    try {
        const response = await axios.get(
            `${baseUrl}restaurants/${id}/gift-themes`,
            {
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                },
            }
        );
        return response.data;
    } catch (e) {
        console.log(e?.response?.data || e.message);
    }
};



// export const makeOrder = async (data, token) => {
//     console.log('datadata',data)
//     const postData = JSON.stringify({
//         "restaurant_id": 3,
//         "vehicle_id": 5,
//         "order_type": "standard",
//         "items": data,
//         "payment_type": "card",
//         "subtotal": 25.98,
//         "delivery_fee": 0,
//         "service_fee": 2,
//         "total": 27.98,
//         "customer_phone": "+1234567890",
//         "special_instructions": "consequatur",
//         "gift_from": "consequatur",
//         "gift_message": "consequatur",
//         "gift_theme": "consequatur"
//     })
//     try {
//         const response = await axios.post(
//             `${baseUrl}orders`,
//             postData,
//             {
//                 headers: {
//                     Accept: 'application/json',
//                     Authorization: `Bearer ${token}`,
//                 },
//             }
//         );
//         return response.data;
//     } catch (e) {
//         console.log(e?.response?.data || e.message);
//     }
// };

// ***************** ORDER APIS

export const makeOrder = async (data, resID, token, driverNote, selectedCarId, subTotal, phoneNo, payMethod, selectedCarInfo) => {
   
   
    console.log('selectedCarInfoselectedCarInfoselectedCarInfo', data)
    const array = data?.map((item, index) => ({
        ...item,
        item_id: item?.id,
        name: item?.title,
        quantity: item?.counter,
        selectedCarInfo
    }))

    const postData = {
        restaurant_id: resID,
        vehicle_id: selectedCarId,
        order_type: "standard",
        items: array,
        payment_type: payMethod || "card",
        subtotal: subTotal || 0,
        delivery_fee: 0,
        service_fee: 2,
        total: subTotal || 0,
        special_instructions: driverNote || 'No Instruction',
        customer_phone: phoneNo || "+1234567890",
        gift_from: "consequatur",
        gift_message: "consequatur",
        gift_theme: "consequatur"
    };
    try {
        const response = await axios.post(
            `${baseUrl}orders`,
            postData,
            {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json', // ✅ important
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        return response.data;
    } catch (e) {
        console.log(e?.response?.data || e.message);
    }
};


// export const makeGiftOrder = async (data) => {

//     const postData = {
//         gift_item: data?.title,
//         gift_message: 'forMyFrnd',
//         gift_theme: "standard",
//         recipient_name: 'nasdw',
//         recipient_phone: "0554087444",
//         recipient_address: 'kjhdasd',
//     };
//     try {
//         const response = await axios.post(
//             `${baseUrl}orders`,
//             postData,
//             {
//                 headers: {
//                     Accept: 'application/json',
//                     'Content-Type': 'application/json', // ✅ important
//                 },
//             }
//         );
//         return response.data;
//     } catch (e) {
//         console.log(e?.response?.data || e.message);
//     }
// };



export const fetchOrder = async (token) => {
    try {
        const response = await axios.get(
            `${baseUrl}orders`,
            {
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                    Authorization: `Bearer ${token}`
                },
            }
        );
        return response.data;
    } catch (e) {
        console.log(e?.response?.data || e.message);
    }
}


export const getPaymentIntentApi = async (amount) => {
    const data = JSON.stringify({ amount: amount })
    try {
        const response = await axios.post(`${baseUrl}payment/create-intent`,
            data,
            {
                headers: {
                    'Content-Type': "application/json",
                    Accept: 'application/json'
                },
            }
        )
        return response.data?.data?.client_secret
    } catch (error) {
        console.log('error', error)
    }
}





// ***************** GIFT APIS
export const fetchSentGifts = async (token) => {
    try {
        const response = await axios.get(
            `${baseUrl}gifts/sent`,
            {
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        return response.data;
    } catch (e) {
        console.log(e?.response?.data || e.message);
    }
};

export const fetchReceivedGifts = async (token) => {
    try {
        const response = await axios.get(
            `${baseUrl}gifts/sent`,
            {
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        return response.data;
    } catch (e) {
        console.log(e?.response?.data || e.message);
    }
};







// ***************** VEHICLE APIS
export const addVehicle = async (data, token) => {
    const { carCategory, carName, plateNo } = data
    const formData = new FormData()
    formData.append("brand", carName)
    formData.append("model", carCategory)
    formData.append("plate_number", plateNo)
    formData.append("category", carCategory)

    try {
        const response = await axios.post(
            `${baseUrl}vehicles`,
            formData,
            {
                headers: {
                    Accept: 'application/json',
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                },
            }
        );
        return response.data;
    } catch (e) {
        console.log(e?.response?.data || e.message);

    }
};


export const fetchVehicles = async (token) => {
    try {
        const response = await axios.get(
            `${baseUrl}vehicles`,
            {
                headers: {
                    Accept: 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        return response.data;
    } catch (e) {
        console.log(e?.response?.data || e.message);
    }
};



export const fetchProfile = async (token) => {
    try {
        const response = await axios.get(
            `${baseUrl}customer/profile`,
            {
                headers: {
                    Accept: 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        return response.data;
    } catch (e) {
        console.log(e?.response?.data || e.message);
    }
};


export const deleteVehicles = async (id, token) => {
    try {
        const response = await axios.delete(
            `${baseUrl}vehicles/${id}`,
            {
                headers: {
                    Accept: 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        return response.data;
    } catch (e) {
        console.log(e?.response?.data || e.message);
    }
};

// ++++++
export const makeGiftOrder = async (data, token, selectedCarId, finalPrice, selectedPayment) => {
    const themeImage = ImageBaseUrl + data?.selectedTheme?.image
    // Create FormData
    const value =
        data?.selectedContacts?.[0]?.phoneNumbers?.[0]?.number
        ?? data?.selectedContacts?.[0]?.givenName
        ?? '';
    const productArray = [
        {
            "item_id": data?.id,
            "name": data?.title,
            "price": data?.price,
            "quantity": data?.counter,
            "image": data?.image,
            "recipient_name": data?.cardName || 'no Name',
        }
    ]


    const payload = {
        gift_item: data?.title,
        gift_message: data?.selectedMsg,
        gift_theme: themeImage,
        recipient_name: data?.cardName || 'no Name',
        recipient_phone: data?.selectedContacts?.[0]?.phoneNumbers ? data?.selectedContacts?.[0]?.phoneNumbers?.[0]?.number
            : String(data?.selectedContacts?.[0]?.givenName)
            || '0556090234',
        products: productArray, // raw array
        payment_type: selectedPayment == 1 ? 'apple_pay' : selectedPayment == 2 ? "card" : 'wallet',
        restaurant_id: data?.restaurantId,
        subtotal: finalPrice,
        total: finalPrice,
        recipient_address: data?.address,
        vehicle_id: 20
    };

    console.log('payloadpayload===>>', payload)




    try {
        const response = await axios.post(
            `${baseUrl}gifts`,
            payload,
            {
                headers: {
                    Accept: 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        return response.data;
    } catch (e) {
        console.log(e?.response?.data || e.message);
    }
};

export const giftWalletUpdate = async (data, userId) => {
    const dataFormate = {
        "customer_id": userId,
        "amount": data?.products[0]?.price * data?.products[0]?.quantity
    }
    try {
        const response = await axios.post(
            `${baseUrl}wallet/update-balance`,
            dataFormate,
            {
                headers: {
                    Accept: 'application/json',
                },
            }
        );
        console.log('dasds')
        return response.data;
    } catch (e) {
        console.log(e?.response?.data || e.message);
    }
};

export const NearByRest = async (data) => {
    try {
        const response = await axios.get(
            `${baseUrl}restaurants/nearby`,
            {
                params: {
                    lat: Number(data.lat),
                    lng: Number(data.lng),
                    radius: 30,
                },
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                },
            }
        );
        return response.data;
    } catch (e) {
        console.log(e?.response?.data || e.message);
    }
}




export const fetchSendGifts = async (token) => {
    try {
        const response = await axios.get(
            `${baseUrl}gifts/sent`,
            {
                headers: {
                    Accept: 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        return response.data;
    } catch (e) {
        console.log(e?.response?.data || e.message);
    }
};


export const removeGiftData = async (id, token) => {
    try {
        const response = await axios.delete(
            `${baseUrl}gifts/${id}`,
            {
                headers: {
                    Accept: 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        return response.data;
    } catch (e) {
        console.log(e?.response?.data || e.message);
    }
};

export const giftRcvd = async (token) => {
    try {
        const response = await axios.get(
            `${baseUrl}gifts/received`,
            {
                headers: {
                    Accept: 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        return response.data;
    } catch (e) {
        console.log(e?.response?.data || e.message);
    }
};



// -------------------- Wallet APIS

export const getWalletBalance = async (token) => {
    try {
        const response = await axios.get(
            `${baseUrl}wallet/balance`,
            {
                headers: {
                    Accept: 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        return response.data;
    } catch (e) {
        console.log(e?.response?.data || e.message);
    }
};



export const topUpBalanceApi = async (data, token) => {
    try {
        const response = await axios.post(
            `${baseUrl}wallet/top-up`,
            data,
            {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        return response.data;
    } catch (e) {
        console.log(e?.response?.data || e.message);
    }
}



export const sendBalance = async (data, token) => {
    const postData = {
        "amount": data?.balance,
        "recipient_phone": (data?.phone),
    }
    try {
        const response = await axios.post(
            `${baseUrl}wallet/send-balance`,
            postData,
            {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        return response.data;
    } catch (e) {
        console.log(e?.response?.data || e.message);
    }
}

export const updateProfile = async (data, token) => {
    const imageUri = data.image.path
    const formData = new FormData();
    formData.append('name', data?.name);
    formData.append('profile_image', {
        uri: imageUri,
        type: data.image.mime,
        name: 'profile.jpg',
    });

    try {
        const response = await axios.post(
            `${baseUrl}customer/profile`,
            formData,
            {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        return response.data;
    } catch (e) {
        console.log(e?.response?.data || e.message);
    }
}

export const deleteProfile = async (token) => {
    try {
        const response = await axios.delete(
            `${baseUrl}customer/profile/image`,
            {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        return response.data;
    } catch (e) {
        console.log(e?.response?.data || e.message);
    }
}



export const walletTransaction = async (token) => {
    try {
        const response = await axios.get(
            `${baseUrl}wallet/transactions`,
            {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        return response.data;
    } catch (e) {
        console.log(e?.response?.data || e.message);
    }
}



export const getNotification = async (token) => {
    try {
        const response = await axios.get(
            `${baseUrl}customer/notifications`,
            {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        return response.data;
    } catch (e) {
        console.log(e?.response?.data || e.message);
    }
}





export const postPromo = async (promoCode, restId, subTotal, userId) => {
    promoCode, restId, subTotal, userId
    const body = {
        "restaurant_id": restId,
        "code": promoCode,
        "order_total": subTotal,
        "user_id": userId
    }
    try {
        const response = await axios.post(
            `${baseUrl}promo-codes/validate`,
            body,
            {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
            }
        );
        return response.data;
    } catch (e) {
        console.log(e?.response?.data || e.message);
    }
}



