import { EmailAlreadyInUseError } from '../errors/user.js'
import bcrypt from 'bcrypt'
import { PostgresGetUserByEmailRepository } from '../repositories/postgres/get-user-by-email.js'
import { PostgresUpdateUserRepository } from '../repositories/postgres/update-user.js'

export class UpdateUserUseCase {
    async execute(userId, updateUserParams) {
        // Se o email estiver sendo atualizado, verificar se ja está em uso
        if (updateUserParams.email) {
            const postgresGetUserByEmailRepository =
                new PostgresGetUserByEmailRepository()

            const userWithProvidedEmail =
                postgresGetUserByEmailRepository.execute(updateUserParams.email)

            if (userWithProvidedEmail) {
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

        // Chamas o repository para atualizar o user
        const postgresUpdateUserRepository = new PostgresUpdateUserRepository()

        // executa o repository para dar o update no user, passando o id e o user que são as informações alteradas e as não-alteradas(as que ja estavam)
        const updatedUser = await postgresUpdateUserRepository.execute(
            userId,
            user,
        )

        // retorna o usuário atualizado
        return updatedUser
    }
}
