import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { KaryawanPage } from './karyawan.page';

const routes: Routes = [
  {
    path: '',
    component: KaryawanPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class KaryawanPageRoutingModule {}
