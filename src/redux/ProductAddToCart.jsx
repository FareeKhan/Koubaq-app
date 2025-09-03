

import { createSlice } from "@reduxjs/toolkit";

export const productAddToCart = createSlice({
    name: 'productInCart',
    initialState: {
        cartProducts: [],
        totalPrice: '',
        isPromo: false
    },
    reducers: {
        addProductToCart: (state, action) => {

            const { productName, price, size,odo_id, counter,Variants,Variants_stock, id, image, subText,productWeight } = action.payload;
            const newProductAddedToCart = { productName, odo_id,price, size, Variants_stock,Variants,counter, id, image, subText ,productWeight}

            const existId = state.cartProducts?.find((item) => item?.id == id)
            if (!existId) {
                state.cartProducts.push(newProductAddedToCart)
            } else {
                existId.counter = counter
                existId.size = size
                existId.image = image
                existId.Variants = Variants
                existId.Variants_stock = Variants_stock
                // existId.price = price * counter

            }

            const finalPrice = state.cartProducts.reduce((total, item) => {
                return total + item.counter * parseFloat(item.price);
            }, 0)
                .toFixed(2);

            state.totalPrice = finalPrice
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
            if (product && product.counter > 1) {
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
