import { v4 as uuidv4 } from 'uuid'
import bcrypt from 'bcrypt'
import { EmailAlreadyInUseError } from '../../errors/user.js'

export class CreateUserUseCase {
    constructor(getUserByEmailRepository, createUserRepository) {
        this.getUserByEmailRepository = getUserByEmailRepository
        this.createUserRepository = createUserRepository
    }
    async execute(createUserParams) {
        // TODO: Verificar se o email ja está em uso

        // Verifica se o email já existe no banco
        const userWithProvideEmail =
            await this.getUserByEmailRepository.execute(createUserParams.email)
        // Se o email ja existir no banco, retorna erro do usuário que criamos em errors
        if (userWithProvideEmail) {
            throw new EmailAlreadyInUseError(createUserParams.email)
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

        // pega o usuário criado
        const createdUser = await this.createUserRepository.execute(user)

        // retorna o usuário criado
        return createdUser
    }
}
