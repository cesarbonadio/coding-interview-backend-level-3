import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export interface Item {
  id: number;
  name: string;
  price: number;
}

let items: Item[] = []

const createItems = async () : Promise<void> => {
  items = [
    {
      id: 1,
      name: 'Laptop',
      price: 1200.00
    },
    {
      id: 2,
      name: 'Smartphone',
      price: 800.00
    },
    {
      id: 3,
      name: 'Headphones',
      price: 200.00
    },
    {
      id: 4,
      name: 'Smartwatch',
      price: 250.00
    },
    {
      id: 5,
      name: 'Gaming Console',
      price: 500.00
    }
  ]

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
