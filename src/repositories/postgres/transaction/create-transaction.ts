import { prisma } from '../../../../prisma/prisma.js'
import { Prisma, Transactions } from '../../../generated/prisma/index.js'

export class PostgresCreateTransactionRepository {
    async execute(
        createTransactionParams: Prisma.TransactionsUncheckedCreateInput,
    ): Promise<Transactions> {
        return await prisma.transactions.create({
            data: createTransactionParams,
        })
    }
}
