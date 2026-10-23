// Funções helpers mais para validação
import validator from 'validator'
import { badRequest } from './http.js'

export const checkIfIdIsValid = (userId) => validator.isUUID(userId)

export const invalidIdResponse = () =>
    badRequest({
        message: 'The provided ID is not valid.',
    })

// Retorna uma bad request se tiver um campo que não foi passado ou está em branco
export const requiredFieldIsMissingResponse = (missingField) =>
    badRequest({ message: `Missing params: ${missingField}` })

// faz uma validação se o campo é uma string, pois o trim() não pode ser usado caso o campo for um number...
export const checkIfIsString = (value) => typeof value === 'string'

export const validateRequiredFields = (params, requiredFields) => {
    // faz um loop verificando os campos obrigatorios, se eles foram todos passados
    for (const field of requiredFields) {
        // Faltando algum campo
        const fieldIsMissing = !params[field]
        // se o campo ta vazio
        const fieldIsEmpty =
            checkIfIsString(params[field]) &&
            validator.isEmpty(params[field], {
                ignore_whitespace: true,
            })
        // Se algum campo estiver faltando ou algum campo está vazio, retorna um objeto com o campo que false e o OK como false, parando no FOR OF
        if (fieldIsMissing || fieldIsEmpty) {
            return {
                missingField: field,
                ok: false,
            }
        }
    }
    // Caso não tenha nenhum campo vazio ou faltante, retorna que não tem campo faltando e OK como true. O ok é passado para o controller, se for true passa, se for false retorna erro
    return {
        misssingField: undefined,
        ok: true,
    }
}
