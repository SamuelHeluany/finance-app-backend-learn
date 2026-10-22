import { ZodError } from 'zod'
import { EmailAlreadyInUseError } from '../../errors/user.js'
import { badRequest, created, serverError } from '../helpers/index.js'
import { createUserSchema } from '../../schemas/index.js'
import { CreateUserProps } from '../../use-cases/index.js'
import { Users } from '../../generated/prisma/index.js'
import { HttpRequest, HttpResponse } from '../types.js'

export interface CreateUserUserCaseProps {
    execute(params: CreateUserProps): Promise<Users>
}

export class CreateUserController {
    constructor(private readonly createUserUseCase: CreateUserUserCaseProps) {}
    async execute(httpRequest: HttpRequest): Promise<HttpResponse> {
        try {
            const params = httpRequest.body as CreateUserProps
            // verifica o que foi passado no body pelo zod, de for asyncrona
            await createUserSchema.parseAsync(params)
            // passa os params para o usecase
            const createdUser = await this.createUserUseCase.execute(params)

            // retornar a resposta pro usuário (status code) e no corpo o usuário criado
            return created(createdUser)
        } catch (error) {
            // Se for um erro do zod, ele trar um 404 com a mensagem de erro do proprio zod
            if (error instanceof ZodError) {
                return badRequest({
                    message: error.issues[0]?.message ?? 'Invalid request.',
                })
            }
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
