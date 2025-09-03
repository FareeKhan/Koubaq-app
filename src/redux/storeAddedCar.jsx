import { createSlice } from "@reduxjs/toolkit";

export const storeCar = createSlice({
    name: "saveCar",
    initialState: {
        saveCar: []
    },
    reducers: {
        storeCarData: (state, action) => {
            state.saveCar.push(action.payload)
        },
        deleteCar:(state, action)=>{
             const { id } = action.payload;
            state.saveCar = state?.saveCar.filter(item => item?.id !== id);
        },
        removeStoreCarData: (state, action) => {
               state.saveCar=[]
        },
    }
})


export const { storeCarData,deleteCar,removeStoreCarData} = storeCar.actions

export default storeCar.reducer