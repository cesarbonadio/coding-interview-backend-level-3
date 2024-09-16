import { messages, status } from '../utils/httpResponses'
import ItemsModel from '../models/itemsModel'
import { Prisma } from '@prisma/client'; // Import Prisma error handling

const { OK } = messages
const { FAILED, CREATED, DONE, NO_CONTENT } = status

interface responseObject {
    status?: string,
    message?: string,
    data?: any 
}

class ItemsService {
    // how the data should be formated
    private objResponse (status: string, message: string, data: any): responseObject {
        return { status, message, data }
    }
    public async list () : Promise<responseObject> {
        try {
            const itemsList = await ItemsModel.list()
            return this.objResponse(DONE, OK, itemsList)
        } catch (err) {
            console.log(err)
            return this.objResponse(FAILED, OK, err)
        }
    }
    public async find (payload: any) : Promise<responseObject> {
        try {
            const item = await ItemsModel.find(payload)
            return this.objResponse(DONE, OK, item)
        } catch (err) {
            return this.objResponse(FAILED, OK, {})
        }
    }
    public async store (payload: any): Promise<responseObject> {
        try {
            const storeReq = await ItemsModel.store(payload)
            return this.objResponse(CREATED, OK, storeReq)
        } catch (err) {
            return this.objResponse(FAILED, OK, err)
        }
    }
    public async update (payload: any): Promise<responseObject> {
        try {
            const updateReq = await ItemsModel.update(payload)
            return this.objResponse(DONE, OK, updateReq)
        } catch (err) {
            return this.objResponse(FAILED, OK, err)
        }
    }
    public async destroy (payload: any): Promise<responseObject> {
        try {
            const destroyReq = await ItemsModel.destroy(payload)
            return this.objResponse(NO_CONTENT, OK, destroyReq)
        } catch(err) {
            if (err instanceof Prisma.PrismaClientKnownRequestError) {
                return this.objResponse(FAILED, OK, { meta: err?.meta?.cause});
            }
            return this.objResponse(FAILED, OK, err)
        }
    }
}

export default new ItemsService()