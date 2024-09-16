import { Server } from "@hapi/hapi"
import ItemsController from './controllers/itemsController'
import { itemSchema } from "./validators/itemRequest"
import Joi from "joi"

export const defineRoutes = (server: Server) => {
    server.route({
        method: 'GET',
        path: '/ping',
        handler: async (request, h) => {
            return {
                ok: true
            }
        }
    })

    server.route([
        {
            method: 'GET',
            path: '/items', // List all items
            handler: ItemsController.list
        },
        {
            method: 'GET',
            path: '/items/{id}', // get specific item
            handler: ItemsController.find
        },
        {
            method: 'POST',
            path: '/items', // Store a new item
            handler: ItemsController.store,
            options: {
                validate: {
                    payload: itemSchema,
                    failAction: (request, h, err) => {
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
                }
            }
        },
        {
            method: 'PUT',
            path: '/items/{id}', // Update an existing item
            handler: ItemsController.update,
            options: {
                validate: {
                    payload: itemSchema,
                    failAction: (request, h, err) => {
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
                }
            }
        },
        {
            method: 'DELETE',
            path: '/items/{id}', // Delete an existing item
            handler: ItemsController.destroy
        }
    ])
}