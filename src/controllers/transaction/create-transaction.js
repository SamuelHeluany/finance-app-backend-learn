import {
    checkIfIdIsValid,
    created,
    invalidIdResponse,
    requiredFieldIsMissingResponse,
    serverError,
    validateRequiredFields,
} from '../helpers/index.js'
import {
    checkIfAmountIsValid,
    checkIfTypeIsValid,
    invalidAmountResponse,
    invalidTypeResponse,
} from '../helpers/transaction.js'

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

            // faz uma validação dos campos, passando o validate(body e requiredFields)
            const { ok: allFieldsAreProvide, missingField } =
                validateRequiredFields(params, requiredFields)

            // Verifica se se é false o OK do validation, se for false, retorna erro
            if (!allFieldsAreProvide) {
                return requiredFieldIsMissingResponse(missingField)
            }
            // verifica se o userid é valido
            const userIdIsValid = checkIfIdIsValid(params.user_id)
            // se não for valido, retorna erro
            if (!userIdIsValid) {
                return invalidIdResponse()
            }
            // usa o validator para validar o formato do valor passado transformando em uma string: se tem 2 decimais, não permite valor negativos e o separador de decimal é o ponto
            const amountIsValid = checkIfAmountIsValid(params.amount)
            // Se a validação do amount for false, retorna erro
            if (!amountIsValid) {
                return invalidAmountResponse()
            }
            // tira o espaçamento do type passado e deixa maiusculo
            const type = params.type.trim().toUpperCase()
            // Verifica se o type é algum dos informados,
            const typeIsValid = checkIfTypeIsValid(type)

            // se for false, retorna erro
            if (!typeIsValid) {
                return invalidTypeResponse()
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
