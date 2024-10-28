export interface ProductoResponde {
    code:   number;
    status: string;
    data:   Data[];
}

export interface Data {
    id:            number;
    nombre:        string;
    descripcion:   string;
    precioPorKilo: string;
    img:           string;
    categoria:     string;
}

