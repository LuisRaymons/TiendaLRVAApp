import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ResolveEnd } from '@angular/router';
import { RespondeGeneral } from 'src/app/interfaces/ayuda/RespondeGeneral';
import { CategoriaResponde } from 'src/app/interfaces/categoria/CategoriaResponde';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {
  private apiurl:string = "https://lrvatienda.xyz/api/";

  constructor(public http:HttpClient) { }

  obtenercategorias(){
    let postData = {
      "api_token":localStorage.getItem('api_token')
    }
    
    return new Promise<CategoriaResponde>(resolve =>{
      this.http.post<CategoriaResponde>(this.apiurl + "categoria/producto/get", postData).subscribe((data:CategoriaResponde) => {
        resolve(data);
      }, err =>{
        console.log("erro en la peticion");
          console.log(err);
      });
    });
  }
  agregarcategoria(datospost:FormData){
    return new Promise<RespondeGeneral>(resolve =>{
      this.http.post<RespondeGeneral>(this.apiurl + "categoria/add",datospost).subscribe((data:RespondeGeneral) => {
        console.log(data);
        resolve(data);
      }, err =>{
        console.log("erro en la peticion");
        console.log(err);
      });
      
    });
    
  }
  editarcategoria(datospost:FormData){
    return new Promise<RespondeGeneral>(resolve =>{
      this.http.post<RespondeGeneral>(this.apiurl + "categoria/update",datospost).subscribe((data:RespondeGeneral) => {
        console.log(data);
        resolve(data);
      }, err =>{
        console.log("erro en la peticion");
        console.log(err);
      });
      
    });
    
  }
  deletecategoria(datos:FormData){
    return new Promise<RespondeGeneral>(resolve =>{
      this.http.post<RespondeGeneral>(this.apiurl + "categoria/delete",datos).subscribe((data:RespondeGeneral) => {
        console.log(data);
        resolve(data);
      }, err =>{
        console.log("erro en la peticion");
        console.log(err);
      });
      
    });
  }
}
