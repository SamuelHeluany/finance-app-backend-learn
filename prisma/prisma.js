import { PrismaClient } from './path/to/generated/prisma'
import { PrismaPg } from '@prisma/adapter-pg'

const adapter = new PrismaPg({
    connectionString: process.env.DATABSE_URL,
})
export const prisma = new PrismaClient({ adapter })
