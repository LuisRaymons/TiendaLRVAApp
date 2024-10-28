import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import {authGuard} from './Recursos/guards/auth.guard'

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'principal',
    canActivate:[authGuard],
    loadChildren: () => import('./Pages/principal/principal.module').then( m => m.PrincipalPageModule)
  },
  {
    path: 'usuario',
    canActivate:[authGuard],
    loadChildren: () => import('./Pages/usuario/usuario.module').then( m => m.UsuarioPageModule)
  },
  {
    path: 'cliente',
    canActivate:[authGuard],
    loadChildren: () => import('./Pages/cliente/cliente.module').then( m => m.ClientePageModule)
  },
  {
    path: 'cliente/listado',
    canActivate:[authGuard],
    loadChildren: () => import('./Pages/cliente/cliente.module').then( m => m.ClientePageModule)
  },
  {
    path: 'categoria',
    canActivate:[authGuard],
    loadChildren: () => import('./Pages/categoria/categoria.module').then( m => m.CategoriaPageModule)
  },
  {
    path: 'producto',
    canActivate:[authGuard],
    loadChildren: () => import('./Pages/producto/producto.module').then( m => m.ProductoPageModule)
  },
  {
    path: 'promotor',
    canActivate:[authGuard],
    loadChildren: () => import('./Pages/promotor/promotor.module').then( m => m.PromotorPageModule)
  },
  {
    path: 'perfil',
    canActivate:[authGuard],
    loadChildren: () => import('./Pages/perfil/perfil.module').then( m => m.PerfilPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
