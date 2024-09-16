import Joi from "joi"

export const generalValidationFailHandler = (_request: any, h: any, err: any) => {
    if (Joi.isError(err)) {
        const errors = err.details.map((detail: Joi.ValidationErrorItem) => {
            return {
                field: detail.context?.key,
                message: `Field ${detail.message}`
            }
        })
        return h.response({ errors }).code(400).takeover()
    }
    return h.continue
}