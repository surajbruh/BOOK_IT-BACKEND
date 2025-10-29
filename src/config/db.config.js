import "dotenv/config"
import mongoose from "mongoose"

export default async function connectDB() {
    try {
        await mongoose.connect(process.env.MONGODB_URI)
        console.log("📊 DATABASE CONNECTED")
    } catch (error) {
        console.error("DB Error: ", error.message)
    }
}