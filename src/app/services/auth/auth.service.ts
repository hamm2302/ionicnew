import { Injectable } from '@angular/core';
import axiosInstance from 'src/app/pages/library/axios';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private tokenKey = 'token';

  constructor() {}

  setToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  isLoggedIn(): boolean {
    const token = this.getToken();
    if (!token) {
      return false;
    }

    try {
      const decodedToken: { exp: number } = jwtDecode(token);

      if (decodedToken.exp < Date.now() / 1000) {
        this.removeToken();
        return false;
      }
      return true;
    } catch (error) {
      console.error('Invalid token:', error);
      return false;
    }
  }

  removeToken(): void {
    localStorage.removeItem(this.tokenKey);
  }

  async logout(): Promise<void> {
    const token = this.getToken();
    if (token) {
      try {
        // Menambahkan token ke header Authorization
        const response = await axiosInstance.get('/logout', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        if (response) {
          this.removeToken();
        }
      } catch (error) {
        console.error('Logout failed', error);
        // Handle error sesuai kebutuhan
      }
    }
  }

  infoLoginUser() {
    // const token = this.getToken();
    // const { data } = await axiosInstance.get('/info', {
    //   headers: {
    //     Authorization: `Bearer ${token}`,
    //   }
    // });
    // return data;
    const token = this.getToken();
    if (!token) {
      return null;
    }
    try {
      const decodedToken: { role: string } = jwtDecode(token);
      return decodedToken.role;
    } catch (error) {
      console.error('Invalid token:', error);
      return error;
    }
  }

  async login(dataLogin: object) {
    const token = this.getToken();
    const { data } = await axiosInstance.post('/login', dataLogin);
    return data;
  }

  async register(dataRegister: object) {
    const token = this.getToken();
    const { data } = await axiosInstance.post('/register', dataRegister, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  }

  async loginWithGoogle(dataLogin: object) {
    const token = this.getToken();
    const { data } = await axiosInstance.post('/oauth/register', dataLogin, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  }
}
