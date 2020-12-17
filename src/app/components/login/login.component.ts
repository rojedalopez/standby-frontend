import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { TOKEN_NAME } from '../../configuration';
import { UsuarioLogin } from '../../models/usuario';
import { LocalStorageService } from '../../services/localstorage/local-storage.service';
import { LoginService } from '../../services/login/login.service';
import { LoadingComponent } from '../tools/loading/loading.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {
  @ViewChild("loading", {static:true})  loadingComponent: LoadingComponent;
  
  constructor(private formBuilder: FormBuilder, private loginService: LoginService, private localStorageService: LocalStorageService, private router: Router) { }

  user: UsuarioLogin = new UsuarioLogin();
  form: FormGroup;
  error:string = "";

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      id_usuario :new FormControl(this.user.id_usuario, [Validators.required]),
      password :new FormControl(this.user.password, [Validators.required])
      }
    )
  }

  login(){
    this.loadingComponent.isVisible = true;
    this.loginService.create(this.user)
    .pipe(
      finalize(()=> this.loadingComponent.isVisible = false) 
    ).subscribe(r => {
      this.localStorageService.set(TOKEN_NAME, r.token);
      this.loadingComponent.isVisible = false;
      let usuario = r.usuario;
      if(usuario.bienvenido || usuario.actualiza)
        this.router.navigate([`/usuario/${usuario.id_usuario}`]);
      else  
        this.router.navigate(['/inicio']);
    }, err => {
      if(err.status === 404){
        this.error = "Valida el usuario o la contraseña con la que deseas ingresar";
      }
    });
  }

}
