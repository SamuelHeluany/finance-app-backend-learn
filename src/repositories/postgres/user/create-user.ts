import { prisma } from '../../../../prisma/prisma.js'
import type { Prisma, Users } from '../../../generated/prisma/index.js'
export class PostgresCreateUserRepository {
    async execute(createUserProps: Prisma.UsersCreateInput): Promise<Users> {
        const user = await prisma.users.create({
            data: createUserProps,
        })
        return user
    }
}
