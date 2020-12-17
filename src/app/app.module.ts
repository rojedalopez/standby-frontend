import { BrowserModule } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EventoComponent } from './components/evento/evento.component';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ErrorComponent } from './components/tools/error/error.component';
import { CommonModule } from '@angular/common';
import { ComponenteComponent } from './components/componente/componente.component';
import { UsuarioComponent } from './components/usuario/usuario.component';
import { LoginComponent } from './components/login/login.component';
import { AuthInterceptor } from './services/auth/auth.interceptor';
import { ErrorInterceptor } from './services/auth/error.interceptor';
import { LoadingComponent } from './components/tools/loading/loading.component';
import { InicioComponent } from './components/inicio/inicio.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { BuscarEventoComponent } from './components/buscar-evento/buscar-evento.component';
import { ListUsuarioComponent } from './components/list-usuario/list-usuario.component';
import { ListComponenteComponent } from './components/list-componente/list-componente.component';

@NgModule({
  declarations: [
    AppComponent,
    EventoComponent,
    ErrorComponent,
    ComponenteComponent,
    UsuarioComponent,
    LoginComponent,
    LoadingComponent,
    InicioComponent,
    BuscarEventoComponent,
    ListUsuarioComponent,
    ListComponenteComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatAutocompleteModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
