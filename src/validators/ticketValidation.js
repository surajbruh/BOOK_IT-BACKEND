import { body } from "express-validator";

export const bookTicketValidation = [
    body("fullname")
        .trim()
        .notEmpty().withMessage("Full name is required")
        .isLength({ min: 3 }).withMessage("Full name must be at least 3 characters long"),

    body("email")
        .trim()
        .notEmpty().withMessage("Email is required")
        .isEmail().withMessage("Please provide a valid email address"),

    body("promoCode")
        .optional(),

    body("experienceId")
        .notEmpty().withMessage("Experience ID is required")
        .isMongoId().withMessage("Invalid experience ID format"),

    body("date")
        .trim()
        .notEmpty().withMessage("Date is required"),

    body("time")
        .trim()
        .notEmpty().withMessage("Time is required"),

    body("quantity")
        .notEmpty().withMessage("Quantity is required")
        .isInt({ min: 1 }).withMessage("Quantity must be at least 1"),

    body("paid")
        .notEmpty().withMessage("Paid amount is required")
        .isFloat({ min: 0 }).withMessage("Paid amount must be a positive number"),
];
