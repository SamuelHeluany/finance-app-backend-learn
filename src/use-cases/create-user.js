import { v4 as uuidv4 } from 'uuid'
import bcrypt from 'bcrypt'
import { PostgresCreateUserRepository } from '../repositories/postgres/create-user.js'
import { PostgresGetUserByEmailRepository } from '../repositories/postgres/get-user-by-email.js'

export class CreateUserUseCase {
    async execute(createUserParams) {
        // TODO: Verificar se o email ja está em uso
        // Chama o repository do email, porque o repostory que conversa com o banco
        const postgresGetUserByEmailRepository =
            new PostgresGetUserByEmailRepository()
        // Verifica se o email já existe no banco
        const userWithProvideEmail =
            await postgresGetUserByEmailRepository.execute(
                createUserParams.email,
            )
        // Se o email ja existir no banco, retorna erro
        if (userWithProvideEmail) {
            throw new Error('The provide e-mail is already in use.')
        }

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
