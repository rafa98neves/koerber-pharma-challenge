import config from '@/config';
import { AuthService } from './authService';
import { HttpService } from './http';
import { TasksService } from './tasksService';

export interface Services {
  auth: AuthService;
  tasks: TasksService;
}

/**
 * Simple Service Manager
 *
 * Generates all services and retrieves list
 */
export function getServices(): Services {
  const http = new HttpService(config.baseUrl);
  return {
    auth: new AuthService(http),
    tasks: new TasksService(http),
  };
}
