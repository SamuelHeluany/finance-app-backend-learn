import {
    EmailAlreadyInUseError,
    userNotExistsError,
} from '../../errors/user.js'
import bcrypt from 'bcrypt'
import type { Users } from '../../generated/prisma/index.js'

export interface UpdateUserParams {
    first_name?: string
    last_name?: string
    email?: string
    password?: string
}

interface GetUserByEmailRepositoryProps {
    execute(email: string): Promise<Users | null>
}

interface GetUserByIdRepositoryProps {
    execute(userId: string): Promise<Users | null>
}

interface UpdateUserRepositoryProps {
    execute(params: {
        userId: string
        updateUserParams: UpdateUserParams
    }): Promise<Users>
}

export class UpdateUserUseCase {
    constructor(
        private readonly getUserByIdRepository: GetUserByIdRepositoryProps,
        private readonly getUserByEmailRepository: GetUserByEmailRepositoryProps,
        private readonly updateUserRepository: UpdateUserRepositoryProps,
    ) {}
    async execute(
        userId: string,
        updateUserParams: UpdateUserParams,
    ): Promise<Users> {
        const userExists = await this.getUserByIdRepository.execute(userId)

        if (!userExists) {
            throw new userNotExistsError(userId)
        }

        // Se o email estiver sendo atualizado, verificar se ja está em uso
        if (updateUserParams.email) {
            const userWithProvidedEmail =
                await this.getUserByEmailRepository.execute(
                    updateUserParams.email,
                )

            if (userWithProvidedEmail && userWithProvidedEmail.id !== userId) {
                throw new EmailAlreadyInUseError(updateUserParams.email)
            }
        }

        // Se a senha estiver sendo atualizada, criptografar

        // cria o user recebendo um spread com os params
        const user = {
            ...updateUserParams,
        }
        // condição de se existir uma senha ele criptografa ela
        if (updateUserParams.password) {
            const hashedPassword = await bcrypt.hash(
                updateUserParams.password,
                10,
            )
            // converte o user.password na senha criptografada
            user.password = hashedPassword
        }

        // executa o repository para dar o update no user, passando o id e o user que são as informações alteradas e as não-alteradas(as que ja estavam)
        const updatedUser = await this.updateUserRepository.execute({
            userId,
            updateUserParams: user,
        })

        // retorna o usuário atualizado
        return updatedUser
    }
}
