import { userNotExistsError } from '../../errors/user.js'
import { Users } from '../../generated/prisma/index.js'
import type { UserBalance } from '../../repositories/postgres/index.js'

interface GetUserBalanceRepositoryProps {
    execute(userId: string): Promise<UserBalance>
}

interface GetUserByIdRepositoryProps {
    execute(userId: string): Promise<Users | null>
}

export interface GetUserBalanceParams {
    userId: string
}
export class GetUserBalanceUseCase {
    constructor(
        private readonly getUserBalanceRepository: GetUserBalanceRepositoryProps,
        private readonly getUserByIdRepository: GetUserByIdRepositoryProps,
    ) {}
    async execute(params: GetUserBalanceParams) {
        const userId = params.userId

        const user = await this.getUserByIdRepository.execute(userId)

        if (!user) {
            throw new userNotExistsError()
        }

        const balance = await this.getUserBalanceRepository.execute(userId)
        return balance
    }
}
