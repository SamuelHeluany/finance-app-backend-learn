import { GetUserByIdUseCase } from '../use-cases/get-user-by-id.js'
import { badRequest, notFound, ok, serverError } from './helpers.js'
import validator from 'validator'

export class GetUserByIdController {
    async execute(httpRequest) {
        try {
            // valida o UUID
            const isIdValid = validator.isUUID(httpRequest.params.userId)
            // Se não for válido, retorna ao usuário o erro
            if (!isIdValid) {
                return badRequest({ messsage: 'The provided id is not valid.' })
            }

            // chama o use case do get user by id
            const getUserByIdUseCase = new GetUserByIdUseCase()
            // executa o usecase passando o ID como parametro: http://localhost:8080/api/users/4034655c-c04a-4287-911c-aac06b53a634
            const user = await getUserByIdUseCase.execute(
                httpRequest.params.userId,
            )
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
