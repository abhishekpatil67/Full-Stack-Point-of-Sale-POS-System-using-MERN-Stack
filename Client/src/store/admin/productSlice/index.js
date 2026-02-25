import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios";

const initialState = {

    productList: [],
    isLoading: true,

}


export const getAllProducts = createAsyncThunk("/admin/api/products/get-products", async (_,{ rejectWithValue }) => {

    try {
        const response = await axios.get("http://localhost:5000/admin/api/products/get-products")
        
        console.log(response.data);
        return (response.data)

    } catch (error) {

        return (rejectWithValue({
            message: error.response.data.message,
            success: error.response.data.success
        }))

    }


})


export const createProduct = createAsyncThunk("/admin/api/products/create-product", async (formData, { rejectWithValue }) => {

    try {

        console.log(formData)
        const response = await axios.post("http://localhost:5000/admin/api/products/create-product", formData, {
            headers : {
                "Content-Type" : "application/json"
            },
            withCredentials: true
        })

        return (response?.data)

    } catch (error) {

        return (rejectWithValue({
            message: error.response.data.message,
            success: error.response.data.success
        }))

    }


})


export const editProduct = createAsyncThunk("/admin/api/products/edit-product", async ({id, formData}, { rejectWithValue }) => {

    try {
        const response = await axios.put(`http://localhost:5000/admin/api/products/edit-product/${id}`, formData, {
            withCredentials: true
        })

        console.log(response.data);
        return (response?.data)

    } catch (error) {

        return (rejectWithValue({
            message: error.response.data.message,
            success: error.response.data.success
        }))

    }
})

export const deleteProduct = createAsyncThunk("/admin/api/products/delete-product", async (id,{ rejectWithValue }) => {

    try {

        const response = await axios.delete(`http://localhost:5000/admin/api/products/delete-product/${id}`, {
            withCredentials: true
        })

        console.log(response.data)
        return (response.data)

    } catch (error) {

        return (rejectWithValue({
            message: error.response.data.message,
            success: error.response.data.success
        }))

    }
})





const AdminProductSlice = createSlice({
    name: "adminProductSlice",
    initialState,
    reducers: {},
    extraReducers: ((buider) => {

        // get all products

        buider.addCase(getAllProducts.pending, (state) => {
            state.isLoading = true;
        }).addCase(getAllProducts.fulfilled, (state, action) => {
            state.productList = action?.payload?.data
            state.isLoading = false
        }).addCase(getAllProducts.rejected, (state) => {
            state.isLoading = false
            state.productList = []
        }).addCase(createProduct.pending, (state) => {
            state.isLoading = true;
        }).addCase(createProduct.fulfilled, (state) => {
            state.isLoading = false
        }).addCase(createProduct.rejected, (state) => {
            state.isLoading = false
        }).addCase(editProduct.pending, (state) => {
            state.isLoading = true;
        }).addCase(editProduct.fulfilled, (state) => {
            state.isLoading = false
        }).addCase(editProduct.rejected, (state) => {
            state.isLoading = false
        }).addCase(deleteProduct.pending, (state) => {
            state.isLoading = true;
        }).addCase(deleteProduct.fulfilled, (state) => {
            state.isLoading = false
        }).addCase(deleteProduct.rejected, (state) => {
            state.isLoading = false
        })
    })
})





export default AdminProductSlice.reducer
