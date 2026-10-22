import z from 'zod'
import validator from 'validator'

export const createTransactionSchema = z.object({
    user_id: z.uuid({
        message: 'User_id must be a valid UUID.',
    }),
    name: z.string().trim().min(1, {
        message: 'Name is required.',
    }),
    date: z.iso.datetime({
        message: 'Date must be a valid.',
    }),
    type: z.enum(['EARNING', 'EXPENSE', 'INVESTIMENT'], {
        message: 'Type of transaction must be EARNING, EXPENSE or INVESTIMENT',
    }),
    amount: z
        .number({ message: 'Amount must be a number.' })
        .min(1, {
            message: 'Amount must be greater than 0.',
        })
        // refine é usado quando você quer passar uma validação que o zod não tem
        .refine((value) =>
            validator.isCurrency(value.toFixed(2), {
                digits_after_decimal: [2],
                allow_negatives: false,
                decimal_separator: '.',
            }),
        ),
})
