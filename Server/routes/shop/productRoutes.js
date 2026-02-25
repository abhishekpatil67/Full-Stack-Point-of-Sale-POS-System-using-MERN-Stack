import { Router } from "express";
import { getFilteredProducts } from "../../controllers/shopControllers/product-controller.js";


const router = Router();

router.get("/get-products",getFilteredProducts)

export default router;

