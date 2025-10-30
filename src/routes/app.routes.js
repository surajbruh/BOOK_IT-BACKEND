import express from "express"
import Experience from "../models/experience.model.js"
import PromoCode from "../models/promoCode.model.js"

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
    try {
        const { code } = req.body
        const normalizedCode = code.trim()
        if (!normalizedCode) {
            return res.status(400).json({ message: "Promo code is required" })
        }

        const promo = await PromoCode.findOne({ code: normalizedCode })
        if (!promo) {
            return res.status(404).json({ valid: false, message: "Invalid promo code" })
        }

        if (!promo.isActive) {
            return res.status(403).json({ valid: false, message: "Promo code is inactive" })
        }

        if (new Date() > promo.expiresAt) {
            return res.status(410).json({ valid: false, message: "Promo code has expired" })
        }

        return res.status(200).json({
            valid: true,
            discountType: promo.discountType,
            value: promo.value
        })

    } catch (error) {
        console.error("VALIDATE CODE ERROR:", error.message)
        res.status(500).json({ message: "Something went wrong" })
    }
})

export default appRouter