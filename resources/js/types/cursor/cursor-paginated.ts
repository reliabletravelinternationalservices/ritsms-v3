export interface CursorPaginated<T> {
    data: T[];
    next_cursor: string | null;
    next_page_url: string | null;
    prev_cursor: string | null;
    prev_page_url: string | null;
    per_page: number;
}


export interface CursorPaginatedFilters {
    cursor?: string | null;
    per_page?: number;
}


export type CursorPaginatedFiltersWithSearch = CursorPaginatedFilters & {
    search?: string;
};