import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { Componente } from 'src/app/models/componente';
import { Usuario } from 'src/app/models/usuario';
import { ComponenteService } from 'src/app/services';
import { AuthService } from 'src/app/services/auth/auth.service';
import { LoadingComponent } from '../tools/loading/loading.component';

@Component({
  selector: 'app-list-componente',
  templateUrl: './list-componente.component.html',
  styleUrls: ['./list-componente.component.sass']
})
export class ListComponenteComponent implements OnInit {
  @ViewChild("loading", {static:true})  loadingComponent: LoadingComponent;
  
  busquedaCtrl: FormControl = new FormControl();
  list: Componente[];
  componente:Componente;

  constructor(private componenteService: ComponenteService, private authService: AuthService, 
    private router: Router) { }

  ngOnInit(): void {
    this.buscar();
  }

  buscar(){
    this.componenteService.getAll()
    .pipe(
      finalize(()=> this.loadingComponent.isVisible = false) 
    ).subscribe((res)=> {
      this.list = res;
    });
  }

  ver(_componente:Componente){
    window.open("/#/componente/"+_componente.id_componente, "_blank");
  }
  
  seleccionar(_componente:Componente){
    this.componente = _componente;
  }

}
