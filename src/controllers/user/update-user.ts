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
import type { UpdateUserParams } from '../../use-cases/index.js'
import type { Users } from '../../generated/prisma/index.js'
import type { HttpRequest, HttpResponse } from '../types.js'

interface UpdateUserUseCaseProps {
    execute(userId: string, params: UpdateUserParams): Promise<Users>
}

export class UpdateUserController {
    constructor(private readonly updateUserUseCase: UpdateUserUseCaseProps) {}
    async execute(httpRequest: HttpRequest): Promise<HttpResponse> {
        try {
            // pega o id que recebe como parametro na URL
            const userId = httpRequest.params?.userId
            // valida o ID com o validator
            if (!userId || !checkIfIdIsValid(userId)) {
                return invalidIdResponse()
            }
            // controller recebe o body
            const params = await updateUserSchema.parseAsync(httpRequest.body)

            const updateUser = await this.updateUserUseCase.execute(
                userId,
                params,
            )

            return ok(updateUser)
        } catch (error) {
            // Se o error for uma instancia do zoderror, retorna bad request
            if (error instanceof ZodError) {
                return badRequest({
                    message: error.issues[0]?.message ?? 'Invalid Resquest',
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
