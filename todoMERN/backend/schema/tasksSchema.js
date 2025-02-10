import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config()
const Schema = mongoose.Schema

const taskSchema = new Schema({
    inputTask: { type: String, required: true },
    completedTask: { type: Boolean, default: false },
    id: { type: String, required: true},
    user_id: { type: String, required:true },
}, {timestamps: true})

export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("MongoDB Connected Successfully!");
    } catch (error) {
        console.error("MongoDB Connection Failed:", error.message);
        process.exit(1); 
    }
};
 const taskModel = mongoose.model('todoTask', taskSchema) 

 export default taskModel;