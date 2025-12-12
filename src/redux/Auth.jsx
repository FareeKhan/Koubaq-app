import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isLanguage:"en",
    loginData:{},
}

const auth = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        language :(state,action)=>{
            const {isSelectedLanguage} = action.payload 
            state.isLanguage =isSelectedLanguage
        },
        login :(state,action)=>{
            state.loginData = action.payload 
            console.log(" state.loginData", state.loginData)
        },
          logout :(state,action)=>{
            state.loginData = {} 
        },
    },
});


export const { language ,login,logout,handleDefaultRTL} = auth.actions;
export default auth.reducer;