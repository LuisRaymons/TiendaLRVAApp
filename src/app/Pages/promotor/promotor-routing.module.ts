import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PromotorPage } from './promotor.page';

const routes: Routes = [
  {
    path: '',
    component: PromotorPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PromotorPageRoutingModule {}
