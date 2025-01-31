import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ResolveEnd } from '@angular/router';
import { CodigoPostalResponde } from 'src/app/interfaces/ayuda/CodigoPostalResponde';
import { RespondeGeneral } from 'src/app/interfaces/ayuda/RespondeGeneral';
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
  agregarcliente(datospost:FormData){
    return new Promise<RespondeGeneral>(resolve =>{
      this.http.post<RespondeGeneral>(this.apiurl + "cliente/add",datospost).subscribe((data:RespondeGeneral) => {
        console.log(data);
        resolve(data);
      }, err =>{
        console.log("erro en la peticion");
        console.log(err);
      });
      
    });
    
  }
  editarcliente(datospost:FormData){
    return new Promise<RespondeGeneral>(resolve =>{
      this.http.post<RespondeGeneral>(this.apiurl + "cliente/update",datospost).subscribe((data:RespondeGeneral) => {
        console.log(data);
        resolve(data);
      }, err =>{
        console.log("erro en la peticion");
        console.log(err);
      });
      
    });
    
  }
  deleteclient(datos:FormData){
    return new Promise<RespondeGeneral>(resolve =>{
      this.http.post<RespondeGeneral>(this.apiurl + "cliente/delete",datos).subscribe((data:RespondeGeneral) => {
        console.log(data);
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
