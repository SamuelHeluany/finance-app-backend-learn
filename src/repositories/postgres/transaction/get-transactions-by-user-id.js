import { PostgresHelper } from '../../../db/postgres/helper'
// pega por userId da transaction usando query params
export class PostgresGetTransactionByUserId {
    async execute(userId) {
        const transactions = await PostgresHelper.query(
            'SELECT * FROM transactions WHERE user_id = $1',
            [userId],
        )
        return transactions[0]
    }
}
