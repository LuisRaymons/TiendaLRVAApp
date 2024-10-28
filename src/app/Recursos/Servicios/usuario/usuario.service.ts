import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ResolveEnd } from '@angular/router';
import { RespondeGeneral } from 'src/app/interfaces/ayuda/RespondeGeneral';
import { UsuarioResponde } from 'src/app/interfaces/usuario/UsuarioResponde';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private apiurl:string = "https://lrvatienda.xyz/api/";

  constructor(public http:HttpClient) { }

  obtenerusuarios(){
    let postData = {
      "api_token":localStorage.getItem('api_token')
    }
    
    return new Promise<UsuarioResponde>(resolve =>{
      this.http.post<UsuarioResponde>(this.apiurl + "usuario/get", postData).subscribe((data:UsuarioResponde) => {
        resolve(data);
      }, err =>{
        console.log("erro en la peticion");
          console.log(err);
      });
    });
  }
  obtenerusuarioprofile(id:number){
    let postData = {
      "api_token":localStorage.getItem('api_token'),
      "id":id
    }
    
    return new Promise<UsuarioResponde>(resolve =>{
      this.http.post<UsuarioResponde>(this.apiurl + "usuario/get/one", postData).subscribe((data:UsuarioResponde) => {
        resolve(data);
      }, err =>{
        console.log("erro en la peticion");
          console.log(err);
      });
    });
  }
  agregarusuario(datospost:FormData){
    return new Promise<RespondeGeneral>(resolve =>{
      this.http.post<RespondeGeneral>(this.apiurl + "usuario/add",datospost).subscribe((data:RespondeGeneral) => {
        console.log(data);
        resolve(data);
      }, err =>{
        console.log("erro en la peticion");
        console.log(err);
      });
      
    });
    
  }
  editarusuario(datospost:FormData){
    return new Promise<RespondeGeneral>(resolve =>{
      this.http.post<RespondeGeneral>(this.apiurl + "usuario/update",datospost).subscribe((data:RespondeGeneral) => {
        console.log(data);
        resolve(data);
      }, err =>{
        console.log("erro en la peticion");
        console.log(err);
      });
      
    });
    
  }
  deleteusuario(datos:FormData){
    return new Promise<RespondeGeneral>(resolve =>{
      this.http.post<RespondeGeneral>(this.apiurl + "usuario/delete",datos).subscribe((data:RespondeGeneral) => {
        console.log(data);
        resolve(data);
      }, err =>{
        console.log("erro en la peticion");
        console.log(err);
      });
      
    });
  }
}
