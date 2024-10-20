export interface LoginResponse {
    code:   number;
    status: string;
    data:   Data;
}

export interface Data {
    id:                number;
    name:              string;
    email:             string;
    email_verified_at?: string;
    img:               string;
    type:              string;
    api_token:         string;
    created_at:        Date;
    updated_at:        Date;
    deleted_at?:        Date;
}
