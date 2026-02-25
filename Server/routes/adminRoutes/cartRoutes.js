import express from "express"
import { AddToCart, deleteCartItem, fetchAllCartItems, updateCart } from "../../controllers/adminControllers/cart-controllers.js"
import { checkoutController } from "../../controllers/adminControllers/order-controllers.js"




const router = express.Router()

router.post("/add-to-cart", AddToCart)
router.get("/get-cart-items/:userId", fetchAllCartItems)
router.put("/update-cart", updateCart)
router.delete("/delete-cart", deleteCartItem)
router.post("/checkout",checkoutController)



export default router