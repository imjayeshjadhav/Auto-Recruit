const joi = require("joi");

const signUpValidation = (req, res, next) => {
    const schema = joi.object({
        name: joi.string().min(3).max(100).required()
            .messages({
                'string.min': 'Name must be at least 3 characters',
                'string.max': 'Name cannot exceed 100 characters',
                'any.required': 'Name is required'
            }),
        email: joi.string().email().required()
            .messages({
                'string.email': 'Please enter a valid email address',
                'any.required': 'Email is required'
            }),
        password: joi.string().min(8).max(100)
            .pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])'))
            .required()
            .messages({
                'string.pattern.base': 'Password must contain at least one lowercase, uppercase, number, and special character',
                'string.min': 'Password must be at least 8 characters',
                'any.required': 'Password is required'
            }),
        confirmPassword: joi.string().valid(joi.ref('password')).required()
            .messages({
                'any.only': 'Passwords do not match',
                'any.required': 'Please confirm your password'
            })
    });

    const { error } = schema.validate(req.body, { abortEarly: false });

    if (error) {
        return res.status(400).json({
            message: "Validation failed",
            errors: error.details.map(detail => detail.message)
        });
    }

    next();
};

const signInValidation = (req, res, next) => {
    const schema = joi.object({
        email: joi.string().email().required()
            .messages({
                'string.email': 'Please enter a valid email address',
                'any.required': 'Email is required'
            }),
        password: joi.string().required()
            .messages({
                'any.required': 'Password is required'
            })
    });

    const { error } = schema.validate(req.body, { abortEarly: false });

    if (error) {
        return res.status(400).json({
            message: "Validation failed",
            errors: error.details.map(detail => detail.message)
        });
    }

    next();
};

module.exports = { signUpValidation, signInValidation };
