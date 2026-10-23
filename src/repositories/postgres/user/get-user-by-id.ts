import { prisma } from '../../../../prisma/prisma.js'
import { Users } from '../../../generated/prisma/index.js'

export class PostgresGetUserByIdRepository {
    // chama o helper para fazer o select por id dos usuários passando o userId
    async execute(userId: string): Promise<Users | null> {
        return await prisma.users.findUnique({
            where: {
                id: userId,
            },
        })
    }
}
