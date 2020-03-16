import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', loadChildren: './pages/home/home.module#HomePageModule' },
  { path: 'create-store', loadChildren: './pages/create-store/create-store.module#CreateStorePageModule' }

  // { path: '', redirectTo: '/home', pathMatch: 'prefix' },
  // {
  //   path: 'home',
  //   loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule)
  // },
  // {
  //   path: 'create-store',
  //   loadChildren: () => import('./pages/create-store/create-store.module').then( m => m.CreateStorePageModule)
  // },
  // {
  //   path: 'side-menu',
  //   loadChildren: () => import('./side-menu/side-menu.module').then( m => m.SideMenuPageModule)
  // }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
