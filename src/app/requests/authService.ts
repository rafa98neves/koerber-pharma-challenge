import config from '@/config';
import type { UserData } from '../models/user';
import type { HttpService } from './http';

export class AuthService {
    private http;

    constructor(http: HttpService) {
        this.http = http;
      }

    public login(payload: { username: string, password: string}) {
        return this.http.post<UserData>(`${config.baseUrl}auth/login`, payload);
    }
}
  