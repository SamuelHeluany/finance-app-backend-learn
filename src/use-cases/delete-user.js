import { PostgresDeleteUserRepository } from '../repositories/postgres/delete-user.js'

export class DeleteUserUseCase {
    async execute(userId) {
        // chama o repositório do user by id
        const postgresDeleteUserRepository = new PostgresDeleteUserRepository()
        // executa ele passando o userId
        const deletedUser = await postgresDeleteUserRepository.execute(userId)
        // retorna o user
        return deletedUser
    }
}
