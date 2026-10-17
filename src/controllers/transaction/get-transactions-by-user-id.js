import { userNotExistsError } from '../../errors/user.js'
import {
    checkIfIdIsValid,
    invalidIdResponse,
    requiredFieldIsMissingResponse,
    serverError,
    userNotFoundResponse,
} from '../helpers.js'
import { ok } from '../helpers/http.js'

export class GetTransactionsByUserIdController {
    constructor(getTransactionsByUserIdUseCase) {
        this.getTransactionsByUserIdUseCase = getTransactionsByUserIdUseCase
    }
    async execute(httpRequest) {
        try {
            // quando voce usa como query, tem que passar o parametro.query da query que vai ser passada
            const userId = httpRequest.query.userId
            // Verificar se o userId foi passado e passa no erro a string que está faltando, nesse caso, o userId
            if (!userId) {
                return requiredFieldIsMissingResponse('userId')
            }
            // verificar se o userId é valido com o helper de check
            const userIdIsValid = checkIfIdIsValid(userId)
            // se o userId não for valido, retorna erro de id invalido que vem do helper tambem
            if (!userIdIsValid) {
                return invalidIdResponse()
            }

            // chama o usecase como um objeto, porque no usecase recebe um objeto(params) userId e tem que repassar no controller quando chama o useCase, no caso passou o objeto com userId
            const transactions =
                await this.getTransactionsByUserIdUseCase.execute({
                    userId,
                })
            // retorna ok passando a transaction
            return ok(transactions)
        } catch (error) {
            console.error(error)
            if (error instanceof userNotExistsError) {
                return userNotFoundResponse()
            }
            return serverError()
        }
    }
}
