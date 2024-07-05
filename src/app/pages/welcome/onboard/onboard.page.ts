import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api/api.service';
import { AlertController } from '@ionic/angular';
@Component({
  selector: 'app-onboard',
  templateUrl: './onboard.page.html',
  styleUrls: ['./onboard.page.scss'],
})
export class OnboardPage implements OnInit {

  constructor(

    // public router: Router,
    // public api: ApiService,
    // public alertController: AlertController
  ) { }

  // form = {
  //   email: '',
  //   password: '',
  // }
  // presentingElement: any = null

  ngOnInit() {
  //   let token = localStorage.getItem('token');
  
  //   // if (token && token !== '') {
  //   //   console.log('login');
  //   //   this.router.navigateByUrl('/c-tabs');
  //   // }
  //   if (token) {
  //     if(token != ''){
  //       console.log('login');
  //       this.router.navigateByUrl('o-tabs/beranda');
  //     }
  //   }
  //   this.presentingElement = document.querySelector('.ion-page');
  // }
  
  // async login() {
  //   this.api.login(this.form);
  //   // this.showAlert("Login Successfully", "Welcome to Hamm Laundry");
  //   // this.router.navigate(['/tabs/home']);
  // }
 }
}
