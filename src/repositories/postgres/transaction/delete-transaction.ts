import { prisma } from '../../../../prisma/prisma.js'
import { Transactions } from '../../../generated/prisma/index.js'

export class PostgresDeleteTransactionRepository {
    async execute(transactionId: string): Promise<Transactions | null> {
        try {
            return await prisma.transactions.delete({
                where: {
                    id: transactionId,
                },
            })
        } catch (error) {
            console.error(error)
            return null
        }
    }
}
