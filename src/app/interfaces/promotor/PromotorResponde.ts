export interface PromotorResponde {
    code:   number;
    status: string;
    data:   Data[];
}

export interface Data {
    id:        number;
    nombre:    string;
    direccion: string;
    telefono:  string;
    sitioWeb:  string;
    img:       string;
}
