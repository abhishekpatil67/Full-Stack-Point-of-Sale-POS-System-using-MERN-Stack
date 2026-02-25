import { Router } from "express";
import { registerHandler, loginHandler, logOutHandler, verifyEmailHandler,resetPasswordHandler,forgotPasswordHandler, profileRoute} from "../../controllers/authControllers/auth.controller.js";
import { checkAuth, isLoggedIn } from "../../middleware/authMiddleware/index.js";


const router = Router()

router.post("/register", registerHandler)
router.post("/login", loginHandler)
router.post("/logout", logOutHandler)
router.post("/verify-email",verifyEmailHandler)
router.post("/forgot-password", forgotPasswordHandler)
router.post("/reset-password", resetPasswordHandler)
router.post("/check-login", isLoggedIn)
router.get("/profile",checkAuth,profileRoute)


export default router