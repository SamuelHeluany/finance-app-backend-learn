import { EmailAlreadyInUseError } from '../errors/user.js'
import { UpdateUserUseCase } from '../use-cases/update-user.js'
import {
    checkIfEmailIsValid,
    checkIfIdIsValid,
    checkIfPasswordIsValid,
    emailIsAlreadyInUseResponse,
    invalidIdResponse,
    invalidPasswordResponse,
    badRequest,
    ok,
    serverError,
} from './helpers/index.js'

export class UpdateUserController {
    async execute(httpRequest) {
        try {
            // pega o id que recebe como parametro na URL
            const userId = httpRequest.params.userId
            // valida o ID com o validator
            const isIdValid = checkIfIdIsValid(userId)
            // se não for valido, retorna erro
            if (!isIdValid) {
                invalidIdResponse()
            }
            // controller recebe o body
            const params = httpRequest.body

            // aqui listamos os campos permitidos
            const allowedFields = [
                'first_name',
                'last_name',
                'email',
                'password',
            ]

            // Verificar se alguma propriedade recebida(field), não está nessa lista pois recebe um true
            const someFieldIsNotAllowed = Object.keys(params).some(
                (field) => !allowedFields.includes(field),
            )

            // se for true, retorna erro
            if (someFieldIsNotAllowed) {
                return badRequest({
                    message: 'Some provided field is not allowed.',
                })
            }
            // Se existir senha, valida se é maior que 6 caracteres, se não, retorna erro
            if (params.password) {
                const passwordIsValid = checkIfPasswordIsValid(params.password)

                if (!passwordIsValid) {
                    return invalidPasswordResponse()
                }
            }

            // se existir email, verifica se ele tem formato válido, se não, retorna erro
            if (params.email) {
                const emailsIsValid = checkIfEmailIsValid(params.email)

                if (!emailsIsValid) {
                    return emailIsAlreadyInUseResponse()
                }
            }

            // Chama o use-case
            const updateUserUseCase = new UpdateUserUseCase()
            //
            const updateUser = await updateUserUseCase.execute(userId, params)

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
