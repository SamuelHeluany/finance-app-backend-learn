import { ZodError } from 'zod'
import { createTransactionSchema } from '../../schemas/transaction.js'
import { badRequest, created, serverError } from '../helpers/index.js'
import { CreateTransactionsProps } from '../../use-cases/index.js'
import { Transactions } from '../../generated/prisma/index.js'
import { HttpRequest, HttpResponse } from '../types.js'

export interface CreateTransactionUseCaseProps {
    execute(params: CreateTransactionsProps): Promise<Transactions>
}

export class CreateTransactionController {
    constructor(
        private readonly createTransactionUseCase: CreateTransactionUseCaseProps,
    ) {}
    async execute(httpRequest: HttpRequest): Promise<HttpResponse> {
        try {
            // pega os params do body
            const params = httpRequest.body as CreateTransactionsProps

            await createTransactionSchema.parseAsync(params)

            // na criação da transaction, passa tudo que foi passado no body(params) e passa o type que foi criado
            const transaction =
                await this.createTransactionUseCase.execute(params)

            return created(transaction)
        } catch (error) {
            if (error instanceof ZodError) {
                return badRequest({
                    message: error.issues[0]?.message ?? 'Invalid Request',
                })
            }
            console.error(error)
            return serverError()
        }
    }
}
