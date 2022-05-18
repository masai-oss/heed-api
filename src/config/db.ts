import dotenv from 'dotenv';
dotenv.config();
import {connect} from "mongoose";

module.exports = async ()=>{
    return await connect(`mongodb+srv://naukri:${process.env.MONGODB_PASSWORD}@cluster0.u9tan.mongodb.net/heep?retryWrites=true&w=majority`)
}