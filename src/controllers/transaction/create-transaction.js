import { ZodError } from 'zod'
import { createTransactionSchema } from '../../schemas/transaction.js'
import { badRequest, created, serverError } from '../helpers/index.js'

export class CreateTransactionController {
    constructor(createTransactionUseCase) {
        this.createTransactionUseCase = createTransactionUseCase
    }
    async execute(httpRequest) {
        try {
            // pega os params do body
            const params = httpRequest.body

            await createTransactionSchema.parseAsync(params)

            // na criação da transaction, passa tudo que foi passado no body(params) e passa o type que foi criado
            const transaction =
                await this.createTransactionUseCase.execute(params)

            return created(transaction)
        } catch (error) {
            if (error instanceof ZodError) {
                return badRequest({
                    message: error.issues[0].message,
                })
            }
            console.error(error)
            return serverError()
        }
    }
}
