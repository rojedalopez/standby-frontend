import { Component, EventEmitter, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { debounceTime, finalize, switchMap, tap } from 'rxjs/operators';
import { grupoclave } from 'src/app/configuration';
import { ClaveValor } from 'src/app/models/clavevalor';
import { Componente } from 'src/app/models/componente';
import { Evento } from 'src/app/models/evento';
import { ComponenteService, MasterCacheService } from 'src/app/services';
import { AuthService } from 'src/app/services/auth/auth.service';
import { EventoService } from '../../services/evento/evento.service';
import { ComponenteComponent } from '../componente/componente.component';
import { ErrorComponent } from '../tools/error/error.component';

@Component({
  selector: 'app-evento',
  templateUrl: './evento.component.html',
  styleUrls: ['./evento.component.sass']
})
export class EventoComponent implements OnInit {
  @ViewChild("crearComponente", {static:true})  crearComponente: ComponenteComponent;

  subdominios: ClaveValor[] = [];
  evento: Evento = new Evento();; 
  form: FormGroup;
  selectedFiles: File[];
  componenteCtrl = new FormControl();
  componentes: Componente[];
  isLoading = false;
  id_evento;
  creado:boolean = false;
  error:string="";
  agregar_componente:boolean = true;

  constructor(private eventoService: EventoService, private formBuilder: FormBuilder, 
    private masterCache: MasterCacheService, private componenteService: ComponenteService,
    private authService: AuthService, private route: ActivatedRoute) {
      this.componenteCtrl.valueChanges
      .pipe(
        debounceTime(500),
        tap(() => {
          this.componentes = [];
          this.isLoading = false;
        }),
        switchMap(value => {
          if(value == null || value == undefined || value.length <= 3 )
            return of([]);

          return componenteService.getComponent(value)
            .pipe(
              finalize(() => {
                this.isLoading = false
              }),
            );
          }
        )
      )
      .subscribe(data => {
        if (data == undefined) {
          this.componentes = [];
        } else {
          this.componentes = data;
        }
      });
  }

  ngOnInit(): void {
    this.subdominios = this.masterCache.getListSubdominios();
console.log(this.route.snapshot);
    this.id_evento = this.route.snapshot.paramMap.get("id_evento");
    if(this.id_evento != null){
      this.eventoService.getById(this.id_evento)
      .subscribe((res) => {
        this.evento = res;
        this.agregar_componente = this.evento.componentes.length == 0;
        console.log(res);
      })
    }else{
      this.evento = new Evento();
      let user_info = this.authService.isAutenticate();

      this.evento.fk_subdominio = user_info.subdominio;
      this.evento.usuario = user_info.usuario;
    }

    this.form = this.formBuilder.group(
      { 
        id_evento : new FormControl(this.evento.id_evento),
        nota: new FormControl(this.evento.nota),
        diagnostico: new FormControl(this.evento.diagnostico, [Validators.required, Validators.minLength(20), Validators.maxLength(1500)]),
        solucion: new FormControl(this.evento.solucion, [Validators.required, Validators.minLength(20), Validators.maxLength(1500)]),
        tiposolucion: new FormControl(this.evento.tiposolucion, [Validators.required]),
        incidente: new FormControl(this.evento.incidente),
        error: new FormControl(this.evento.error, [Validators.required, Validators.minLength(20), Validators.maxLength(1500)]),
        hora: new FormControl(this.evento.hora),
        usuario: new FormControl(this.evento.usuario, [Validators.required, Validators.minLength(5), Validators.maxLength(20)]),
        fk_subdominio: new FormControl(this.evento.fk_subdominio, [Validators.required]),
        componentes: new FormControl(this.evento.componentes)
      });
  }


  seleccionar(_evento:Evento){
    this.evento = _evento;
  }
  
  guardar(){
    if(this.form.valid){
      if(this.evento.id_evento != null){
        this.eventoService.update(this.evento).subscribe((r) => {
          console.log(r);
          this.evento.id_evento = r.evento.id_evento;
          this.creado = true;
        }, error => {
          console.log(error);
          this.error = error;
        });
      }else{
        this.eventoService.create(this.evento).subscribe(() => {
          this.limpiar();
          this.creado = true;
        }, error => {
          console.log(error);
          this.error = error;
        });
      }
    }
  }

  selectFiles(event){
    this.selectedFiles = event.target.files;
  }

  uploadFiles(){
    this.eventoService.upload(this.selectedFiles).subscribe((r) =>{
      console.log(r);
    });
  }

  eliminar(evento: Evento){
    let r = confirm('¿esta seguro de eliminar el evento?');
    if(r){
      this.eventoService.delete(evento).subscribe(() => {
        this.eventoService.getAll().subscribe(success => {
          this.limpiar();
        });
      }, error => {
        console.log(error);
      });
    }
  }

  limpiar(){
    this.evento = new Evento();
    this.form.reset();
  }

  obtenerComponentes(){
    this.masterCache.giveCacheClaveValor(grupoclave.tipocomponente, (r) => this.masterCache.setListTipoComponente(r))
    .subscribe(r => {
        console.log("creo el componente");
    })
  }

  compareByOptionId(idFist, idSecond) {
    if(idSecond == null ){
      return true;
    }
    return idFist && idSecond && idFist.id_clavevalor == idSecond.id_clavevalor;
  }

  seleccionarComponente( _componente: Componente) {
    if(this.evento.componentes.filter(c=>c.id_componente===_componente.id_componente).length == 0)
      this.evento.componentes.push(_componente);

    this.componenteCtrl.setValue("");
    this.componentes = [];
  }

}
