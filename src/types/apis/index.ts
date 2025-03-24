export interface ListAPIResponse<T> {
    data: T[];
    total: number
    query: string | null
    limit: number | null
    offset: number | null
}