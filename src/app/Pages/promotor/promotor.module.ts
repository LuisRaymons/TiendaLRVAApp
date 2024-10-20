import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PromotorPageRoutingModule } from './promotor-routing.module';

import { PromotorPage } from './promotor.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PromotorPageRoutingModule
  ],
  declarations: [PromotorPage]
})
export class PromotorPageModule {}
