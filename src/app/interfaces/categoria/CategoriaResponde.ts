export interface CategoriaResponde{
    code:   number;
    status: string;
    data:   Data[];
}

export interface Data {
    id:     number;
    nombre: string;
}
