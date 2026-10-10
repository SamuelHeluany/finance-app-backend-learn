import { EmailAlreadyInUseError } from '../errors/user.js'
import { UpdateUserUseCase } from '../use-cases/update-user.js'
import { badRequest, ok, serverError } from './helpers.js'
import validator from 'validator'

export class UpdateUserController {
    async execute(httpRequest) {
        try {
            // pega o id que recebe como parametro na URL
            const userId = httpRequest.params.userId
            // valida o ID com o validator
            const isIdValid = validator.isUUID(userId)
            // se não for valido, retorna erro
            if (!isIdValid) {
                return badRequest({
                    message: 'The provided ID is not valid.',
                })
            }
            // controller recebe o body
            const updateUserParams = httpRequest.body

            // aqui listamos os campos permitidos
            const allowedFields = [
                'first_name',
                'last_name',
                'email',
                'password',
            ]

            // Verificar se alguma propriedade recebida(field), não está nessa lista pois recebe um false
            const someFieldIsNotAllowed = Object.keys(updateUserParams).some(
                (field) => !allowedFields.includes(field),
            )

            // se for false, retorna erro
            if (someFieldIsNotAllowed) {
                return badRequest({
                    message: 'Some provided field is not allowed.',
                })
            }
            // Se existir senha, valida se é maior que 6 caracteres, se não, retorna erro
            if (updateUserParams.password) {
                const passwordIsNotValid = updateUserParams.password.length < 6

                if (passwordIsNotValid) {
                    return badRequest({
                        message: 'Password must be least 6 characters.',
                    })
                }
            }

            // se existir email, verifica se ele tem formato válido, se não, retorna erro
            if (updateUserParams.email) {
                const emailsIsValid = validator.isEmail(updateUserParams.email)

                if (!emailsIsValid) {
                    return badRequest({
                        message: 'Invalid e-mail. Please provide a valid one.',
                    })
                }
            }

            // Chama o use-case
            const updateUserUseCase = new UpdateUserUseCase()
            //
            const updateUser = await updateUserUseCase.execute(
                userId,
                updateUserParams,
            )

            return ok(updateUser)
        } catch (error) {
            // faz a comparação de que se o erro for uma instancia de EmailAlreadyInUseError, significa que esse erro foi emitido em alguma camada (no caso na use-case) e passa um badRequest com a mensagem do EmailAlreadyInUseError
            if (error instanceof EmailAlreadyInUseError) {
                return badRequest({ message: error.message })
            }
            return serverError()
        }
    }
}
