import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios";


const initialState = {
    isLoading : false,
    productList : []
}


export const getAllFilteredProducts = createAsyncThunk("/shop/api/products/get-products", async ({filterParams,sortParams},{ rejectWithValue }) => {

    try {

        const query = new URLSearchParams({
            ...filterParams,
            sortBy : sortParams
        })
        const response = await axios.get(`http://localhost:5000/shop/api/products/get-products?${query}`)
        console.log(response.data);
        return (response?.data)

    } catch (error) {

        return (rejectWithValue({
            message: error.response.data.message,
            success: error.response.data.success
        }))

    }


})


const shopProductSlice = createSlice({
    name : 'shoppingProducts',
    initialState,
    reducers : {},
    extraReducers : (builder=>{

        builder.addCase(getAllFilteredProducts.pending,(state)=>{
            state.isLoading = true
        }).addCase(getAllFilteredProducts.fulfilled,(state,action)=>{
            state.isLoading = false
            state.productList = action.payload.data
        }).addCase(getAllFilteredProducts.rejected,(state)=>{
            state.isLoading = false
            state.productList = []
        })

    })

})

export default shopProductSlice.reducer