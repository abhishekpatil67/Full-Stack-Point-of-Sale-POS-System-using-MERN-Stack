import jwt from "jsonwebtoken"
import { configDotenv } from "dotenv";
import { LoginTicket } from "google-auth-library";

configDotenv();


export async function createAccessToken(id, role, tokenVersion) {

    const accessToken = jwt.sign({ sub: id, role, tokenVersion }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "1d" })
    return accessToken;

}
export async function createRefreshToken(id, tokenVersion) {

    const refreshToken = jwt.sign({ sub: id, tokenVersion }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "7d" })
    return refreshToken;

}


export async function verifyToken(token) {

    try {
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
        return (decoded)
    }

    catch(error)
    {
        console.log("error occurred : ",error);
        return(false)

    }

   
    
}