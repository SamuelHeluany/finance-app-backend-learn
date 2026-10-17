import { userNotExistsError } from '../../errors/user.js'

export class GetTransactionsByUserIdUseCase {
    constructor(getTransactionsByUserIdRepository, getUserByIdRepository) {
        this.getTransactionsByUserIdRepository =
            getTransactionsByUserIdRepository
        this.getUserByIdRepository = getUserByIdRepository
    }
    async execute(params) {
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
