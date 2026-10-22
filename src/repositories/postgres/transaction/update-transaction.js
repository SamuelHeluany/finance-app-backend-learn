import { prisma } from '../../../../prisma/prisma.js'

export class PostgresUpdateTransactionRepository {
    async execute(transactionId, updateTransactionParams) {
        return await prisma.transactions.update({
            where: {
                id: transactionId,
            },
            data: updateTransactionParams,
        })
    }
}
