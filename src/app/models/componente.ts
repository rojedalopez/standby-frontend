import { ClaveValor } from './clavevalor';

export class Componente{
    public id_componente: Number;
    public nombre: String;
    public ambientes: Ambiente[];
    public fk_tipocomponente: ClaveValor;
    public nota: String;
    constructor(){
        this.fk_tipocomponente = null;
        this.ambientes = [];
    }
}

export class Ambiente{
    public nombre: string;
    public ubicacion: string;

}