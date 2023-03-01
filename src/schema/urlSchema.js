import Joi from "joi";

export const urlSchema = Joi.object({
    url: Joi.string().min(2).required()
    })