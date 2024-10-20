import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CodigoPostalResponde } from 'src/app/interfaces/ayuda/CodigoPostalResponde';
import { ClienteResponse } from 'src/app/interfaces/cliente/ClienteResponse';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  private apiurl:string = "https://lrvatienda.xyz/api/";

  constructor(public http:HttpClient) { }

  obtenerclientes(){
    let postData = {
      "api_token":localStorage.getItem('api_token')
    }
    
    return new Promise<ClienteResponse>(resolve =>{
      this.http.post<ClienteResponse>(this.apiurl + "cliente/get/all", postData).subscribe((data:ClienteResponse) => {
        resolve(data);
      }, err =>{
        console.log("erro en la peticion");
          console.log(err);
      });
    });
  }

  obtenercolonia(cp:string){
    let postData = {
      "CP":cp
    }
    
    return new Promise<CodigoPostalResponde>(resolve =>{
      this.http.post<CodigoPostalResponde>(this.apiurl + "codigo/postal", postData).subscribe((data:CodigoPostalResponde) => {
        resolve(data);
      }, err =>{
        console.log("erro en la peticion");
          console.log(err);
      });
    });
  }
}
