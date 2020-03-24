import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StoreLoginPageRoutingModule } from './store-login-routing.module';

import { StoreLoginPage } from './store-login.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StoreLoginPageRoutingModule
  ],
  declarations: [StoreLoginPage]
})
export class StoreLoginPageModule {}
