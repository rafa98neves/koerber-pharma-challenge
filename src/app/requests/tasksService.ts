import config from '@/config';
import type { PaginatedResponse } from '../models/pagination';
import type { TaskResponse } from '../models/task';
import type { HttpService } from './http';

export class TasksService {
    private http;

    constructor(http: HttpService) {
        this.http = http;
      }

    public listTasks(payload: { userId?: number } & Partial<PaginatedResponse> ) {
        return this.http.get<TaskResponse>(`${config.baseUrl}todos`, { params: payload });
    }
}
  