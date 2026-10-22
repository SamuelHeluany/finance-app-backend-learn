import { prisma } from '../../../../prisma/prisma.js'
// pega por userId da transaction usando query params
export class PostgresGetTransactionByUserIdRepository {
    async execute(userId) {
        return await prisma.transactions.findMany({
            where: {
                user_id: userId,
            },
        })
    }
}
