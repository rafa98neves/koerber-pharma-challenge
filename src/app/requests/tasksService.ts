import config from '@/config';
import type { PaginatedRequest } from '../models/pagination';
import type { Task, TaskResponse } from '../models/task';
import type { HttpService } from './http';

/**
 * Task service
 *
 * Methods:
 *  - listTasks (payload: { userId?: number } & Partial<PaginatedRequest>) - fetchs list of tasks. If success retrieves a TaskResponse
 *
 *  - updateTask (payload: todoId: number, payload Partial<Task> ) - updates todo
 */
export class TasksService {
  private http;

  constructor(http: HttpService) {
    this.http = http;
  }

  public listTasksOfUser(userId: number, payload: Partial<PaginatedRequest>) {
    return this.http.get<TaskResponse>(`${config.baseUrl}todos/user/${userId}`, { params: payload });
  }

  public updateTodo(id: number, payload: Partial<Task>) {
    return this.http.put<Partial<Task>>(`${config.baseUrl}todos/${id}`, payload);
  }
}
