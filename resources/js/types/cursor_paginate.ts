export type CursorPaginated<T> = {
    data: T[]
    path: string
    per_page: number
    next_cursor: string | null
    next_page_url: string | null
    prev_cursor: string | null
    prev_page_url: string | null
}