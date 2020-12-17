import { ClaveValor } from './clavevalor';
import { Componente } from './componente';

export class Evento{
    public id_evento: Number;
    public titulo: String;
    public nota: String;
    public hora: Date;
    public usuario:String;
    public fk_subdominio:ClaveValor;
    public error: String;
    public incidente:String;
    public diagnostico:String;
    public solucion:String;
    public tiposolucion:String;
    public componentes: Componente[];

    constructor(){
        this.fk_subdominio = null;
        this.tiposolucion = "Definitiva";
        this.componentes = [];
    }
}