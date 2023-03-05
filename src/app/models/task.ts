import type { PaginatedResponse } from './pagination';

/**
 * API Todo fetch response
 */
export interface TaskResponse extends PaginatedResponse {
  todos: Task[];
}

/**
 * Single Todo task
 */
export interface Task {
  id: number;
  todo: string;
  completed: boolean;
  userId: number;

  /**
   * Task current time progress
   */
  timer?: number;

  /**
   * Whether task has been started before
   */
  started?: boolean;
}
