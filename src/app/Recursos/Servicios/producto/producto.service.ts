import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ResolveEnd } from '@angular/router';
import { RespondeGeneral } from 'src/app/interfaces/ayuda/RespondeGeneral';
import { ProductoResponde } from 'src/app/interfaces/producto/ProductoResponde';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  private apiurl:string = "https://lrvatienda.xyz/api/";

  constructor(public http:HttpClient) { }

  obtenerproductos(){
    let postData = {
      "api_token":localStorage.getItem('api_token')
    }
    
    return new Promise<ProductoResponde>(resolve =>{
      this.http.post<ProductoResponde>(this.apiurl + "producto/get/all", postData).subscribe((data:ProductoResponde) => {
        resolve(data);
      }, err =>{
        console.log("erro en la peticion");
          console.log(err);
      });
    });
  }
  agregarproducto(datospost:FormData){
    return new Promise<RespondeGeneral>(resolve =>{
      this.http.post<RespondeGeneral>(this.apiurl + "producto/add",datospost).subscribe((data:RespondeGeneral) => {
        console.log(data);
        resolve(data);
      }, err =>{
        console.log("erro en la peticion");
        console.log(err);
      });
      
    });
    
  }
  editarproducto(datospost:FormData){
    return new Promise<RespondeGeneral>(resolve =>{
      this.http.post<RespondeGeneral>(this.apiurl + "producto/update",datospost).subscribe((data:RespondeGeneral) => {
        console.log(data);
        resolve(data);
      }, err =>{
        console.log("erro en la peticion");
        console.log(err);
      });
      
    });
    
  }
  deleteproducto(datos:FormData){
    return new Promise<RespondeGeneral>(resolve =>{
      this.http.post<RespondeGeneral>(this.apiurl + "producto/delete",datos).subscribe((data:RespondeGeneral) => {
        console.log(data);
        resolve(data);
      }, err =>{
        console.log("erro en la peticion");
        console.log(err);
      });
      
    });
  }
}
