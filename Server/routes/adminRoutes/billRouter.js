import express from "express"
import { handleBillGeneration } from "../../controllers/adminControllers/bill-controllers.js"


const router = express.Router()

router.get("/:orderId", handleBillGeneration)

export default router


