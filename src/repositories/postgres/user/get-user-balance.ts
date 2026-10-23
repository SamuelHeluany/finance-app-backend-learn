import { prisma } from '../../../../prisma/prisma.js'
import { Prisma } from '../../../generated/prisma/index.js'

export interface UserBalance {
    earnings: Prisma.Decimal
    expenses: Prisma.Decimal
    investiments: Prisma.Decimal
    balance: Prisma.Decimal
}

export class PostgresGetUserBalanceRepository {
    async execute(userId: string): Promise<UserBalance> {
        // total de EXPENSES, usa o aggregate para calcular (somar, media, valor minimo, max...)
        const {
            _sum: { amount: totalExpenses },
        } = await prisma.transactions.aggregate({
            // onde o user_id e o userId e o tipoe EXPENSE
            where: {
                user_id: userId,
                type: 'EXPENSE',
            },
            // onde  soma é true (somar)
            _sum: {
                amount: true,
            },
        })
        // total de EARNINGS, usa o aggregate para calcular (somar, media, valor minimo, max...)
        const {
            _sum: { amount: totalEarnings },
        } = await prisma.transactions.aggregate({
            where: {
                user_id: userId,
                type: 'EARNING',
            },
            // onde  soma é true (somar)
            _sum: {
                amount: true,
            },
        })
        // total de INVESTIMENTS, usa o aggregate para calcular (somar, media, valor minimo, max...)
        const {
            _sum: { amount: totalInvestiments },
        } = await prisma.transactions.aggregate({
            where: {
                user_id: userId,
                type: 'INVESTIMENT',
            },
            // onde  soma é true (somar)
            _sum: {
                amount: true,
            },
        })

        const _totalEarnings = totalEarnings || new Prisma.Decimal(0)
        const _totalExpenses = totalExpenses || new Prisma.Decimal(0)
        const _totalInvestiments = totalInvestiments || new Prisma.Decimal(0)

        const balance = _totalEarnings
            .minus(_totalExpenses)
            .minus(_totalInvestiments)

        return {
            earnings: _totalEarnings,
            expenses: _totalExpenses,
            investiments: _totalInvestiments,
            balance,
        }
    }
}
