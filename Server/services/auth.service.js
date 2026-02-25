import User from "../../models/User.model.js"
import { registerSchema, loginSchema } from "./auth.schema.js";
import { createHash, checkPassword } from "../../lib/hash.js";
import { createAccessToken, createRefreshToken } from "../../lib/token.js";
import { sendEmail } from "../../lib/Email.js";
import jwt from "jsonwebtoken"
import crypto from "crypto"



function getAppUrl() {
    return (process.env.APP_URL || `http://localhost:${process.env.PORT}`)
}
export async function registerHandler(req, res) {

    const result = registerSchema.safeParse(req.body)

    if (!result.success) {
        console.log(result);

        return (res.status(400).json({ success: result.success, massege: "invalid credentials..." }))
    }

    const { name, email, password, role } = result.data;
    const normalizedEmail = email.toLowerCase().trim();

    const user = await User.findOne({ email: normalizedEmail })

    if (user) {
        return (res.status(403).json({ success: false, massege: "the email is already registed please login..." }))
    }

    const hashedPass = await createHash(password)

    const newlyCreatedUser = await User.create({
        name,
        email: normalizedEmail,
        hashedPass,
        role,
        isEmailVerified: false
    })

    newlyCreatedUser.save();

    const verifyToken = jwt.sign({ sub: newlyCreatedUser._id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "1d" })

    const verifyUrl = `${getAppUrl()}/auth/verify-email?token=${verifyToken}`
    const ok = await sendEmail(
        normalizedEmail,
        "verify user email",
        `
        <p>verify your email by clicking on the link :</p>
        <p><a href="${verifyUrl}">${verifyUrl}</a></p>

        `)

    if (!ok.success) {
        return (res.status(500).json({ message: ok.message }))
    }

    return (res.status(200).json({ message: ok.message }))
}


export async function verifyEmailHandler(req, res) {

    const token = req.query.token
    if (!token) {
        return (res.status(401).json({ success: false, message: "token missing" }))
    }

    try {

        const payload = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)

        const user = await User.findById(payload.sub)

        if (!user) {
            return (res.status(401).json({ success: false, message: "email is not registered. sign up first" }))
        }

        user.isEmailVerified = true;

        await user.save();

        return (res.status(200).json({ success: true, message: "email verified.Now you can login" }))

    } catch (err) {

        return (res.status(500).json({ success: false, message: "internal server error" }))
    }

}


export async function loginHandler(req, res) {

    const result = loginSchema.safeParse(req.body)

    if (!result.success) {
        return (res.status(400).json({ success: result.success, massege: "invalid credentials..." }))
    }

    const { email, password } = result.data;
    const normalizedEmail = email.toLowerCase().trim();

    const user = await User.findOne({ email: normalizedEmail })

    if (!user) {
        return (res.status(403).json({ message: "user not found. Enter valid email." }))
    }

    const isok = await checkPassword(password, user.hashedPass)

    if (!isok) {
        return (res.status(400).json({ message: "enter correct password..." }))
    }

    const accessToken = await createAccessToken(user._id, user.role, user.tokenVersion)

    const refreshToken = await createRefreshToken(user._id, user.tokenVersion)

    const isProd = process.env.NODE_ENV === "production"
    res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: isProd,
        sameSite: "lax",
        maxAge: 7 * 24 * 60 * 1000,

    })
    return (res.status(200).json({ message: "user logged in successfully", accessToken: accessToken }))

}


export async function logOutHandler(req, res) {

    res.cookie("refreshToken", "")
    return (res.status(200).json({ success: true, message: "user logged out" }))

}



export async function forgotPasswordHandler(req, res) {

   
    const {email} = req.body;

    const user = await User.findOne({ email: email })

    if (!user) {
        return (res.status(404).json({ success: false, massege: "if an account exists with this account we will sent a email..." }))
    }

    try {

        const rawToken = jwt.sign({sub:user._id},process.env.ACCESS_TOKEN_SECRET)

        const hashedToken =  crypto.createHash("sha256").update(rawToken).digest("hex")

        user.resetPasswordToken = hashedToken;
        user.resetPasswordExpires = new Date(Date.now() + 15 * 60 * 1000)

        await user.save();

        const resetUrl = `${getAppUrl()}/auth/reset-password?token=${rawToken}`

        await sendEmail(user.email,
            "reset your password",
            `
        <p>Reset your password by clicking on this link</p>
        <p><a href="${resetUrl}">Click Here</p>

        `)

        return (res.status(201).json({ success: true, massege: "if an account exists with this account we will sent a email..." }))
    }
    catch (error) {
        console.log(error)
        return (res.status(500).json({ success: false, massege: "Internal server error. Try again later..." }))
    }

}


export async function resetPasswordHandler(req, res) {

    const {token,password} = req.body;

    if (!token) {
        return (res.status(404).json({ success: false, massege: "something went wrong. Try again later"}))
    }

    try {

        const hashedToken =  crypto.createHash("sha256").update(token).digest("hex")

        console.log(hashedToken)

        const user = await User.findOne({resetPasswordToken:hashedToken})
        console.log(user)

        if(!user)
        {
             return (res.status(404).json({ success: false, massege: "something went wrong. Try again later x2"}))
        }

        const hashedPass = await createHash(password)

        user.hashedPass = hashedPass;
        user.resetPasswordExpires = undefined;
        user.resetPasswordToken = undefined;

        await user.save();

         return (res.status(200).json({ success: true, massege: "Password updated successfully" }))


    } catch (error) {
        console.log(error)
        return (res.status(404).json({ success: false, massege: "something went wrong. Try again later x3"}))
        
    }


}