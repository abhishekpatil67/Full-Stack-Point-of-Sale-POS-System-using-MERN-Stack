import mongoose, { mongo } from "mongoose";
import { configDotenv } from "dotenv";

configDotenv();

const connectToDB = async ()=>{
    try {


        await mongoose.connect(process.env.MONGODB_URI)
        console.log("Database Connection successfull");
        
        
    } catch (err) {

        console.log("error while connecting to DB..",err);
        
        
    }
}

export default connectToDB;