import { Users } from '../../generated/prisma/index.js'

interface GetUserByIdRepositoryProps {
    execute(userId: string): Promise<Users | null>
}

export class GetUserByIdUseCase {
    // Passa o repository para o use case com injeção de dependencia
    constructor(
        private readonly getUserByIdRepository: GetUserByIdRepositoryProps,
    ) {}
    async execute(userId: string): Promise<Users | null> {
        // executa o repository passado pelo constructor passando o userId
        const user = await this.getUserByIdRepository.execute(userId)
        // retorna o user
        return user
    }
}
