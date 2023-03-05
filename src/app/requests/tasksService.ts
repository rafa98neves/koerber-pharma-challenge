import config from '@/config';
import type { PaginatedRequest } from '../models/pagination';
import type { TaskResponse } from '../models/task';
import type { HttpService } from './http';

/**
 * Task service
 *
 * Methods:
 *  - listTasks (payload: { userId?: string } & Partial<PaginatedRequest>) - fetchs list of tasks. If success retrieves a TaskResponse
 */
export class TasksService {
  private http;

  constructor(http: HttpService) {
    this.http = http;
  }

  public listTasks(payload: { userId?: number } & Partial<PaginatedRequest>) {
    return this.http.get<TaskResponse>(`${config.baseUrl}todos`, { params: payload });
  }
}
