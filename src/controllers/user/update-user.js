import { ZodError } from 'zod'
import {
    EmailAlreadyInUseError,
    userNotExistsError,
} from '../../errors/user.js'
import { updateUserSchema } from '../../schemas/user.js'
import {
    checkIfIdIsValid,
    invalidIdResponse,
    badRequest,
    ok,
    serverError,
    userNotFoundResponse,
} from '../helpers/index.js'

export class UpdateUserController {
    constructor(updateUserUseCase) {
        this.updateUserUseCase = updateUserUseCase
    }
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

            // passa o schema do zod pelos parametros recebidos
            await updateUserSchema.parseAsync(params)

            const updateUser = await this.updateUserUseCase.execute(
                userId,
                params,
            )

            return ok(updateUser)
        } catch (error) {
            // Se o error for uma instancia do zoderror, retorna bad request
            if (error instanceof ZodError) {
                return badRequest({
                    message: error.issues[0].message,
                })
            }
            // faz a comparação de que se o erro for uma instancia de EmailAlreadyInUseError, significa que esse erro foi emitido em alguma camada (no caso na use-case) e passa um badRequest com a mensagem do EmailAlreadyInUseError
            if (error instanceof EmailAlreadyInUseError) {
                return badRequest({ message: error.message })
            }

            if (error instanceof userNotExistsError) {
                return userNotFoundResponse()
            }
            return serverError()
        }
    }
}
