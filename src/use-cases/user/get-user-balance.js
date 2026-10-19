import { userNotExistsError } from '../../errors/user.js'

export class GetUserBalanceUseCase {
    constructor(getUserBalanceRepository, getUserByIdRepository) {
        this.getUserBalanceRepository = getUserBalanceRepository
        this.getUserByIdRepository = getUserByIdRepository
    }
    async execute(params) {
        const userId = params.userId

        const user = await this.getUserByIdRepository.execute(userId)

        if (!user) {
            throw new userNotExistsError()
        }

        const balance = await this.getUserBalanceRepository.execute(
            params.userId,
        )
        return balance
    }
}
