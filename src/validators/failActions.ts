import { ResponseToolkit, Request } from '@hapi/hapi'
import Joi from 'joi'

export const failAction = (request: Request, h: ResponseToolkit, err: Error | undefined) => {
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