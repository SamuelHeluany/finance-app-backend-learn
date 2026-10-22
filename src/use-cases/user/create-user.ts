import { v4 as uuidv4 } from 'uuid'
import bcrypt from 'bcrypt'
import { EmailAlreadyInUseError } from '../../errors/user.js'
import { Users } from '../../generated/prisma/index.js'

// cria as props do user
export interface CreateUserProps {
    first_name: string
    last_name: string
    email: string
    password: string
}
// executa o email que é uma string prometendo que vem do Users
interface GetUserByEmailRepositoryProps {
    execute(email: string): Promise<Users | null>
}
// executa o user que vem de Users prometendo que vem do Users
interface CreateUserRepositoryProps {
    execute(user: Users): Promise<Users>
}

export class CreateUserUseCase {
    // passa pra DI, como private readonly que é um atalho do TypeScript pra declarar e preencher uma propriedade da classe direto no construtor
    // private: A propriedade só pode ser acessada dentro da própria classe. Quem usa a classe de fora não enxerga.
    // readonly: A propriedade só pode receber valor uma vez (na declaração ou no construtor).
    constructor(
        private readonly getUserByEmailRepository: GetUserByEmailRepositoryProps,
        private readonly createUserRepository: CreateUserRepositoryProps,
    ) {}
    async execute(createUserParams: CreateUserProps): Promise<Users> {
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
