import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"
import { toast } from "sonner"


const initialState = {
  isAuthenticated: false,
  isLoading: true,
  user: null
}


export const checkLoggedIn = createAsyncThunk("/auth/check-login", async (_, { rejectWithValue }) => {

  try {

    const response = await axios.post("http://localhost:5000/auth/check-login", {}, {
      withCredentials: true
    })

    return (response.data)

  } catch (error) {

    return rejectWithValue({
      message: error.response.data.message,
      success: error.response.data.success
    })

  }


})

export const loginUser = createAsyncThunk("/auth/login", async (formData, { rejectWithValue }) => {

  try {

    const response = await axios.post("http://localhost:5000/auth/login", formData, {
      withCredentials: true
    })

    return (response.data)

  } catch (error) {

    return rejectWithValue({
      message: error.response.data.message,
      success: error.response.data.success
    })
  }

})

export const registerUser = createAsyncThunk("/auth/register", async (formData, { rejectWithValue }) => {

  try {

    const response = await axios.post("http://localhost:5000/auth/register", formData, { withCredentials: true }
    )
    return response.data

  } catch (error) {

    console.log(error.response.data.message)
    console.log(error.response.data.success)

    return rejectWithValue({
      message: error.response.data.message,
      success: error.response.data.success
    })

  }
})
export const logoutUser = createAsyncThunk("/auth/logout", async (_, { rejectWithValue }) => {

  try {

    const response = await axios.post("http://localhost:5000/auth/logout", {}, { withCredentials: true }
    )
    console.log(response.data,"logout")
    return response.data

  } catch (error) {

    console.log(error.response.data.message)
    console.log(error.response.data.success)

    return rejectWithValue({
      message: error.response.data.message,
      success: error.response.data.success
    })

  }
})


export const forgotPasswordThunk = createAsyncThunk("/auth/forgot-password", async (formData, { rejectWithValue }) => {

  try {

    const response = await axios.post("http://localhost:5000/auth/forgot-password", formData, { withCredentials: true }
    )
    return response.data

  } catch (error) {

    console.log(error.response.data.message)
    console.log(error.response.data.success)

    return rejectWithValue({
      message: error.response.data.message,
      success: error.response.data.success
    })

  }
})

export const resetPasswordThunk = createAsyncThunk("/auth/reset-password", async ({ password, token }, { rejectWithValue }) => {

  try {
    console.log(password, "reset pass")
    const response = await axios.post("http://localhost:5000/auth/reset-password", { password, token }, { withCredentials: true }
    )
    return response.data

  } catch (error) {

    console.log(error.response.data.message)
    console.log(error.response.data.success)

    return rejectWithValue({
      message: error.response.data.message,
      success: error.response.data.success
    })

  }
})



const authSlice = createSlice({

  name: "auth",
  initialState,
  reducers: {},
  extraReducers: ((builder) => {

    // login api calls

    builder.addCase(loginUser.pending, (state) => {
      state.isAuthenticated = false,
        state.isLoading = true,
        state.user = null
    }).addCase(loginUser.fulfilled, (state, action) => {
      state.isAuthenticated = action.payload.success ? action.payload.isAuthenticated : false,
        state.isLoading = false,
        state.user = action.payload.success ? action.payload.user : null
      toast(action.payload.message, {
        action: {
          label: "Ok",
        },
      })
    }).addCase(loginUser.rejected, (state, action) => {
      state.isAuthenticated = false,
        state.isLoading = false,
        state.user = null
      toast(action.payload.message, {
        action: {
          label: "Ok",
        },
      })
    })

    //register api calls

    builder.addCase(registerUser.pending, (state) => {
      state.isLoading = true
    }).addCase(registerUser.fulfilled, (state) => {
      state.isLoading = false
    }).addCase(registerUser.rejected, (state, action) => {
      state.isLoading = false
      toast(action.payload.message ? action.payload.message : "something went wrong", {
        action: {
          label: "Ok",
        },
      })

    })
    // logout user api calls

    builder.addCase(logoutUser.pending, (state) => {
      state.isLoading = true
    }).addCase(logoutUser.fulfilled, (state) => {
      state.isLoading = false,
        state.user = null,
        state.isAuthenticated = false
    }).addCase(logoutUser.rejected, (state, action) => {
      state.isLoading = false
      toast(action.payload.message ? action.payload.message : "something went wrong", {
        action: {
          label: "Ok",
        },
      })
    })

    builder.addCase(checkLoggedIn.pending, (state) => {
      state.isLoading = true
    }).addCase(checkLoggedIn.fulfilled, (state, action) => {
      state.isAuthenticated = action.payload.success ? action.payload.isAuthenticated : false,
        state.isLoading = false,
        state.user = action.payload.success ? action.payload.user : null
    }).addCase(checkLoggedIn.rejected, (state) => {
      state.isAuthenticated = false,
        state.isLoading = false,
        state.user = null
    })

    builder.addCase(forgotPasswordThunk.pending, (state) => {
      state.isLoading = true
    }).addCase(forgotPasswordThunk.fulfilled, (state) => {
      state.isLoading = false
    }).addCase(forgotPasswordThunk.rejected, (state) => {
      state.isLoading = false
    })

    builder.addCase(resetPasswordThunk.pending, (state) => {
      state.isLoading = true
    }).addCase(resetPasswordThunk.fulfilled, (state) => {
      state.isLoading = false
    }).addCase(resetPasswordThunk.rejected, (state) => {
      state.isLoading = false
    })



  })

})

export default authSlice.reducer