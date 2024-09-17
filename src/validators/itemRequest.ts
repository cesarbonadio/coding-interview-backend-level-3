import Joi from 'joi'

/**
 * Joi schema for validating `item` objects.
 * 
 * This schema enforces the following rules:
 * - `name`: A required string with a minimum length of 3 and a maximum length of 30 characters.
 * - `price`: A required number that must be non-negative. A custom error message is provided if the price is negative.
 * 
 * @type {Joi.ObjectSchema}
 */
export const itemSchema: Joi.ObjectSchema = Joi.object({
    name: Joi.string().min(3).max(30).required(),
    price: Joi.number().strict().min(0).required().messages({
        'number.min': '"price" cannot be negative'
    })
})