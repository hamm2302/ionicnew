import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';

export const authRedirectGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const auth = inject(AuthService);

  if (!auth.isLoggedIn()) {
    return true;
  }else{
    if(auth.infoLoginUser() === "owner"){
      router.navigate(['/o-tabs/beranda']);
      return false
    }else{
      router.navigate(['/k-tabs/beranda']);
      return false
    }
  }
};
