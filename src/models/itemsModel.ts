import prisma from '../config/prisma'
import { Item } from '../interfaces/modelsInterfaces'

class ItemsModel {
    public constructor () {}

    public async list(): Promise<Array<Item>> {
        const request = await prisma.item.findMany()
        return request
    }
    public async find(data: any): Promise<Item> {
        const { ['id'] : itemId } = data
        const request = await prisma.item.findUnique({where: { id: itemId }})
        if (!request) {
            throw new Error('Not found')
        }
        return request
    }
    public async store(data: any): Promise<Item> {
        const request = await prisma.item.create({ data })
        return request
    }
    public async update(data: any): Promise<Item> {
        const { ['id'] : itemId, ...rest } = data
        const request = await prisma.item.update({ where: { id: itemId }, data: { ...rest } })
        return request
    }
    public async destroy(data: any): Promise<Item> {
        const { ['id']: itemId } = data
        const deleted = await prisma.item.delete({ where: { id: itemId }})
        return deleted
    }
}

export default new ItemsModel()