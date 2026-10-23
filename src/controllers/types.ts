export interface HttpRequest<TBody = unknown> {
    body: TBody
    params?: Record<string, string | undefined>
    query?: Record<string, unknown>
}

export interface HttpResponse<TBody = unknown> {
    statusCode: number
    body: TBody
}
