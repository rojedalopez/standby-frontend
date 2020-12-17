export class GrupoClave{
    public id_grupoclave: Number;
    public nombre: String;
    public activo: boolean;
}

export class ClaveValor{
    public id_clavevalor: Number;
    public fk_grupoclave: GrupoClave;
    public clave: String;
    public valor: String;
}