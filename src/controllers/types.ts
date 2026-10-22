export interface HttpRequest<TBody = unknown> {
    body: TBody
    params?: Record<string, string>
    query?: Record<string, string>
}

export interface HttpResponse<TBody = unknown> {
    statusCode: number
    body: TBody
}
