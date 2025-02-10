import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const Schema = mongoose.Schema
const taskSchema = new Schema({
    email:{
        type: String,
        required: true,
        
    },
    password:{
        type: String,
        required: true,
    },
    salt:{
        type: String,
    }
}, {timestamps: true});


// const connectDb = async ()=>{
//     try {
//         await mongoose.connect(process.env.MONGODB_URI);
//         console.log("MongoDB Connected Successfully!");
//     } catch (error) {
//         console.log("MongoDB Connection Failed:", error.message)
//         process.exit(1);
//     }
// }
const taskUser = mongoose.model('taskUser',taskSchema)
export { taskUser}