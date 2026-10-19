import { PostgresHelper } from '../../../db/postgres/helper.js'

export class PostgresGetUserBalanceRepository {
    async execute(userId) {
        // Balanço do usuário, onde pega o ganho, gasto e investimento e depois faz o calculo de GANHO - GASTO - INVESTIMENTO
        const balance = await PostgresHelper.query(
            `SELECT * FROM get_user_balance($1)`,
            [userId],
        )
        return {
            userId,
            ...balance[0],
        }
    }
}
