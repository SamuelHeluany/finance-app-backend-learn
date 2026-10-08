import { PostgresHelper } from '../../db/postgres/helper'

export class PostgresGetUserByIdRepository {
    // chama o helper para fazer o select por id dos usuários passando o userId
    async execute(userId) {
        const user = await PostgresHelper.query(
            'SELECT * FROM users WHERE ID = $1',
            [userId],
        )
        return user[0]
    }
}
