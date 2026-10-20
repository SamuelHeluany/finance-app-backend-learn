import { v4 as uuidv4 } from 'uuid'
import { userNotExistsError } from '../../errors/user.js'

export class CreateTransactionUseCase {
    constructor(createTransactionRepository, getUserByIdRepository) {
        this.createTransactionRepository = createTransactionRepository
        this.getUserByIdRepository = getUserByIdRepository
    }
    async execute(createTransactionParams) {
        // validar se o usuário existe
        const userId = createTransactionParams.user_id
        // pega o usuário do get by user repository
        const user = await this.getUserByIdRepository.execute(userId)
        // se o usuário não existir, lança o erro
        if (!user) {
            throw new userNotExistsError(userId)
        }
        // cria o id da transaction
        const transactionId = uuidv4()
        // executa a criação da transaction, recebendo todos os parametros e o id criado
        const transaction = await this.createTransactionRepository.execute({
            ...createTransactionParams,
            id: transactionId,
        })
        // retorna a transaction criada
        return transaction
    }
}
