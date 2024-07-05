import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BerandaPage } from './beranda.page';

const routes: Routes = [
  {
    path: '',
    component: BerandaPage
  },
  {
    path: 'layanan',
    loadChildren: () => import('./layanan/layanan.module').then( m => m.LayananPageModule)
  },
  {
    path: 'laporan',
    loadChildren: () => import('./laporan/laporan.module').then( m => m.LaporanPageModule)
  },



];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BerandaPageRoutingModule {}
