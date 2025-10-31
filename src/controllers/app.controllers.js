import Experience from "../models/experience.model.js"
import PromoCode from "../models/promoCode.model.js"
import Ticket from "../models/ticket.model.js"

export const getExperiences = async (req, res) => {
    try {
        const experiences = await Experience.find()
        res.status(200).json({
            success: true,
            data: experiences
        })
    } catch (error) {
        console.error("GET EXPRIENCES CONTROLLER ERROR")
        res.status(500).json({
            success: false,
            message: "Something went wrong"
        })
    }
}

export const getExperience = async (req, res) => {
    try {
        const { id } = req.params
        if (!id) return res.status(400).json({
            success: false,
            message: "Experience ID is required"
        })

        const experience = await Experience.findById({ _id: id })
        if (!experience) return res.status(400).json({
            success: false,
            message: "Experience is undefined"
        })

        res.status(200).json(experience)
    } catch (error) {
        console.error("GET EXPRIENCE CONTROLLER ERROR")
        res.status(500).json({
            success: false,
            message: "Something went wrong"
        })
    }
}

export const bookTicket = async (req, res) => {
    try {
        const { fullname, email, promoCode, experienceId, date, time, quantity, paid } = req.body

        if (!fullname || !email || !experienceId || !date || !time || !quantity) {
            return res.status(400).json({
                success: false,
                message: "Missing required booking details",
            })
        }

        const experience = await Experience.findById(experienceId)
        if (!experience) {
            return res.status(404).json({
                success: false,
                message: "Experience not found"
            })
        }

        const dateObj = experience.availableDates.find(d => d.date === date)
        if (!dateObj) return res.status(404).json({
            success: false,
            message: `Date '${date}' not found.`
        })

        const slot = dateObj.times.find(t => t.time === time)
        if (!slot) return res.status(404).json({
            success: false,
            message: `Time slot '${time}' not found.`
        })

        if (slot.slotsLeft < quantity) {
            return res.status(400).json({
                success: false,
                message: `Only ${slot.slotsLeft} slot(s) left for ${time}.`,
            })
        }

        slot.slotsLeft -= quantity
        slot.isSoldOut = slot.slotsLeft === 0
        await experience.save()

        const newTicket = await Ticket.create({
            fullname,
            email,
            promoCode: promoCode || null,
            experienceId,
            date,
            time,
            quantity,
            paid,
        })

        return res.status(201).json({
            success: true,
            message: "Ticket booked successfully!",
            data: newTicket,
        })
    } catch (error) {
        console.error("BOOK TICKET CONTROLLER ERROR:", error.message, error.stack)
        res.status(500).json({
            success: false,
            message: "An error occurred while booking the ticket.",
        })
    }
}


export const validatePromo = async (req, res) => {
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
}