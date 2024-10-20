import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'principal',
    loadChildren: () => import('./Pages/principal/principal.module').then( m => m.PrincipalPageModule)
  },
  {
    path: 'usuario',
    loadChildren: () => import('./Pages/usuario/usuario.module').then( m => m.UsuarioPageModule)
  },
  {
    path: 'cliente',
    loadChildren: () => import('./Pages/cliente/cliente.module').then( m => m.ClientePageModule)
  },
  {
    path: 'cliente/listado',
    loadChildren: () => import('./Pages/cliente/cliente.module').then( m => m.ClientePageModule)
  },
  {
    path: 'categoria',
    loadChildren: () => import('./Pages/categoria/categoria.module').then( m => m.CategoriaPageModule)
  },
  {
    path: 'producto',
    loadChildren: () => import('./Pages/producto/producto.module').then( m => m.ProductoPageModule)
  },
  {
    path: 'promotor',
    loadChildren: () => import('./Pages/promotor/promotor.module').then( m => m.PromotorPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
