import mongoose from "mongoose";

const ticketSchema = new mongoose.Schema(
    {
        fullname: {
            type: String,
            trim: true,
            lowercase: true,
            required: [true, "Full name is required"],
            minlength: [3, "Full name must be at least 3 characters long"],
        },
        email: {
            type: String,
            required: [true, "Email is required"],
            lowercase: true,
            trim: true,
            match: [/^\S+@\S+\.\S+$/, "Please provide a valid email address"],
        },
        promoCode: {
            type: String,
            default: null,
        },
        experienceId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Experience",
            required: [true, "Experience ID is required"],
        },
        date: {
            type: String,
            required: [true, "Date is required"],
        },
        time: {
            type: String,
            required: [true, "Time is required"],
        },
        quantity: {
            type: Number,
            required: [true, "Quantity is required"],
            min: [1, "At least one ticket must be booked"],
        },
        paid: {
            type: Number,
            required: [true, "Paid amount is required"],
            min: [0, "Paid amount cannot be negative"],
        },
    },
    {
        timestamps: true,
    }
);

const Ticket = mongoose.model("Ticket", ticketSchema)
export default Ticket