import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StoreLoginPage } from './store-login.page';

const routes: Routes = [
  {
    path: '',
    component: StoreLoginPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StoreLoginPageRoutingModule {}
