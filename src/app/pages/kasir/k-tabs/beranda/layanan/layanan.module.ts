import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LayananPageRoutingModule } from './layanan-routing.module';

import { LayananPage } from './layanan.page';
import { ReactiveFormsModule } from '@angular/forms';
import { TambahLayananComponent } from 'src/app/components/tambah-layanan/tambah-layanan.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LayananPageRoutingModule,
    ReactiveFormsModule,
  ],
  declarations: [LayananPage, TambahLayananComponent]
})
export class LayananPageModule {}
