export interface ClienteResponse {
    code:   number;
    status: string;
    data:   Data[];
}

export interface Data {
    id:        number;
    nombre:    string;
    apellidos: string;
    telefono:  string;
    img:       string;
    direccion: string;
    cp:        number;
    colonia:   string;
}
