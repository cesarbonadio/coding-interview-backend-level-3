import prisma from '../config/prisma'
import { Prisma } from '@prisma/client'

class ItemsModel {
    public constructor () {}

    public async list(): Promise<object> {
        const request = await prisma.item.findMany()
        return request
    }
    public async find(data: any): Promise<object> {
        const { ['id'] : itemId } = data
        const request = await prisma.item.findUnique({where: { id: itemId }})
        if (!request) {
            throw new Error('Not found')
        }
        return request
    }
    public async store(data: any): Promise<object> {
        const request = await prisma.item.create({ data })
        return request
    }
    public async update(data: any): Promise<object> {
        const { ['id'] : itemId, ...rest } = data
        const request = await prisma.item.update({ where: { id: itemId }, data: { ...rest } })
        return request
    }
    public async destroy(data: any): Promise<object> {
        const { ['id']: itemId } = data
        const deleted = await prisma.item.delete({ where: { id: itemId }})
        return deleted
    }
}

export default new ItemsModel()