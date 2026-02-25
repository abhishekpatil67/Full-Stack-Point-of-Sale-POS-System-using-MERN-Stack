import express from "express"
import { getOrdersController } from "../../controllers/adminControllers/order-controllers.js";


const router = express.Router()

router.get("/:userId",getOrdersController)

export default router;