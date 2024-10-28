export interface UsuarioResponde {
    code:   number;
    status: string;
    data:   Data[];
}

export interface Data {
    id:        number;
    name:      string;
    email:     string;
    type:      string;
    img:       string;
    api_token: string;
}
