import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BuscarEventoComponent } from './components/buscar-evento/buscar-evento.component';
import { ComponenteComponent } from './components/componente/componente.component';
import { EventoComponent } from './components/evento/evento.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { ListComponenteComponent } from './components/list-componente/list-componente.component';
import { ListUsuarioComponent } from './components/list-usuario/list-usuario.component';
import { LoginComponent } from './components/login/login.component';
import { UsuarioComponent } from './components/usuario/usuario.component';
import { AuthInGuard } from './services/auth/authIn.guard';
import { AuthOutGuard } from './services/auth/authOut.guard';
import { ClaveValorDominiosResolve, ClaveValorTipoComponenteResolve } from './services/resolves';

const routes: Routes = [
  {path: 'login', component: LoginComponent, canActivate: [AuthInGuard]},
  {path: '', redirectTo:'inicio', pathMatch: 'full'},
  {
    path: '', 
    component: InicioComponent, 
    canActivate: [AuthOutGuard],
    children: [
      {path: 'inicio', component: BuscarEventoComponent, canActivate: [AuthOutGuard]},
      {path: 'evento', component: EventoComponent, resolve : [ClaveValorDominiosResolve, ClaveValorTipoComponenteResolve], canActivate: [AuthOutGuard]},
      {path: 'evento/:id_evento', component: EventoComponent, resolve : [ClaveValorDominiosResolve, ClaveValorTipoComponenteResolve], canActivate: [AuthOutGuard]},
      {path: 'componente', component: ComponenteComponent, resolve: [ClaveValorTipoComponenteResolve], canActivate: [AuthOutGuard]},
      {path: 'componente/:id_componente', component: ComponenteComponent, resolve: [ClaveValorTipoComponenteResolve], canActivate: [AuthOutGuard]},
      {path: 'lista-componente', component: ListComponenteComponent, resolve: [ClaveValorTipoComponenteResolve], canActivate: [AuthOutGuard]},
      {path: 'usuario', component: UsuarioComponent, resolve: [ClaveValorDominiosResolve], canActivate: [AuthOutGuard]},
      {path: 'lista-usuario', component: ListUsuarioComponent, resolve: [ClaveValorDominiosResolve], canActivate: [AuthOutGuard]},
      {path: 'usuario/:id_usuario', component: UsuarioComponent, resolve: [ClaveValorDominiosResolve], canActivate: [AuthOutGuard]}
    ]
  },
  {path: '**', redirectTo: '/'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    // Tell the router to use the hash instead of HTML5 pushstate.
    useHash: true,
    // Once the above is enabled, the fragment link will only work on the
    // first click. This is because, by default, the Router ignores requests
    // to navigate to the SAME URL that is currently rendered. Unfortunately,
    // the fragment scrolling is powered by Navigation Events. As such, we
    // have to tell the Router to re-trigger the Navigation Events even if we
    // are navigating to the same URL.
    onSameUrlNavigation: "reload"
  })],
  exports: [RouterModule],
  providers: [ClaveValorDominiosResolve, ClaveValorTipoComponenteResolve]
})
export class AppRoutingModule { }
