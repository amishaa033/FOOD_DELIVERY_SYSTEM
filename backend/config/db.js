import mongoose from "mongoose";
export const connectDB=async ()=>{
    await mongoose.connect('mongodb+srv://Food:amisha0312@cluster0.znnrphj.mongodb.net/food-del').then(()=>{
        console.log("DB connected");
    })
}