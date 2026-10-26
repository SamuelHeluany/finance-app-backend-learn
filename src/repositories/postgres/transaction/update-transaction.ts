import { prisma } from '../../../../prisma/prisma.js'
import { Prisma, Transactions } from '../../../generated/prisma/index.js'

export interface UpdateUserRepositoryParams {
    transactionId: string
    updateTransactionParams: Prisma.TransactionsUpdateInput
}

export class PostgresUpdateTransactionRepository {
    async execute({
        transactionId,
        updateTransactionParams,
    }: UpdateUserRepositoryParams): Promise<Transactions> {
        return await prisma.transactions.update({
            where: {
                id: transactionId,
            },
            data: updateTransactionParams,
        })
    }
}
