import { GetUserByIdUseCase } from '../use-cases/get-user-by-id.js'
import {
    checkIfIdIsValid,
    invalidIdResponse,
    notFound,
    ok,
    serverError,
} from './helpers/index.js'

export class GetUserByIdController {
    async execute(httpRequest) {
        try {
            const userId = httpRequest.params.userId
            // valida o UUID
            const isIdValid = checkIfIdIsValid(userId)
            // Se não for válido, retorna ao usuário o erro
            if (!isIdValid) {
                invalidIdResponse()
            }

            // chama o use case do get user by id
            const getUserByIdUseCase = new GetUserByIdUseCase()
            // executa o usecase passando o ID como parametro: http://localhost:8080/api/users/4034655c-c04a-4287-911c-aac06b53a634
            const user = await getUserByIdUseCase.execute(userId)
            // se não achar nenhum usuário, retorna 404
            if (!user) {
                return notFound({ message: 'User not found.' })
            }
            // retorna status 201 com as informações do usuário de acordo com o ID passado
            return ok(user)
        } catch (error) {
            console.error(error)
            return serverError()
        }
    }
}
