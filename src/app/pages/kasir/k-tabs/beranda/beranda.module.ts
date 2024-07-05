import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BerandaPageRoutingModule } from './beranda-routing.module';

import { BerandaPage } from './beranda.page';
import { ModalPesananComponent } from 'src/app/components/modal-pesanan/modal-pesanan.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BerandaPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [BerandaPage, ModalPesananComponent],
})
export class BerandaPageModule {}
