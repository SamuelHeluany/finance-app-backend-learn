import { Decimal } from '@prisma/client/runtime/client'
import { Transactions, TransactionType } from '../../generated/prisma/index.js'

export interface UpdateTransactionParams {
    name?: string
    date?: Date
    amount?: Decimal
    type?: TransactionType
}

interface UpdateTransactionRepositoryProps {
    execute(params: {
        transactionId: string
        updateTransactionParams: UpdateTransactionParams
    }): Promise<Transactions>
}

export class UpdateTransactionUseCase {
    constructor(
        private readonly updateTransactionRepository: UpdateTransactionRepositoryProps,
    ) {}
    async execute(
        transactionId: string,
        params: UpdateTransactionParams,
    ): Promise<Transactions> {
        const transaction = await this.updateTransactionRepository.execute({
            transactionId,
            updateTransactionParams: params,
        })

        return transaction
    }
}
