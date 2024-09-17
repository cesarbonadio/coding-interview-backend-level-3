import { ResponseToolkit, Request, ResponseObject } from '@hapi/hapi'
import ItemsService from '../services/itemsService'
import { ItemPayload } from '../interfaces/requestInterfaces'
import { sendResponse, sendServiceResponse } from '../utils/common'
import { Prisma } from '@prisma/client'

import { messages, status } from '../utils/httpResponses'
const { OK } = messages
const { FAILED, CREATED, DONE, NO_CONTENT } = status

/**
 * Controller for handling CRUD operations on items.
 */
class ItemsController {
    /**
     * Fetches the list of items.
     */
    public list = async (req: Request, res: ResponseToolkit) : Promise<ResponseObject> => {
        try {
            const service = await ItemsService.list()
            return sendResponse(res, sendServiceResponse(DONE, OK, service))
        } catch (err) {
            return sendResponse(res, sendServiceResponse(FAILED, OK, err))
        }
    }
    /**
     * Fetches an item by its ID.
     */
    public find = async(req: Request, res: ResponseToolkit) : Promise<ResponseObject> => {
        try {
            const id = Number(req?.params?.id)
            const service = await ItemsService.find({ id })
            return sendResponse(res, sendServiceResponse(DONE, OK, service))
        } catch (err) {
            return sendResponse(res, sendServiceResponse(FAILED, OK, {}))
        }
    }
    /**
     * Stores a new item.
     */
    public store = async(req: Request, res: ResponseToolkit): Promise<ResponseObject> => {
        try {
            const { payload } = req
            const service = await ItemsService.store(payload as ItemPayload)
            return sendResponse(res, sendServiceResponse(CREATED, OK, service))
        } catch (err) {
            return sendResponse(res, sendServiceResponse(FAILED, OK, err))
        }
    }
     /**
     * Updates an existing item.
     */
    public update = async(req: Request, res: ResponseToolkit): Promise<ResponseObject> => {
        try {
            const payload = req.payload as ItemPayload
            const id = Number(req?.params?.id)
            const service = await ItemsService.update({ ...payload, id })
            return sendResponse(res, sendServiceResponse(DONE, OK, service))
        } catch (err) {
            return sendResponse(res, sendServiceResponse(FAILED, OK, err))
        }
    }
    /**
     * Deletes an item by its ID.
     */
    public destroy = async(req: Request, res: ResponseToolkit): Promise<ResponseObject> => {
        try {
            const id = Number(req?.params?.id)
            const service = await ItemsService.destroy({ id })
            return sendResponse(res, sendServiceResponse(NO_CONTENT, OK, service))
        } catch (err) {
            if (err instanceof Prisma.PrismaClientKnownRequestError) {
                return sendResponse(res, sendServiceResponse(FAILED, OK, { meta: err?.meta?.cause}))
            }
            return sendResponse(res, sendServiceResponse(FAILED, OK, err)) 
        }
    }
}

export default new ItemsController()