import { ResponseToolkit, Request, ResponseObject } from '@hapi/hapi'
import { httpStatus } from '../utils/httpStatus'
import ItemsService from '../services/itemsService'

interface ItemPayload {
    name: string;
    description?: string;
    price?: number;
}

class ItemsController {
    private sendResponse(res: ResponseToolkit, serviceResponse: any): ResponseObject {
        return res.response(serviceResponse.data).code(
            httpStatus[serviceResponse.status as keyof typeof httpStatus] || 500
        );
    }
    public list = async (req: Request, res: ResponseToolkit) : Promise<ResponseObject> => {
        const service = await ItemsService.list()
        return this.sendResponse(res, service)
    }
    public find = async(req: Request, res: ResponseToolkit) : Promise<ResponseObject> => {
        const id = Number(req?.params?.id)
        const service = await ItemsService.find({ id })
        return this.sendResponse(res, service)
    }
    public store = async(req: Request, res: ResponseToolkit): Promise<ResponseObject> => {
        const { payload  } = req
        const service = await ItemsService.store(payload)
        return this.sendResponse(res, service)
    }
    public update = async(req: Request, res: ResponseToolkit): Promise<ResponseObject> => {
        const payload = req.payload as ItemPayload
        const id = Number(req?.params?.id)
        const service = await ItemsService.update({ ...payload, id })
        return this.sendResponse(res, service)
    }
    public destroy = async(req: Request, res: ResponseToolkit): Promise<ResponseObject> => {
        const id = Number(req?.params?.id)
        const service = await ItemsService.destroy({ id })
        return this.sendResponse(res, service)
    }
}

export default new ItemsController()