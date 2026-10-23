import type { Users } from '../../generated/prisma/index.js'

interface DeleteUserRepositoryProps {
    execute(userId: string): Promise<Users | null>
}

export class DeleteUserUseCase {
    constructor(
        private readonly deleteUserRepository: DeleteUserRepositoryProps,
    ) {}
    async execute(userId: string): Promise<Users | null> {
        // executa ele passando o userId
        const deletedUser = await this.deleteUserRepository.execute(userId)
        // retorna o user
        return deletedUser
    }
}
