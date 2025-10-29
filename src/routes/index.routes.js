import express from "express"
import appRouter from "./app.routes.js"

const router = express.Router()

router.use("/api/app", appRouter)

router.get("/health", async (req, res) => {
    res.status(200).json({ status: "UP", uptime: process.uptime() })
})

export default router