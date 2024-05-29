import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Credenciais } from '../models/Credenciais';
import { API_CONFIG } from '../config/api.config';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  authenticate(creds: Credenciais) {
    return this.http.post(`${API_CONFIG.baseUrl}login`, creds);
  }

  successfulLogin(authToken: string, login: string) {
    localStorage.setItem('token', authToken)
    localStorage.setItem('email', login)
  }
}
