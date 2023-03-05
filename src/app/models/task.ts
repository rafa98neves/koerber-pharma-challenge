import type { PaginatedResponse } from "./pagination";

export interface TaskResponse extends PaginatedResponse {
    todos: Task[],
}

export interface Task {
    id: number,
    todo: string,
    completed: boolean,
    userId: number
    
    timer?: number,
    started?: boolean,
}