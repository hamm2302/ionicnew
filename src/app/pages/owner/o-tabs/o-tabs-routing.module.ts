import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OTabsPage } from './o-tabs.page';

const routes: Routes = [
  {
    path: '',
    component: OTabsPage,
    children:[
      {
        path: 'beranda',
        loadChildren: () => import('./beranda/beranda.module').then( m => m.BerandaPageModule)
      },
      {
        path: 'karyawan',
        loadChildren: () => import('./karyawan/karyawan.module').then( m => m.KaryawanPageModule)
      },
      {
        path: 'laporan',
        loadChildren: () => import('./laporan/laporan.module').then( m => m.LaporanPageModule)
      },
    ]
  },


];

@NgModule({
  imports: [RouterModule.forChild(routes)], 
  exports: [RouterModule],
})
export class OTabsPageRoutingModule {}
