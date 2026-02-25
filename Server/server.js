import http from "http"
import app from "./app.js"
import connectToDB from "./config/conntctToDB.js"
import dotenv from "dotenv"

dotenv.config();


async function startServer() {

    await connectToDB();

    try {

        const server = http.createServer(app);
        server.listen(process.env.PORT, () => {
            console.log(`server running on port ${process.env.PORT}`);
        });

    } catch (err) {

        console.error("error while starting the server..", err);

    }


}

startServer();