import express from "express"
import Experience from "../models/experience.model.js"

const appRouter = express.Router()

appRouter.get("/experiences", async (req, res) => {
    try {
        const experiences = await Experience.find()
        res.status(200).json(experiences)
    } catch (error) {
        console.error("GET EXPRIENCES CONTROLLER ERROR")
        res.status(500).json({ message: "Something went wrong" })
    }
})

appRouter.get("/experiences/:id", async (req, res) => {
    try {
        const { id } = req.params
        if (!id) return res.status(400).json({ messeage: "Experience ID is required" })

        const experience = await Experience.findById({ _id: id })
        if (!experience) return res.status(400).json({ messeage: "Experience is undefined" })

        res.status(200).json(experience)
    } catch (error) {
        console.error("GET EXPRIENCE CONTROLLER ERROR")
        res.status(500).json({ message: "Something went wrong" })
    }
})

appRouter.post("/bookings", async (req, res) => {

})

appRouter.post("/promo/validate", async (req, res) => {

})

export default appRouter