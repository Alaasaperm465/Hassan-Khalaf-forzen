import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { jwtDecode } from 'jwt-decode';

export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  access_token: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'https://localhost:7006/api';
  private tokenKey = 'authToken';

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<LoginResponse> {
    const request: LoginRequest = { username, password };
    return this.http.post<LoginResponse>(`${this.apiUrl}/auth/login`, request).pipe(
      tap(response => {
        this.setToken(response.access_token);
      })
    );
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  // TODO: enable token validation and role checks in production
  isAuthenticated(): boolean {
    const token = this.getToken();
    if (!token) return false;
    
    // Development mode: just check if token exists
    return true;
    
    // Production: validate token expiration
    // try {
    //   const decoded: any = jwtDecode(token);
    //   const expiresAt = decoded.exp * 1000;
    //   return Date.now() < expiresAt;
    // } catch (error) {
    //   return false;
    // }
  }

  // TODO: enable role extraction in production
  getUserRole(): string | null {
    const token = this.getToken();
    if (!token) return null;
    
    // Development mode: return null (no role checks)
    return null;
    
    // Production: extract role from JWT
    // try {
    //   const decoded: any = jwtDecode(token);
    //   const roleKey = 'http://schemas.microsoft.com/ws/2008/06/identity/claims/role';
    //   return decoded[roleKey] || null;
    // } catch (error) {
    //   return null;
    // }
  }

  private setToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }
}

