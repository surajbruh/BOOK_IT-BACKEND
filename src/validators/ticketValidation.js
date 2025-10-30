import { check } from "express-validator";

export const bookTicketValidation = [
    check("fullname")
        .trim()
        .notEmpty().withMessage("Full name is required")
        .isLength({ min: 3 }).withMessage("Full name must be at least 3 characters long"),

    check("email")
        .trim()
        .notEmpty().withMessage("Email is required")
        .isEmail().withMessage("Please provide a valid email address"),

    check("promoCode")
        .optional()
        .isMongoId().withMessage("Invalid promoCode ID format"),

    check("experienceId")
        .notEmpty().withMessage("Experience ID is required")
        .isMongoId().withMessage("Invalid experience ID format"),

    check("date")
        .trim()
        .notEmpty().withMessage("Date is required"),

    check("time")
        .trim()
        .notEmpty().withMessage("Time is required"),

    check("quantity")
        .notEmpty().withMessage("Quantity is required")
        .isInt({ min: 1 }).withMessage("Quantity must be at least 1"),

    check("paid")
        .notEmpty().withMessage("Paid amount is required")
        .isFloat({ min: 0 }).withMessage("Paid amount must be a positive number"),
];
