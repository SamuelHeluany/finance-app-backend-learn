import { userNotExistsError } from '../../errors/user.js'
import { Transactions, Users } from '../../generated/prisma/index.js'

interface GetTransactionsByUserIdRepositoryProps {
    execute(userId: string): Promise<Transactions[]>
}

interface GetUserByIdRepositoryProps {
    execute(userId: string): Promise<Users | null>
}

interface GetTransactionsByUserIdParams {
    userId: string
}

export class GetTransactionsByUserIdUseCase {
    constructor(
        private readonly getTransactionsByUserIdRepository: GetTransactionsByUserIdRepositoryProps,
        private readonly getUserByIdRepository: GetUserByIdRepositoryProps,
    ) {}
    async execute(params: GetTransactionsByUserIdParams) {
        // pega o usuario
        const userId = params.userId
        const user = await this.getUserByIdRepository.execute(userId)

        // valida se o usuario existe
        if (!user) {
            throw new userNotExistsError(userId)
        }
        // chama o repository
        const transactions =
            await this.getTransactionsByUserIdRepository.execute(userId)
        // retorna a transaction
        return transactions
    }
}
