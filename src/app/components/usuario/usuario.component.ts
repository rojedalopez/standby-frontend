import { Component, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LocalStorageService } from '../../services/localstorage/local-storage.service';
import { ClaveValor } from '../../models/clavevalor';
import { Usuario } from '../../models/usuario';
import { MasterCacheService, UsuarioService } from '../../services';
import { AuthService } from 'src/app/services/auth/auth.service';
import { LoadingComponent } from '../tools/loading/loading.component';
import { finalize } from 'rxjs/operators';


@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.sass']
})
export class UsuarioComponent implements OnInit {
  @ViewChild("loading", {static:true})  loadingComponent: LoadingComponent;

  constructor(private usuarioService: UsuarioService, private formBuilder: FormBuilder, 
    private masterCache: MasterCacheService, private route: ActivatedRoute, private router: Router,
    private authService: AuthService) {}

  niveles = [
    {codigo: 1, etiqueta: "Analista"},
    {codigo: 2, etiqueta: "Lider componente menor"},
    {codigo: 3, etiqueta: "Lider componente mayor"}
  ];
  fk_subdominio: ClaveValor[];
  usuario:Usuario = new Usuario();
  form: FormGroup;
  id_usuario:string;
  editar:boolean = false;
  actualiza:boolean = false;
  bienvenido:boolean = false;
  completado:boolean = false;
  creado: boolean = false;
  error:string = "";
  info_user: any;

  ngOnInit(): void {
    this.fk_subdominio = this.masterCache.getListSubdominios();

    this.id_usuario = this.route.snapshot.paramMap.get("id_usuario");
    this.info_user = this.authService.isAutenticate();
    if(this.id_usuario != null){
      if(this.info_user.nivel == 1)
        this.cargarUsuario(this.info_user.usuario);
      else
        this.cargarUsuario(this.id_usuario);
    }else{
      if(this.route.snapshot.fragment === 'crear' && this.info_user.nivel != 1){
        this.usuario = new Usuario();
        this.editar = false;
        this.actualiza = false;
        this.bienvenido = false;
        this.id_usuario = null;
      }else{
        this.router.navigate(['/inicio']);
      }
      
    }
    
    this.form = this.formBuilder.group(
      { 
        id_usuario : new FormControl(this.usuario.id_usuario, [Validators.required, Validators.minLength(3), Validators.maxLength(50)]),
        nombre: new FormControl(this.usuario.nombre, [Validators.required, Validators.minLength(3), Validators.maxLength(200)]),
        apellido: new FormControl(this.usuario.apellido, [Validators.required, Validators.minLength(3), Validators.maxLength(200)]),
        nivel: new FormControl(this.usuario.nivel, [Validators.required]),
        fecha_nacimiento: new FormControl(this.usuario.fecha_nacimiento),
        fk_subdominio: new FormControl(this.usuario.fk_subdominio),
        activo: new FormControl(this.usuario.activo),
        password: new FormControl(this.usuario.password),
        v_password: new FormControl(this.usuario.v_password),
        direccion: new FormControl(this.usuario.direccion),
        celular: new FormControl(this.usuario.celular),
        contacto: new FormControl(this.usuario.contacto),
        celularcon: new FormControl(this.usuario.celularcon)
      });
  }

  cargarUsuario(_usuario: string){
    this.loadingComponent.isVisible = true;
    this.usuarioService.getById(_usuario)
    .pipe(
      finalize(()=> this.loadingComponent.isVisible = false) 
    ).subscribe((res) => {
        this.usuario = res;
        this.editar = true;
        this.actualiza = this.route.snapshot.fragment === 'actualiza';
        this.bienvenido = this.route.snapshot.fragment === 'bienvenido';
        this.error = "";
      });
  }

  seleccionar(_usuario:Usuario){
    this.usuario = _usuario;
  }
  
  validar(){
    this.loadingComponent.isVisible = true;
    this.usuarioService.getById(this.usuario.id_usuario)
    .pipe(
      finalize(()=> this.loadingComponent.isVisible = false) 
    ).subscribe((res) => {
      this.error = "El usuario que intenta ingresar ya existe";
      this.form.reset();
      this.usuario = new Usuario();
    }, (err) => {
      if(err.status === 404){
        this.error = "";
      }
    });
  }

  guardar(){
    this.loadingComponent.isVisible = true;
    if(this.form.valid){
      if(this.editar){
        this.usuarioService.update(this.usuario)
        .pipe(
          finalize(()=> this.loadingComponent.isVisible = false) 
        ).subscribe(() => {
          this.completado = true;
          this.error = "";
        }, error => {
          console.log(error);
        });
      }else{
        this.usuarioService.create(this.usuario)
        .pipe(
          finalize(()=> this.loadingComponent.isVisible = false) 
        ).subscribe(() => {
          this.creado = true;
          this.form.reset();
          this.usuario = new Usuario();
          this.error = "";
        }, error => {
          console.log(error);
        });
      }
    }
  }

  actualizar(){
    if(this.form.valid){
      if(this.usuario.id_usuario != null){
        this.usuarioService.updateInfo(this.usuario).subscribe((res) => {
          this.authService.removeSession();
          this.router.navigate(["/inicio"]);
        }, error => {
          console.log(error);
        });
      }
    }
  }

  eliminar(usuario: Usuario){
    let r = confirm('¿esta seguro de eliminar el evento?');
    if(r){
      this.usuarioService.delete(usuario).subscribe(() => {
        this.usuarioService.getAll().subscribe(success => {
          this.limpiar();
        });
      }, error => {
        console.log(error);
      });
    }
  }

  limpiar(){
    this.form.reset();
    this.usuario = new Usuario();
  }

  compareByOptionId(idFist, idSecond) {
    if(idSecond == null ){
      return true;
    }
    return idFist && idSecond && idFist.id_clavevalor == idSecond.id_clavevalor;
 }

 compareByOptionId2(idFist, idSecond) {
  if(idSecond == null ){
    return true;
  }
  return idFist && idSecond && idFist == idSecond;
}

}
