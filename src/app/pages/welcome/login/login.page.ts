import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api/api.service';
import { AlertController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  presentingElement: any = null;

  constructor(
    public api: ApiService,
    public router: Router,
    private auth: AuthService,
    private formBuilder: FormBuilder
  ) {}

  FormLogin!: FormGroup;

  form = {
    email: '',
    password: '',
    error: '',
  };
  //Login
  ngOnInit() {
    // let token = localStorage.getItem('token');

    // if (token && token !== '') {
    //   console.log('login');
    //   this.router.navigateByUrl('/c-tabs');
    // }
    // if (token) {
    //   if (token != '') {
    //     console.log('login');
    //     this.router.navigateByUrl('o-tabs/beranda');
    //   }
    // }

    this.FormLogin = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });

    this.presentingElement = document.querySelector('.ion-page');
  }

  async login() {
    // this.api.login(this.form);
    // this.showAlert("Login Successfully", "Welcome to Hamm Laundry");
    // this.router.navigate(['/tabs/home']);
    // console.log(this.FormLogin.value);
    if (this.FormLogin.valid) {
      const dataLogin = {
        email: this.form.email,
        password: this.form.password,
      };
      try {
        const response = await this.auth.login(this.FormLogin.value);
        if (response) {
          localStorage.setItem('token', response.token);
          if (this.auth.infoLoginUser() === 'owner') {
            this.router.navigateByUrl('o-tabs/beranda');
          } else {
            this.router.navigateByUrl('k-tabs/beranda');
          }
        }
      } catch (error: any) {
        // showAlert
        console.log('Error: ', error);
      }
    } else {
      console.log('Error : ', this.FormLogin.getError);
    }
  }
}
