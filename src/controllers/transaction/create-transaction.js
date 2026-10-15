import {
    badRequest,
    checkIfIdIsValid,
    created,
    invalidIdResponse,
    serverError,
} from '../helpers/index.js'
import validator from 'validator'

export class CreateTransactionController {
    constructor(createTransactionUseCase) {
        this.createTransactionUseCase = createTransactionUseCase
    }
    async execute(httpRequest) {
        try {
            // pega os params do body
            const params = httpRequest.body
            // cria os campos obrigatórios
            const requiredFields = ['user_id', 'name', 'date', 'amount', 'type']
            // faz um loop verificando os campos obrigatorios, se eles foram todos passados
            for (const field of requiredFields) {
                if (
                    !params[field] ||
                    params[field].toString().trim().length === 0
                ) {
                    return badRequest({ message: `Missing params: ${field}` })
                }
            }
            // verifica se o userid é valido
            const userIdIsValid = checkIfIdIsValid(params.user_id)
            // se não for valido, retorna erro
            if (!userIdIsValid) {
                return invalidIdResponse()
            }
            // se q quantidade for menor ou igual a 0, retorna erro
            if (params.amount <= 0) {
                return badRequest({
                    message: 'The amount must be greater than 0.',
                })
            }
            // usa o validator para validar o formato do valor passado transformando em uma string: se tem 2 decimais, não permite valor negativos e o separador de decimal é o ponto
            const amountIsValid = validator.isCurrency(
                params.amount.toString(),
                {
                    digits_after_decimal: [2],
                    allow_negatives: false,
                    decimal_separator: '.',
                },
            )
            // Se a validação do amount for false, retorna erro
            if (!amountIsValid) {
                return badRequest({
                    message: 'The amount must be a valid currency.',
                })
            }
            // tira o espaçamento do type passado e deixa maiusculo
            const type = params.type.trim().toUpperCase()
            // Verifica se o type é algum dos informados,
            const typeIsValid = ['EARNING', 'EXPENSE', 'INVESTIMENT'].includes(
                type,
            )
            // se for false, retorna erro
            if (!typeIsValid) {
                return badRequest({
                    message: 'The type must be EARNING, EXPENSE, INVESTIMENT',
                })
            }
            // na criação da transaction, passa tudo que foi passado no body(params) e passa o type que foi criado
            const transaction = await this.createTransactionUseCase.execute({
                ...params,
                type,
            })

            return created(transaction)
        } catch (error) {
            console.error(error)
            return serverError()
        }
    }
}
