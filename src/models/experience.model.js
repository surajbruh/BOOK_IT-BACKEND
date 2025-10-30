import mongoose from "mongoose";

const experienceSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: true,
        trim: true,
    },
    imageUrl: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
        default: 999,
    },
    availableDates: [
        {
            date: {
                type: String, // e.g., "2025-10-22"
                required: true,
            },
            times: [
                {
                    time: {
                        type: String, // e.g., "09:00 am"
                        required: true,
                    },
                    slotsLeft: {
                        type: Number, // e.g., 4
                        default: 0,
                    },
                    isSoldOut: {
                        type: Boolean,
                        default: false,
                    },
                },
            ],
        },
    ],
    about: {
        type: String,
        default: "",
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const Experience = mongoose.model("Experience", experienceSchema);
export default Experience