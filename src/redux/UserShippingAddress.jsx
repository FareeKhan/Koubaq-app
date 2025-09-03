

import { createSlice } from "@reduxjs/toolkit";

export const userAddress = createSlice({
    name: 'userAddress',
    initialState: {
        storeAddress: {}
    },
    reducers: {
        storeUserAddress :(state,action)=>{
            state.storeAddress= action.payload
        },
         emptyStoreUserAddress :(state,action)=>{
            state.storeAddress=  {}
        }

    }
});

export const { storeUserAddress,emptyStoreUserAddress} = userAddress.actions;

export default userAddress.reducer;
