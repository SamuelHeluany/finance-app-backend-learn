import { userNotFoundResponse } from '../../controllers/helpers/index.js'

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
            return userNotFoundResponse()
        }
        // chama o repository
        const transactions =
            await this.getTransactionsByUserIdRepository.execute(userId)
        // retorna a transaction
        return transactions
    }
}
