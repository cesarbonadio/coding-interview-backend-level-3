import { ResponseToolkit, Request, ResponseObject } from '@hapi/hapi'
import Joi from 'joi'

/**
 * Handles validation failures during a request in a hapi route.
 * If the validation error is from Joi, it extracts the validation error details 
 * and responds with a 400 status code along with the error messages.
 * If no error or a non-Joi error is present, the request is allowed to continue.
 * 
 * @param {Request} request - The incoming hapi request object.
 * @param {ResponseToolkit} h - The hapi `ResponseToolkit` used to generate the response.
 * @param {Error | undefined} err - The error encountered during validation. It could be `undefined` if no error is present.
 * 
 * @returns {ResponseObject | symbol} - Returns a response with the validation errors and a 400 status code if a Joi validation error occurred.
 * If no error or a non-Joi error occurs, it returns `h.continue` to allow the request to proceed.
 * 
 * @example
 * failAction(request, h, validationError);
 */
export const failAction = (request: Request, h: ResponseToolkit, err: Error | undefined): ResponseObject | symbol => {
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