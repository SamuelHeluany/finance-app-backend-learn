import { DeleteUserUseCase } from '../use-cases/delete-user.js'
import {
    checkIfIdIsValid,
    invalidIdResponse,
    ok,
    serverError,
} from './helpers/index.js'

export class DeleteUserController {
    async execute(httpRequest) {
        try {
            // aqui é o params da URL
            const userId = httpRequest.body.userId

            const idIsValid = checkIfIdIsValid(userId)

            if (!idIsValid) {
                return invalidIdResponse()
            }

            const deleteUserUseCase = new DeleteUserUseCase()

            const deletedUser = deleteUserUseCase.execute(userId)

            return ok(deletedUser)
        } catch (error) {
            console.log(error)
            return serverError()
        }
    }
}
