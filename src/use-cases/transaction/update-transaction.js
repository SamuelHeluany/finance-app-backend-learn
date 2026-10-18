import { userNotExistsError } from '../../errors/user.js'

export class UpdateTransactionUseCase {
    constructor(updateTransactionRepository, getUserByIdRepository) {
        this.updateTransactionRepositry = updateTransactionRepository
        this.getUserByIdRepository = getUserByIdRepository
    }
    async execute(params) {
        const userId = params.userId

        const user = await this.getUserByIdRepository.execute(userId)

        if (!user) {
            throw new userNotExistsError()
        }

        const transaction =
            await this.updateTransactionRepository.execute(params)

        return transaction
    }
}
