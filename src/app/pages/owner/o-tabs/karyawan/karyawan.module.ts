import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { KaryawanPageRoutingModule } from './karyawan-routing.module';

import { KaryawanPage } from './karyawan.page';
import { ModalKaryawanComponent } from 'src/app/components/modal-karyawan/modal-karyawan.component';
import { ReactiveFormsModule } from '@angular/forms';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    KaryawanPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [KaryawanPage, ModalKaryawanComponent],
})
export class KaryawanPageModule {}
