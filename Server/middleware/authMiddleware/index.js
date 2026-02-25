import { verifyToken } from "../../lib/token.js";
import User from "../../models/User.model.js";


export async function isLoggedIn(req, res, next) {

    const token = req.cookies.refreshToken
    if (!token) {
        return (res.status(200).json({
            success: false,
            user: null,
            isAuthenticated: false,
            message: "user is not logged in..."
        }))
    }

    try {

        const decoded = await verifyToken(token)
        const user = await User.findById(decoded.sub)

        return (res.status(200).json({
            success: true,
            user: {
                email: user.email,
                role: user.role,
                userName: user.userName,
                _id : user._id
            },
            isAuthenticated: true,
            message: "user logged in successfully"
        }))

    } catch (error) {

        return (res.status(200).json({
            success: false,
            user: null,
            isAuthenticated: false,
            message: "user is not logged in...", accessToken: accessToken
        }))

    }
}


export async function checkAuth(req, res, next) {


    const authReq = String(req.headers.authorization);
    console.log(JSON.stringify(authReq))
    if (!authReq || !authReq.startsWith("Bearer")) {
        return (res.status(401).json({ sucess: false, message: "auth token missing..." }))
    }

    try {

        const token = authReq.split(" ")[1]
        const decoded = await verifyToken(token)

        if (!decoded) {

            return (res.status(401).json({ sucess: false, message: "invalid access token..." }))

        }

        req.user = decoded;

        next();

    } catch (error) {
        console.log(error)
        return (res.status(500).json({ sucess: false, message: "Internal Server Error" }))
    }

}