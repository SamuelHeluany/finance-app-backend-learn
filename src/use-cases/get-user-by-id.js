import { PostgresGetUserByIdRepository } from '../repositories/postgres/get-user-by-id'

export class GetUserByIdUseCase {
    async execute(userId) {
        // chama o repositório do user by id
        const getUserByIdRepository = new PostgresGetUserByIdRepository()
        // executa ele passando o userId
        const user = await getUserByIdRepository.execute(userId)
        // retorna o user
        return user
    }
}
