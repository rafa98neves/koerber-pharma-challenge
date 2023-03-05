export interface PaginatedResponse extends PaginatedRequest {
    total: number,
}

export interface PaginatedRequest {
    limit: number,
    skip: number,
}