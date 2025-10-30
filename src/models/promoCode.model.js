import mongoose from "mongoose"

const promoCodeSchema = new mongoose.Schema({
    code: {
        type: String,
        required: true,
        unique: true,
        uppercase: true,
        trim: true
    },
    discountType: {
        type: String,
        enum: ["PERCENT", "FLAT"],
        required: true
    },
    value: {
        type: Number,
        required: true
    },
    expiresAt: {
        type: Date,
        required: true
    },
    isActive: {
        type: Boolean,
        default: true
    }
}, { timestamps: true })

const PromoCode = mongoose.model("PromoCode", promoCodeSchema)
export default PromoCode    