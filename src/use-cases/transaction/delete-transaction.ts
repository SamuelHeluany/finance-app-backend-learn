import { Transactions } from '../../generated/prisma/index.js'

interface DeleteTransactionRepositoryProps {
    execute(transactionId: string): Promise<Transactions | null>
}

export class DeleteTransactionUseCase {
    constructor(
        private readonly deleteTransactionRepository: DeleteTransactionRepositoryProps,
    ) {}
    async execute(transactionId: string): Promise<Transactions | null> {
        const deleteTransaction =
            await this.deleteTransactionRepository.execute(transactionId)

        return deleteTransaction
    }
}
