export class GetUserByIdUseCase {
    // Passa o repository para o use case com injeção de dependencia
    constructor(getUserByIdRepository) {
        this.getUserByIdRepository = getUserByIdRepository
    }
    async execute(userId) {
        // executa o repository passado pelo constructor passando o userId
        const user = await this.getUserByIdRepository.execute(userId)
        // retorna o user
        return user
    }
}
