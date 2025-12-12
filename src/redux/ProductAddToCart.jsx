

import { createSlice, current } from "@reduxjs/toolkit";

export const productAddToCart = createSlice({
    name: 'productInCart',
    initialState: {
        cartProducts: [],
        totalPrice: '',
        subTotalPrice: null,
        isPromo: false,
        restaurentID: null,
        vehicleID: null
    },
    reducers: {
        addProductToCart: (state, action) => {
            console.log('000dasdas123', (action.payload));

            const existId = state.cartProducts?.find((item) => item?.id == action.payload?.id)
            if (!existId) {
                state.cartProducts.push(action.payload)
            } else {
                existId.counter = action.payload?.counter
                existId.image = action.payload?.image
            }

            state.restaurentID = action.payload?.restaurantId

            const finalPrice = state.cartProducts?.reduce((sum, item) => sum + (item?.total || 0))
            state.totalPrice = finalPrice

            state.subTotalPrice = finalPrice


            console.log('000dasdas', current(state.cartProducts));
        },
        incrementCounter: (state, action) => {
            const product = state.cartProducts.find((item) => item.id === action.payload);
            if (product) {
                product.counter += 1;
            }
            const finalPrice = state.cartProducts.reduce((total, item) => {
                return total + item.counter * parseFloat(item.price);
            }, 0)
                .toFixed(2);
            state.totalPrice = finalPrice
        },
        decrementCounter: (state, action) => {
            const product = state.cartProducts.find((item) => item.id === action.payload);
            if (product.counter == 1) {
                state.cartProducts = state.cartProducts?.filter((item) => item?.id != product?.id)
            } else {
                product.counter -= 1;
            }


            const finalPrice = state.cartProducts.reduce((total, item) => {
                return total + item.counter * parseFloat(item.price);
            }, 0)
                .toFixed(2);
            state.totalPrice = finalPrice

        },
        handlePromo: (state, action) => {
            state.isPromo = true
        },
        deleteProduct: (state, action) => {
            state.cartProducts = state.cartProducts.filter((item, index) => item?.id != action.payload)
            const finalPrice = state.cartProducts.reduce((total, item) => {
                return total + item.counter * parseFloat(item.price);
            }, 0)
                .toFixed(2);
            state.totalPrice = finalPrice
        },
        handleTotalPrice: (state, action) => {
            state.totalPrice = action.payload
            console.log('aminaaBegin', state.totalPrice)
        },
        clearCart: (state) => {
            state.cartProducts = [];
            state.totalPrice = '';
            state.isPromo = false
        }

    }
});

export const { addProductToCart, incrementCounter, decrementCounter, deleteProduct, handleTotalPrice, clearCart, handlePromo } = productAddToCart.actions;

export default productAddToCart.reducer;
