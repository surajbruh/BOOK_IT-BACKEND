import Experience from "../models/experience.model.js"
import PromoCode from "../models/promoCode.model.js"
import Ticket from "../models/ticket.model.js"

export const getExperiences = async (req, res) => {
    try {
        const experiences = await Experience.find()
        res.status(200).json(experiences)
    } catch (error) {
        console.error("GET EXPRIENCES CONTROLLER ERROR")
        res.status(500).json({ message: "Something went wrong" })
    }
}

export const getExperience = async (req, res) => {
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
}

export const bookTicket = async (req, res) => {
    try {
        const { fullname, email, promoCode, experienceId, date, time, quantity, paid } = req.body;

        const experience = await Experience.findById(experienceId);
        if (!experience) {
            return res.status(404).json({ message: "Experience not found" });
        }

        let slotFound = false;
        for (let dateObj of experience.availableDates) {
            for (let slot of dateObj.times) {
                if (slot.time === time) {
                    slotFound = true;

                    // Check availability
                    if (slot.slotsLeft < quantity) {
                        return res.status(400).json({
                            message: `Only ${slot.slotsLeft} slot(s) left for ${time}.`,
                        });
                    }

                    // Deduct the booked quantity
                    slot.slotsLeft -= quantity;

                    // Mark sold out if no slots left
                    if (slot.slotsLeft === 0) {
                        slot.isSoldOut = true;
                    }
                }
            }
        }

        if (!slotFound) {
            return res.status(404).json({ message: `Time slot '${time}' not found.` });
        }

        const newTicket = await Ticket.create({
            fullname,
            email,
            promoCode: promoCode || null,
            experienceId,
            date,
            time,
            quantity,
            paid,
        });

        await experience.save();
        return res.status(201).json({
            success: true,
            message: "Ticket booked successfully!",
            ticket: newTicket,
        });
    } catch (error) {
        console.error("Error booking ticket:", error);

        return res.status(500).json({
            success: false,
            message: "An error occurred while booking the ticket.",
            error: error.message,
        });
    }
};


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