import {
    checkIfIdIsValid,
    invalidIdResponse,
    ok,
    serverError,
    transactionNotFoundResponse,
} from '../helpers/index.js'

export class DeleteTransactionController {
    constructor(deleteTransactionUseCase) {
        this.deleteTransactionUseCase = deleteTransactionUseCase
    }

    async execute(httpRequest) {
        try {
            const transactionId = httpRequest.params.transactionId

            const transactionIdIsValid = checkIfIdIsValid(transactionId)

            if (!transactionIdIsValid) {
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
