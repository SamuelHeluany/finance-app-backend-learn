import { v4 as uuidv4 } from 'uuid'
import bcrypt from 'bcrypt'
import { PostgresCreateUserRepository } from '../repositories/postgres/create-user.js'

export class CreateUserUseCase {
    async execute(createUserParams) {
        // TODO: Verificar se o email ja está em uso

        // gera o uuid
        const userId = uuidv4()

        // criptografa a senha
        const hashedPassword = await bcrypt.hash(createUserParams.password, 10)

        // Insere o usuário no db
        const user = {
            ...createUserParams,
            id: userId,
            password: hashedPassword,
        }

        // chama o repositório
        const postgresCreateUserRepository = new PostgresCreateUserRepository()

        // pega o usuário criado
        const createdUser = await postgresCreateUserRepository.execute(user)

        // retorna o usuário criado
        return createdUser
    }
}
