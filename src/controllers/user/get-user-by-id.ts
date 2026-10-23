import { Users } from '../../generated/prisma/index.js'
import {
    checkIfIdIsValid,
    invalidIdResponse,
    ok,
    serverError,
    userNotFoundResponse,
} from '../helpers/index.js'
import { HttpRequest, HttpResponse } from '../types.js'

interface GetUserByIdUseCaseProps {
    execute(userId: string): Promise<Users | null>
}

export class GetUserByIdController {
    // passa o use case para o controller por injeção de dependencia
    constructor(private readonly getUserByIdUseCase: GetUserByIdUseCaseProps) {}
    async execute(httpRequest: HttpRequest): Promise<HttpResponse> {
        try {
            const userId = httpRequest.params?.userId
            // valida o UUID
            if (!userId || !checkIfIdIsValid(userId)) {
                return invalidIdResponse()
            }

            // passa o use case do constructor e executa o usecase passando o ID como parametro: http://localhost:8080/api/users/4034655c-c04a-4287-911c-aac06b53a634
            const user = await this.getUserByIdUseCase.execute(userId)
            // se não achar nenhum usuário, retorna 404
            if (!user) {
                return userNotFoundResponse()
            }
            // retorna status 201 com as informações do usuário de acordo com o ID passado
            return ok(user)
        } catch (error) {
            console.error(error)
            return serverError()
        }
    }
}
