import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', loadChildren: './pages/home/home.module#HomePageModule' },
  { path: 'create-store', loadChildren: './pages/store/create-store/create-store.module#CreateStorePageModule' },
  { path: 'search-store', loadChildren: './pages/search-store/search-store.module#SearchStorePageModule' },
  {
    path: 'store-login',
    loadChildren: () => import('./pages/store/store-login/store-login.module').then( m => m.StoreLoginPageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
