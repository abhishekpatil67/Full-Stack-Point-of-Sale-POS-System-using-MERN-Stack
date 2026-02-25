import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios";

const initialState = {

    orderList: [],
    isLoading: true,

}

export const fetchAllOrders = createAsyncThunk("/get-orders",async (userId,{rejectWithValue})=>{

    
    
     try {

        const response = await axios.get(`http://localhost:5000/admin/api/order/${userId}`)
        
        console.log(response.data);
        return (response?.data)

    } catch (error) {

        return (rejectWithValue({
            message: error.response.data.message,
            success: error.response.data.success
        }))

    }

})


const orderSlice = createSlice({
    name : "orderSlice",
    initialState,
    reducers : {},
    extraReducers : ((builder)=>{
        builder.addCase(fetchAllOrders.pending,(state)=>{
            state.isLoading = true
        }).addCase(fetchAllOrders.fulfilled,(state,action)=>{
            state.isLoading = false
            state.orderList = action.payload.data
        }).addCase(fetchAllOrders.rejected,(state)=>{
            state.isLoading = false
        })
    })
})


export default  orderSlice.reducer