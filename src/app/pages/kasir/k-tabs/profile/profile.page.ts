import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  constructor( private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }
  async logout() {
    await this.authService.logout();
    localStorage.clear();
    this.router.navigateByUrl('/onboard', { replaceUrl: true });
  }
}
