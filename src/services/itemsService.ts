import ItemsModel from '../models/itemsModel'
// interfaces imports
import { ItemPayload } from '../interfaces/requestInterfaces'
import { Item } from '../interfaces/modelsInterfaces'

class ItemsService {
    public async list () : Promise<Array<Item>> {
        return await ItemsModel.list()
    }
    public async find (payload: ItemPayload) : Promise<Item> {
        return await ItemsModel.find(payload)
    }
    public async store (payload: ItemPayload): Promise<Item> {
        return await ItemsModel.store(payload)
    }
    public async update (payload: ItemPayload): Promise<Item> {
        return await ItemsModel.update(payload)
    }
    public async destroy (payload: ItemPayload): Promise<Item> {
        return await ItemsModel.destroy(payload)
    }
}

export default new ItemsService()