import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { KTabsPage } from './k-tabs.page';

const routes: Routes = [
  {
    path: '',
    component: KTabsPage,
    children: [
      {
        path: 'beranda',
        loadChildren: () => import('./beranda/beranda.module').then( m => m.BerandaPageModule)
      },
      {
        path: 'profile',
        loadChildren: () => import('./profile/profile.module').then( m => m.ProfilePageModule)
      },
      {
        path: 'pesanan',
        loadChildren: () => import('./pesanan/pesanan.module').then( m => m.PesananPageModule)
      },
      {
        path: '',
        redirectTo: '/k-tabs/home',
        pathMatch: 'full'
      }
    ]
  },




];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class KTabsPageRoutingModule {}
