import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { KTabsPageRoutingModule } from './k-tabs-routing.module';

import { KTabsPage } from './k-tabs.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    KTabsPageRoutingModule
  ],
  declarations: [KTabsPage]
})
export class KTabsPageModule {}
