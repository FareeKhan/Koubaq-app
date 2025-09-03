import { createSlice } from "@reduxjs/toolkit";

export const AddFavorite = createSlice({
    name: "AddFavorite",
    initialState: {
        AddInFavorite: []
    },
    reducers: {
        productFavorite: (state, action) => {
            console.log('showmeData',action.payload)
            state.AddInFavorite.push(action.payload)
        },
        removeFavorite: (state, action) => {
            const { id } = action.payload;
            state.AddInFavorite = state?.AddInFavorite.filter(product => product?.id !== id);
        },
    }
})


export const { productFavorite,removeFavorite } = AddFavorite.actions

export default AddFavorite.reducer