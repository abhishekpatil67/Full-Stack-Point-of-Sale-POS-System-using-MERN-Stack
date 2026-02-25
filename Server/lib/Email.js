import nodemailer from "nodemailer"
import dotenv from "dotenv"

dotenv.config();



export async function sendEmail(to, subject, html) {


    const host = process.env.SMTP_HOST
    const user = process.env.SMTP_USER
    const port = process.env.SMTP_PORT
    const pass = process.env.SMTP_PASS
    const from = process.env.SMTP_FROM

    const transporter = nodemailer.createTransport(
        {
            host,
            port,
            secure: false,
            auth: {
                user,
                pass
            }
        }
    )

    try {

        const verify = await transporter.verify();
        if (!verify) {
            console.error("Email not sent.Transporter error");
            return ({ success: false, message: "error while registering the user. please try again later..." })
        }

        console.log("email sending");

        const info = await transporter.sendMail({
            from,
            to,
            text: "verify your email",
            subject,
            html,
        });

        console.log(info)
        console.log("email has been sent...");

        return ({ success: true, message: "email sent please verify your email" })

    } catch (err) {
        console.error("Email not sent...", err);
        return ({ success: false, message: "error while registering the user. please try again later..." })
    }

}






