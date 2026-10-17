// Helpers relacionados a transaction
import validator from 'validator'
import { badRequest } from './http.js'

// Checa se o amount está no formato correto, transforma ele em string e pass ao objeto do amount..2 CASAS DECIMAIS, NÃO PODE SER NEGATIVO E O SEPARATOR É O PONTO
export const checkIfAmountIsValid = (amount) => {
    // se o tipo do amount for diferente de number
    if (typeof amount != 'number') {
        return false
    }
    // Como o express vê o 0 como nulo (ex: 10.50 ele recebe 10.5), cai no erro. Agora com o tofixed, mesmo recebendo 0 nulo, ele coloca um 0 no final e passa na validação do decimal
    return validator.isCurrency(amount.toFixed(2), {
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
