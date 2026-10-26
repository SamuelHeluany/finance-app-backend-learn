import { prisma } from '../../../../prisma/prisma.js'
import { Transactions } from '../../../generated/prisma/index.js'
// pega por userId da transaction usando query params
export class PostgresGetTransactionByUserIdRepository {
    async execute(userId: string): Promise<Transactions[]> {
        return await prisma.transactions.findMany({
            where: {
                user_id: userId,
            },
        })
    }
}
