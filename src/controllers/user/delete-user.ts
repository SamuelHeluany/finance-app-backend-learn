import type { Users } from '../../generated/prisma/index.js'
import {
    checkIfIdIsValid,
    invalidIdResponse,
    ok,
    serverError,
    userNotFoundResponse,
} from '../helpers/index.js'
import { HttpRequest, HttpResponse } from '../types.js'

export interface DeleteUserUseCaseProps {
    execute(userId: string): Promise<Users | null>
}

export class DeleteUserController {
    constructor(private readonly deleteUserUseCase: DeleteUserUseCaseProps) {}
    async execute(httpRequest: HttpRequest): Promise<HttpResponse> {
        try {
            // aqui é o params da URL
            const userId = httpRequest.params?.userId

            if (!userId || !checkIfIdIsValid(userId)) {
                return invalidIdResponse()
            }

            const deletedUser = await this.deleteUserUseCase.execute(userId)

            // se tentar deletar um ja deletado, o deletedUser vem undefined e retorna a mensagem pro usuario
            if (!deletedUser) {
                return userNotFoundResponse()
            }

            return ok(deletedUser)
        } catch (error) {
            console.log(error)
            return serverError()
        }
    }
}
