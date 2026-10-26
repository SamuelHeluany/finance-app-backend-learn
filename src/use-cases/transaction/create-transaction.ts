import { v4 as uuidv4 } from 'uuid'
import { userNotExistsError } from '../../errors/user.js'
import {
    Transactions,
    TransactionType,
    Users,
} from '../../generated/prisma/index.js'
import { Decimal } from '@prisma/client/runtime/client'

export interface CreateTransactionsProps {
    name: string
    date: Date
    amount: Decimal
    type: TransactionType
    user_id: string
}

interface GetUserByIdRepositoryProps {
    execute(userId: string): Promise<Users | null>
}

interface CreateTransactionRepositoryProps {
    execute(transaction: Transactions): Promise<Transactions>
}

export class CreateTransactionUseCase {
    constructor(
        private readonly createTransactionRepository: CreateTransactionRepositoryProps,
        private readonly getUserByIdRepository: GetUserByIdRepositoryProps,
    ) {}
    async execute(
        createTransactionParams: CreateTransactionsProps,
    ): Promise<Transactions> {
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
