import { ResponseToolkit, Request, ResponseObject } from '@hapi/hapi'
import ItemsService from '../services/itemsService'
import { ItemPayload } from '../interfaces/requestInterfaces'
import { sendResponse } from '../utils/common'

class ItemsController {
    public list = async (req: Request, res: ResponseToolkit) : Promise<ResponseObject> => {
        const service = await ItemsService.list()
        return sendResponse(res, service)
    }
    public find = async(req: Request, res: ResponseToolkit) : Promise<ResponseObject> => {
        const id = Number(req?.params?.id)
        const service = await ItemsService.find({ id })
        return sendResponse(res, service)
    }
    public store = async(req: Request, res: ResponseToolkit): Promise<ResponseObject> => {
        const { payload } = req
        const service = await ItemsService.store(payload as ItemPayload)
        return sendResponse(res, service)
    }
    public update = async(req: Request, res: ResponseToolkit): Promise<ResponseObject> => {
        const payload = req.payload as ItemPayload
        const id = Number(req?.params?.id)
        const service = await ItemsService.update({ ...payload, id })
        return sendResponse(res, service)
    }
    public destroy = async(req: Request, res: ResponseToolkit): Promise<ResponseObject> => {
        const id = Number(req?.params?.id)
        const service = await ItemsService.destroy({ id })
        return sendResponse(res, service)
    }
}

export default new ItemsController()