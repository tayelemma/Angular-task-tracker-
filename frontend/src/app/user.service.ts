import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from './../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private http = inject(HttpClient);
  constructor() {}

  login(user: { email: string; password: string }) {
    return this.http.post<{ success: boolean; data: string }>(
      environment.server + '/users/login',
      user
    );
  }

  signup(user: { fullname: string; email: string; password: string}) {
    return this.http.post<{ success: boolean }>(
      environment.server + '/users/signup',
      user
    );
  }
}
