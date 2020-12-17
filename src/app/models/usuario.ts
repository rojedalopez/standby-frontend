import { ClaveValor } from './clavevalor';

export class Usuario{
    public id_usuario:string;
    public nombre: string;
    public apellido: string;
    public fecha_nacimiento:Date;
    public nivel:number;
    public fk_subdominio: ClaveValor;
    public activo:boolean;
    public password: string;
    public v_password: string;
    public celular: string;
    public direccion: string;
    public contacto: string;
    public celularcon: string;
    constructor(){
        this.activo = true;
        this.nivel = null;
        this.fk_subdominio = null;
        this.password = "";
        this.v_password = "";
    }
}

export class UsuarioLogin{
    public id_usuario:string;
    public password:string; 
}