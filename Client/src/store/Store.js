import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice/index"
import adminProductSlice from "./admin/productSlice/index"
import shopProductSlice from "./shop/product-slice/index"
import adminCartSlice from "./admin/cartSlice/index"
import orderSlice from "./admin/orderSlice/index"

const store = configureStore({

    reducer: {
        auth : authSlice,
        adminProducts : adminProductSlice,
        shopProducts : shopProductSlice,
        adminCartSlice : adminCartSlice,
        orderSlice : orderSlice
    }
})

export default store