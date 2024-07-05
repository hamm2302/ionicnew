import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private auth: AuthService) {}

  canActivate(): boolean {
    // if (localStorage.getItem('token')) {
    //   // Token ada, arahkan ke halaman 'beranda'
    //   this.router.navigateByUrl('o-tabs/beranda');
    //   return false; // Return false untuk memblokir navigasi ke halaman 'login'
    // }
    // return true; // Return true untuk mengizinkan navigasi ke halaman 'login'
    // if (!this.auth.isLoggedIn()) {
    //   this.router.navigateByUrl('login');
    //   return false;
    // } else {
    //   return true;
    // }
    if(this.auth.isLoggedIn() === true){
      return true
    }else{
      this.router.navigateByUrl('login');
      return false
    }
  }
}
