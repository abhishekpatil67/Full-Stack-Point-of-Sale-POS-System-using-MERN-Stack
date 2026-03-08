import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios";


const initialState = {
    cartItems: [],
    isLoading: false
}



export const addToCart = createAsyncThunk("/admin/api/cart/add-to-cart", async ({ productId, userId, quantity }, { rejectWithValue }) => {

    try {

        const response = await axios.post("http://localhost:5000/admin/api/cart/add-to-cart", { productId, userId, quantity }, {
            withCredentials: true
        })

        console.log(response.data);
        return (response.data)

    } catch (error) {

        return (rejectWithValue({
            message: error.response.data.message,
            success: error.response.data.success
        }))

    }
})


export const getCartItems = createAsyncThunk("/admin/api/cart/get-cart-items", async ({userId}, { rejectWithValue }) => {

    try {
        const response = await axios.get(`http://localhost:5000/admin/api/cart/get-cart-items/${userId}`, {
            withCredentials: true
        })

        console.log(response.data);
        return (response.data)

    } catch (error) {

        return (rejectWithValue({
            message: error.response.data.message,
            success: error.response.data.success
        }))

    }
})


export const updateCartItems = createAsyncThunk("/admin/api/cart/update-cart", async ({ productId, userId, quantity }, { rejectWithValue }) => {

    try {
        const response = await axios.put("http://localhost:5000/admin/api/cart/update-cart", { productId, userId, quantity }, {
            withCredentials: true
        })

        console.log(response.data);
        return (response.data)

    } catch (error) {

        return (rejectWithValue({
            message: error.response.data.message,
            success: error.response.data.success
        }))

    }
})

export const deleteCartItems = createAsyncThunk("/admin/api/cart/delete-cart", async ({ productId, userId }, { rejectWithValue }) => {

    console.log(userId,productId,"deleted")
    try {
        const response = await axios.delete("http://localhost:5000/admin/api/cart/delete-cart",{
            data: { productId, userId },
            withCredentials: true
        })

        console.log(response.data);
        return (response.data)

    } catch (error) {

        return (rejectWithValue({
            message: error.response.data.message,
            success: error.response.data.success
        }))

    }
})


export const checkout = createAsyncThunk("/admin/api/cart/checkout", async ({ userId }, { rejectWithValue }) => {

    try {

        const response = await axios.post("http://localhost:5000/admin/api/cart/checkout", { userId }, {
            withCredentials: true
        })

        console.log(response.data, "checkout");
        return (response.data)

    } catch (error) {

        return (rejectWithValue({
            message: error.response.data.message,
            success: error.response.data.success
        }))

    }
})


const adminCartSlice = createSlice({
    name: "adminCartSlice",
    initialState,
    reducers: {},
    extraReducers: ((builder) => {
        builder.addCase(getCartItems.pending, (state) => {
            state.isLoading = true
        }).addCase(getCartItems.fulfilled, (state, action) => {
            state.isLoading = false,
                state.cartItems = action.payload.data.items
        }).addCase(getCartItems.rejected, (state, action) => {
            state.isLoading = false,
                console.log(action)
        }).addCase(addToCart.pending, (state) => {
            state.isLoading = true
        }).addCase(addToCart.fulfilled, (state, action) => {
            state.isLoading = false,
                state.cartItems = action.payload.data.items
        }).addCase(addToCart.rejected, (state, action) => {
            state.isLoading = false,
                console.log(action)
        }).addCase(updateCartItems.pending, (state) => {
            state.isLoading = true
        }).addCase(updateCartItems.fulfilled, (state, action) => {
            state.isLoading = false,
                state.cartItems = action.payload.data.items
        }).addCase(updateCartItems.rejected, (state, action) => {
            state.isLoading = false,
                console.log(action)
        }).addCase(deleteCartItems.pending, (state) => {
            state.isLoading = true
        }).addCase(deleteCartItems.fulfilled, (state, action) => {
            state.isLoading = false,
                state.cartItems = action.payload.data.items
        }).addCase(deleteCartItems.rejected, (state) => {
            state.isLoading = false
        }).addCase(checkout.pending, (state) => {
            state.isLoading = true
        }).addCase(checkout.fulfilled, (state, action) => {
            state.isLoading = false,
                console.log(action)
        }).addCase(checkout.rejected, (state, action) => {
            state.isLoading = false
            console.log(action)
        })
    })
})


export default adminCartSlice.reducer