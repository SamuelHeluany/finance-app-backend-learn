import { prisma } from '../../../../prisma/prisma.js'
import { Users } from '../../../generated/prisma/index.js'

export class PostgresGetUserByEmailRepository {
    async execute(email: string): Promise<Users | null> {
        return await prisma.users.findUnique({
            where: {
                email,
            },
        })
    }
}
