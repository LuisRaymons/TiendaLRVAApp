export interface CodigoPostalResponde {
    code:   number;
    status: string;
    data:   Datum[];
}

export interface Datum {
    codigopostal:       string;
    colonia:               string;
    codigodemunicipio: string;
    municipio:             string;
    codigodeestado:    string;
    estado:                string;
}
