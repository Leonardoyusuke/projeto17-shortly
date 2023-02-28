import Joi from "joi";

export const signUpSchema = Joi.object({
    name: Joi.string().min(2).required(),
    email: Joi.string().min(3).required().email(),
    password: Joi.string().min(3).required(),
    confirmPassword: Joi.string().valid(Joi.ref('password')).required(),
})

export const signInSchema = Joi.object({
    email: Joi.string().min(3).required().email(),
    password: Joi.string().min(3).required()
})