import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api/api.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  constructor(    
    public api: ApiService,
    public router: Router
  ) { }

  form = {
    nama: '',
    email: '',
    password: ''
  }
// register
  ngOnInit() {
  }
  async register() {
    this.api.register(this.form);
  }
  
}
