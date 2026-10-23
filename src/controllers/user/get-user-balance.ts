import { userNotExistsError } from '../../errors/user.js'
import type { UserBalance } from '../../repositories/postgres/index.js'
import type { GetUserBalanceParams } from '../../use-cases/index.js'
import {
    checkIfIdIsValid,
    invalidIdResponse,
    ok,
    serverError,
    userNotFoundResponse,
} from '../helpers/index.js'
import type { HttpRequest, HttpResponse } from '../types.js'

interface GetUserBalanceUseCaseProps {
    execute(params: GetUserBalanceParams): Promise<UserBalance>
}

export class GetUserBalanceController {
    constructor(
        private readonly getUserBalanceUseCase: GetUserBalanceUseCaseProps,
    ) {}
    async execute(httpRequest: HttpRequest): Promise<HttpResponse> {
        try {
            const userId = httpRequest.params?.userId

            // valida o ID com o validator
            if (!userId || !checkIfIdIsValid(userId)) {
                return invalidIdResponse()
            }

            const balance = await this.getUserBalanceUseCase.execute({ userId })

            return ok(balance)
        } catch (error) {
            if (error instanceof userNotExistsError) {
                return userNotFoundResponse()
            }

            console.error(error)

            return serverError()
        }
    }
}
