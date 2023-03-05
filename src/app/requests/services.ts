/**
 * Services are generated and returned via a getter function
 * to avoid a complex DI system, until it is necessary
 */
import config from '@/config';
import { AuthService } from './authService';
import { HttpService } from './http';
import { TasksService } from './tasksService';

export interface Services {
  auth: AuthService,
  tasks: TasksService,
}

let services: Services | null = null;

export function getServices(generate = false) {
  if (generate) {
    const http = new HttpService(config.baseUrl);
    services = {
      auth: new AuthService(http),
      tasks: new TasksService(http),
    };
  }
  return services!;
}
