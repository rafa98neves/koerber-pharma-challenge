
/**
 * Pagination response retrieved from API
 */
export interface PaginatedResponse extends PaginatedRequest {
    /**
     * Total number of elements
     */
    total: number,
}

/**
 * Pagination request
 */
export interface PaginatedRequest {
    /**
     * Limit of elements to be fetch
     */
    limit: number,

    /**
     * Number of elements to skip
     */
    skip: number,
}
