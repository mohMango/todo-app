import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:5000/auth/';

  constructor(private http: HttpClient) { }

  loggedIn() {
    const token = localStorage.getItem('token');
    return !!token;
  }

  login(email: string, password: string): Observable<{ token: string }> {
    const headers = {
      'Content-Type': 'application/json',
    };
    return this.http.post<{ token: string }>(
      this.apiUrl + 'login',
      { email, password },
      {
        headers,
      }
    );
  }

  register(email: string, password: string): Observable<{ token: string }> {
    const headers = {
      'Content-Type': 'application/json',
    };
    return this.http.post<{ token: string }>(
      this.apiUrl + 'register',
      { email, password },
      {
        headers,
      }
    );
  }
}
