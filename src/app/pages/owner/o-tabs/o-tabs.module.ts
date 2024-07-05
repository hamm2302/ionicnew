import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OTabsPageRoutingModule } from './o-tabs-routing.module';

import { OTabsPage } from './o-tabs.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OTabsPageRoutingModule
  ],
  declarations: [OTabsPage]
})
export class OTabsPageModule {}
