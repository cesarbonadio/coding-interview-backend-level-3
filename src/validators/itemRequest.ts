import Joi from 'joi'

export const itemSchema = Joi.object({
    name: Joi.string().min(3).max(30).required(),
    price: Joi.number().min(0).required().messages({
        'number.min': '"price" cannot be negative'
    })
})