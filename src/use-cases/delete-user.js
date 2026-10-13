import { PostgresDeleteUserRepositories } from '../repositories/postgres/get-user-by-id.js'

export class DeleteUserUseCase {
    async execute(userId) {
        // chama o repositório do user by id
        const postgresDeleteUserRepositories =
            new PostgresDeleteUserRepositories()
        // executa ele passando o userId
        const deleteUser = await postgresDeleteUserRepositories.execute(userId)
        // retorna o user
        return deleteUser
    }
}
