import { EmailAlreadyInUseError } from '../../errors/user.js'
import {
    checkIfEmailIsValid,
    checkIfPasswordIsValid,
    emailIsAlreadyInUseResponse,
    invalidPasswordResponse,
    badRequest,
    created,
    serverError,
    validateRequiredFields,
} from '../helpers/index.js'

export class CreateUserController {
    constructor(createUserUseCase) {
        this.createUserUseCase = createUserUseCase
    }
    async execute(httpRequest) {
        try {
            const params = httpRequest.body
            // Validar a requisição (campos obrigatórios, tamanho de senha e email)
            // Cria uma lista com os fields obrigatórios
            const requiredFields = [
                'first_name',
                'last_name',
                'email',
                'password',
            ]
            // faz uma validação dos campos, passando o validate(body e requiredFields)
            const { ok: allFieldsAreProvide, missingField } =
                validateRequiredFields(params, requiredFields)
            // Verifica se se é false o OK do validation, se for false, reotrna erro
            if (!allFieldsAreProvide) {
                return badRequest({
                    message: `Missing params: ${missingField}`,
                })
            }

            // Valida se a senha tem pelomenos 6 caracteres
            const passwordIsValid = checkIfPasswordIsValid(params.password)
            if (!passwordIsValid) {
                return invalidPasswordResponse()
            }

            // Valida se o email foi informado da forma correta test@test.com.br
            const emailIsValid = checkIfEmailIsValid(params.email)

            if (!emailIsValid) {
                return emailIsAlreadyInUseResponse()
            }
            // passa os params para o usecase
            const createdUser = await this.createUserUseCase.execute(params)

            // retornar a resposta pro usuário (status code) e no corpo o usuário criado
            return created(createdUser)
        } catch (error) {
            // faz a comparação de que se o erro for uma instancia de EmailAlreadyInUseError, significa que esse erro foi emitido em alguma camada (no caso na use-case) e passa um badRequest com a mensagem do EmailAlreadyInUseError
            if (error instanceof EmailAlreadyInUseError) {
                return badRequest({ message: error.message })
            }
            console.error('Erro ao processar requisição:', error)
            // se der erro, retorna o status code e message ao usuário (vindo do helpers.js)
            return serverError()
        }
    }
}
