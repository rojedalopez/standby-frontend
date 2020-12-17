import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Ambiente, Componente } from '../../models/componente';
import { ClaveValor } from '../../models/clavevalor';
import { ComponenteService, MasterCacheService } from '../../services';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-componente',
  templateUrl: './componente.component.html',
  styleUrls: ['./componente.component.sass']
})
export class ComponenteComponent implements OnInit {

  @Output() creado: EventEmitter<any> = new EventEmitter();
  @Input() min: boolean = false;

  constructor(private componenteService: ComponenteService, private formBuilder: FormBuilder, 
    private masterCache: MasterCacheService, private route: ActivatedRoute, private router: Router) { }
  tipocomponente: ClaveValor[] = [];
  componente: Componente = new Componente(); 
  form: FormGroup;
  ambiente: Ambiente = new Ambiente();
  edita_ambiente:boolean = false;
  index_ambiente: number = -1;
  id_componente: string;

  ngOnInit(): void {
    this.tipocomponente = this.masterCache.getListTipoComponente();

    this.id_componente = this.route.snapshot.paramMap.get("id_componente");

    if(this.id_componente != null){
      this.componenteService.getFindById(this.id_componente)
      .subscribe(res => {
        this.componente = res;
      })
    }

    this.form = this.formBuilder.group(
      { 
        id_componente : new FormControl(this.componente.id_componente),
        nota: new FormControl(this.componente.nota),
        nombre: new FormControl(this.componente.nombre, [Validators.required, Validators.minLength(3), Validators.maxLength(200)]),
        fk_tipocomponente: new FormControl(this.componente.fk_tipocomponente, [Validators.required])
      });
  }

  seleccionar(_componente:Componente){
    this.componente = _componente;
  }
  
  guardar(){
    if(this.form.valid){
      if(this.componente.id_componente != null){
        this.componenteService.update(this.componente).subscribe(() => {
          this.componenteService.getAll().subscribe(success => {
            this.componente = new Componente();
            this.form.reset();
          });
        }, error => {
          console.log(error);
        });
      }else{
        this.componenteService.create(this.componente).subscribe(() => {
          this.componenteService.getAll().subscribe(success => {
            this.componente = new Componente();
            this.form.reset();
          });
        }, error => {
          console.log(error);
        });
      }
    }
  }

  eliminar(componente: Componente){
    let r = confirm('¿esta seguro de eliminar el componente?');
    if(r){
      this.componenteService.delete(componente).subscribe(() => {
        this.componenteService.getAll().subscribe(() => {
          this.limpiar();
        });
      }, error => {
        console.log(error);
      });
    }
  }

  limpiar(){
    this.componente = new Componente();
    this.form.reset();
  }

  quitaAmbiente(_index:number){
    this.componente.ambientes.splice(_index, 1);
  }

  seleccionaAmbiente(_index:number, _ambiente: Ambiente){
    this.ambiente = _ambiente;
    this.edita_ambiente = true;
    this.index_ambiente = _index;
  }

  guardaAmbiente(){
    if(this.edita_ambiente){
      this.editarAmbiente();
    }else{
      this.agregarAmbiente();
    }
  }

  editarAmbiente(){
    this.edita_ambiente = false;
    this.componente.ambientes.splice(this.index_ambiente, 1);
    this.componente.ambientes.push(this.ambiente);
    this.ambiente = new Ambiente();
  }

  agregarAmbiente(){
    this.componente.ambientes.push(this.ambiente);
    this.ambiente = new Ambiente();
  }

  compareByOptionId(idFist, idSecond) {
    if(idSecond == null ){
      return true;
    }
    return idFist && idSecond && idFist.id_clavevalor == idSecond.id_clavevalor;
 }
}
