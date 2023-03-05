import config from '@/config';
import type { Credentials, UserData } from '../models/user';
import type { HttpService } from './http';

/**
 * Authentication service
 *
 * Methods:
 *  - login(payload: Credentials) - login request to API. If success retrieves the UserData
 */
export class AuthService {
  private http;

  constructor(http: HttpService) {
    this.http = http;
  }

  public login(payload: Credentials) {
    return this.http.post<UserData>(`${config.baseUrl}auth/login`, payload);
  }
}
