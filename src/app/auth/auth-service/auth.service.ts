import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from './../../../environments/environment';

@Injectable()
export class AuthService {
  constructor(private http: HttpClient) {}

  signUp(user): Observable<object> {
    return this.http.post(`${environment.apiUrl}/user/signUp`, user);
  }

  login(user): Observable<object> {
    return this.http.post(`${environment.apiUrl}/user/login`, user);
  }

  checkForLogin(): boolean {
    if (localStorage.getItem('id_token')) {
      return true;
    } else {
      return false;
    }
  }
}
