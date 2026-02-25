import express from "express"
import authRouter from "./routes/authRoutes/auth.routes.js"
import adminRouter from "./routes/adminRoutes/productRoutes.js"
import cors from "cors"
import cookieParser from "cookie-parser"
import shopRouter from "./routes/shop/productRoutes.js"
import AdminCartRouter from "./routes/adminRoutes/cartRoutes.js"
import billRouter from "./routes/adminRoutes/billRouter.js"
import orderRouter from "./routes/adminRoutes/orderRoutes.js"



const app = express()

app.use(express.json())
app.use(cors({
    origin: "http://localhost:5173",
    methods: ['GET', 'POST', 'DELETE', 'PUT'],
    allowedHeaders: [
        "Content-Type",
        'Authorization',
        'Cache-Control',
        'Expires',
        'Pragma'
    ],
    credentials: true
}))
app.use(cookieParser())

app.use("/auth", authRouter)
app.use("/admin/api/products",adminRouter)
app.use("/shop/api/products",shopRouter)
app.use("/admin/api/cart",AdminCartRouter)
app.use("/admin/api/bill",billRouter)
app.use("/admin/api/order",orderRouter)



export default app;
