// Helpers relacionados a transaction
import validator from 'validator'
import { badRequest } from './http.js'

// Checa se o amount está no formato correto, transforma ele em string e pass ao objeto do amount..2 CASAS DECIMAIS, NÃO PODE SER NEGATIVO E O SEPARATOR É O PONTO
export const checkIfAmountIsValid = (amount) => {
    return validator.isCurrency(amount.toString(), {
        digits_after_decimal: [2],
        allow_negatives: false,
        decimal_separator: '.',
    })
}
//
export const invalidAmountResponse = () => {
    return badRequest({
        message: 'The amount must be a valid currency.',
    })
}
// Checa se o tipo é valido e está inserido como 'EARNING', 'EXPENSE', 'INVESTIMENT'
export const checkIfTypeIsValid = (type) => {
    return ['EARNING', 'EXPENSE', 'INVESTIMENT'].includes(type)
}

//
export const invalidTypeResponse = () => {
    return badRequest({
        message: 'The type must be EARNING, EXPENSE, INVESTIMENT',
    })
}
