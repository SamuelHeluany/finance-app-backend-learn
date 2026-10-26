import { Transactions } from '../../generated/prisma/index.js'
import {
    checkIfIdIsValid,
    invalidIdResponse,
    ok,
    serverError,
    transactionNotFoundResponse,
} from '../helpers/index.js'
import { HttpRequest, HttpResponse } from '../types.js'

interface DeleteTransactionUseCase {
    execute(transactionId: string): Promise<Transactions | null>
}

export class DeleteTransactionController {
    constructor(
        private readonly deleteTransactionUseCase: DeleteTransactionUseCase,
    ) {}

    async execute(httpRequest: HttpRequest): Promise<HttpResponse> {
        try {
            const transactionId = httpRequest.params?.transactionId

            if (!transactionId || !checkIfIdIsValid(transactionId)) {
                return invalidIdResponse()
            }

            const deleteTransaction =
                await this.deleteTransactionUseCase.execute(transactionId)

            if (!deleteTransaction) {
                return transactionNotFoundResponse()
            }

            return ok(deleteTransaction)
        } catch (error) {
            console.error(error)
            return serverError()
        }
    }
}
