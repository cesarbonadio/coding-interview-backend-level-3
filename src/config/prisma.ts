import { PrismaClient, Prisma } from '@prisma/client'


/**
 * Declares a global variable `prisma` of type `PrismaClient | undefined`.
 * This allows the `prisma` client instance to persist globally across the
 * application when it is not in production mode.
 * 
 * @type {PrismaClient | undefined}
 */
declare global {
  var prisma: PrismaClient | undefined
}

/**
 * Creates a new instance of `PrismaClient`, or uses an existing global
 * instance if available. The `log` option configures Prisma to log queries, 
 * information, warnings, and errors.
 * 
 * @type {PrismaClient}
 */
const prisma = global.prisma || new PrismaClient({
  log: ['query', 'info', 'warn', 'error'],
});

/**
 * If the application is not running in production, the `prisma` instance 
 * is stored globally to avoid creating a new instance on every request.
 */
if (process.env.NODE_ENV !== 'production') {
  global.prisma = prisma
}

export default prisma 