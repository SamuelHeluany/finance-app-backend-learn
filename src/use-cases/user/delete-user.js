export class DeleteUserUseCase {
    constructor(deleteUserRepository) {
        this.deleteUserRepository = deleteUserRepository
    }
    async execute(userId) {
        // executa ele passando o userId
        const deletedUser = await this.deleteUserRepository.execute(userId)
        // retorna o user
        return deletedUser
    }
}
