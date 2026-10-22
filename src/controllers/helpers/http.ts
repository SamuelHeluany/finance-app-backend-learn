// helpers relacionados a http, status code, body...

// Helper são os ajudantes do codigo, principalmente quando há repetição de código

// return pro usuário passando o body
import type { HttpResponse } from '../types.js'

export const badRequest = (body: {
    message: string
}): HttpResponse<{ message: string }> => ({
    statusCode: 400,
    body,
})

export const created = <T>(body: T): HttpResponse<T> => ({
    statusCode: 201,
    body,
})

export const serverError = (): HttpResponse<{ message: string }> => ({
    statusCode: 500,
    body: { message: 'Internal server error' },
})

export const ok = <T>(body: T): HttpResponse<T> => ({
    statusCode: 200,
    body,
})

export const notFound = <T>(body: T): HttpResponse<T> => ({
    statusCode: 404,
    body,
})
