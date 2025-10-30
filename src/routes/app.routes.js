import express from "express"

import { bookTicket, getExperience, getExperiences, validatePromo } from "../controllers/app.controllers.js"
import { bookTicketValidation } from "../validators/ticketValidation.js"
import handleValidation from "../middlewares/handleValidation.js"

const appRouter = express.Router()

appRouter.get("/experiences", getExperiences)

appRouter.get("/experiences/:id", getExperience)

appRouter.post("/bookings", bookTicketValidation, handleValidation, bookTicket)

appRouter.post("/promo/validate", validatePromo)

export default appRouter