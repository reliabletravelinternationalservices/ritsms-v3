export interface ApiResponse<T> {
    success: boolean
    message: string
    data: T
    meta: PaginatedMeta
}

export interface PaginatedMeta {
    current_page: number
    first_page_url: string
    from: number | null
    last_page: number
    last_page_url: string
    links: PaginationLink[]
    next_page_url: string | null
    path: string
    per_page: number
    prev_page_url: string | null
    to: number | null
    total: number
}

export interface PaginationLink {
    url: string | null
    label: string
    active: boolean
}

