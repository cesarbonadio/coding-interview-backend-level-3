import { ResponseToolkit, Request } from '@hapi/hapi'
import { httpStatus } from '../utils/httpStatus'
import ItemsService from '../services/itemsService'

interface ItemPayload {
    name: string;
    description?: string;
    price?: number;
}

class ItemsController {
    // TODO -> integrate
    private sendResponse(res: ResponseToolkit, serviceResponse: any) {
        return res.response(serviceResponse.data).code(
            httpStatus[serviceResponse.status as keyof typeof httpStatus] || 500
        );
    }
    public async list(req: Request, res: ResponseToolkit) {
        const service = await ItemsService.list()
        return res.response(service.data).code(
            httpStatus[service.status as keyof typeof httpStatus] || 500
        )
    }
    public async find(req: Request, res: ResponseToolkit) {
        const id = Number(req?.params?.id)
        const service = await ItemsService.find({ id })
        return res.response(service.data).code(
            httpStatus[service.status as keyof typeof httpStatus] || 500
        )
    }
    public async store(req: Request, res: ResponseToolkit) {
        const { payload  } = req
        console.log(payload)
        const service = await ItemsService.store(payload)
        return res.response(service.data).code(
            httpStatus[service.status as keyof typeof httpStatus] || 500
        )
    }
    public async update(req: Request, res: ResponseToolkit) {
        const payload = req.payload as ItemPayload
        const id = Number(req?.params?.id)
        const service = await ItemsService.update({ ...payload, id })
        return res.response(service.data).code(
            httpStatus[service.status as keyof typeof httpStatus] || 500
        )
    }
    public async destroy(req: Request, res: ResponseToolkit) {
        const id = Number(req?.params?.id)
        const service = await ItemsService.destroy({ id })
        console.log(service)
        return res.response(service.data).code(
            httpStatus[service.status as keyof typeof httpStatus] || 500
        )
    }
}

export default new ItemsController()