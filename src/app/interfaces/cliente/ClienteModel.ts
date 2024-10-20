export interface ClienteModel{
    id:        number;
    nombre:    string;
    apellidos: string;
    telefono?:  string;
    img?:       string;
    direccion?: string;
    cp?:        number;
    colonia?:   string;
}