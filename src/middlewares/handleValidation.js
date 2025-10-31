import { validationResult } from "express-validator";

const handleValidation = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const formatedErrors = {}
        errors.array().map(err => (
            formatedErrors[err.path] = err.msg
        ));

        return res.status(400).json({
            success: false,
            message: "Validation failed",
            errors: formatedErrors,
        });
    }
    next();
};

export default handleValidation