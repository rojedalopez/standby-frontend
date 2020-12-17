import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { debounceTime, finalize, map, startWith, switchMap, tap } from 'rxjs/operators';
import { Componente } from 'src/app/models/componente';
import { Evento } from 'src/app/models/evento';
import { ComponenteService, EventoService } from 'src/app/services';
import { LoadingComponent } from '../tools/loading/loading.component';

@Component({
  selector: 'app-buscar-evento',
  templateUrl: './buscar-evento.component.html',
  styleUrls: ['./buscar-evento.component.sass']
})
export class BuscarEventoComponent implements OnInit {
  @ViewChild("loading", {static:true})  loadingComponent: LoadingComponent;

  componenteCtrl = new FormControl();
  componentes: Componente[];
  isLoading = false;
  errorMsg: string;
  componente: Componente;
  list: Evento[];

  
  constructor(private componenteService: ComponenteService, private eventoService: EventoService) {
    this.componenteCtrl.valueChanges
    .pipe(
      debounceTime(500),
      tap(() => {
        this.componentes = [];
        this.isLoading = false;
      }),
      switchMap(value => componenteService.getComponent(value)
        .pipe(
          finalize(() => {
            this.isLoading = false
          }),
        )
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
  }

  seleccionar( _componente: Componente) {
    this.componente = _componente;
  }

  buscar(){
    if(this.componente !== null && this.componente !== undefined){
      this.loadingComponent.isVisible = true;
      this.eventoService.getByComponente(this.componente.id_componente)
      .pipe(
        finalize(()=> this.loadingComponent.isVisible = false) 
      )
      .subscribe((res)=> {
        this.list = res;
      });
    }
  }

  ver(evento:Evento){
    window.open("/#/evento/"+evento.id_evento, "_blank");
  }

}
