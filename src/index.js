import express from 'express'
import mongoose from 'mongoose'
import dotenv from "dotenv"
import router from './routes/index.routes.js'
import connectDB from './config/db.config.js'
import cors from "cors"

dotenv.config({
    path: "./.env"
})

const app = express()
const port = process.env.PORT

const origin = ["http://localhost:5174"]
app.use(cors({
    origin
}))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use("/", router)

async function startServer() {
    try {
        await connectDB()
        app.listen(port, () => {
            console.log(`🚀 SERVER IS RUNNING AT PORT ${port}`)
        })
    } catch (error) {
        console.error("⚠️ Server Error: ", error.message)
    }
}
startServer()


process.on("SIGINT", async () => {
    console.log("🪧  SERVER SHUTTING DOWN!")
    try {
        if (mongoose.connection.readyState === 1) {
            await mongoose.connection.close()
            console.log("📊 MONGO_DB CONNECTION CLOSED")
        }

        setTimeout(() => process.exit(0), 250);
    } catch (error) {
        console.error("⚠️ ERROR DURING SHUTDONW:", error.message)
        setTimeout(() => process.exit(1), 250)
    }
})