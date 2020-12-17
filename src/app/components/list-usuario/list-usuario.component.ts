import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { Usuario } from 'src/app/models/usuario';
import { UsuarioService } from 'src/app/services';
import { AuthService } from 'src/app/services/auth/auth.service';
import { LoadingComponent } from '../tools/loading/loading.component';

@Component({
  selector: 'app-list-usuario',
  templateUrl: './list-usuario.component.html',
  styleUrls: ['./list-usuario.component.sass']
})
export class ListUsuarioComponent implements OnInit {
  @ViewChild("loading", {static:true})  loadingComponent: LoadingComponent;
  
  busquedaCtrl: FormControl = new FormControl();
  list: Usuario[];

  constructor(private usuarioService: UsuarioService, private authService: AuthService, 
    private router: Router) { }

  ngOnInit(): void {
    let auth_info = this.authService.isAutenticate();
    if(auth_info.nivel == 1){
      this.router.navigate(['/inicio']);
    }else{
      this.buscar();
    }
  }

  buscar(){
    this.usuarioService.getAll()
    .pipe(
      finalize(()=> this.loadingComponent.isVisible = false) 
    )
    .subscribe((res)=> {
      this.list = res;
    });
  }

  ver(usuario:Usuario){
    window.open("/#/usuario/"+usuario.id_usuario, "_blank");
  }

}
