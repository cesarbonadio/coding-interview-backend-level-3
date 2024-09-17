import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export interface Item {
  id: number;
  name: string;
  price: number;
}

let items: Item[] = []

const createItems = async () : Promise<void> => {
  items = []
  await prisma.item.createMany({ data: items })
}

const load = async () : Promise<void> => {
  try {
    await createItems()
  } catch (err) {
    console.error(err)
  } finally {
    await prisma.$disconnect()
  }
}

load()
