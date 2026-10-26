import { Transactions } from '../../generated/prisma/index.js'
import { UpdateTransactionParams } from '../../use-cases/index.js'
import {
    badRequest,
    checkIfAmountIsValid,
    checkIfIdIsValid,
    checkIfTypeIsValid,
    invalidAmountResponse,
    invalidIdResponse,
    invalidTypeResponse,
    serverError,
    ok,
} from '../helpers/index.js'
import { HttpRequest, HttpResponse } from '../types.js'

interface UpdateTransactionUseCaseProps {
    execute(
        transactionId: string,
        params: UpdateTransactionParams,
    ): Promise<Transactions>
}

export class UpdateTransactionController {
    constructor(
        private readonly updateTransactionUseCase: UpdateTransactionUseCaseProps,
    ) {}
    async execute(httpRequest: HttpRequest): Promise<HttpResponse> {
        try {
            const params = httpRequest.body as UpdateTransactionParams
            const transactionId = httpRequest.params?.transactionId

            if (!transactionId || !checkIfIdIsValid(transactionId)) {
                return invalidIdResponse()
            }

            const allowedFields = ['name', 'date', 'amount', 'type']

            const someFieldIsNotAllowed = Object.keys(params).some(
                (field) => !allowedFields.includes(field),
            )

            if (someFieldIsNotAllowed) {
                return badRequest({
                    message: 'Some provided field is not allowed.',
                })
            }

            if (params.amount) {
                const amountIsValid = checkIfAmountIsValid(params.amount)

                if (!amountIsValid) {
                    return invalidAmountResponse()
                }
            }

            if (params.type) {
                const typeIsValid = checkIfTypeIsValid(params.type)

                if (!typeIsValid) {
                    return invalidTypeResponse()
                }
            }

            const transaction = await this.updateTransactionUseCase.execute(
                transactionId,
                params,
            )

            return ok(transaction)
        } catch (error) {
            console.error(error)
            return serverError()
        }
    }
}
