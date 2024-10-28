import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ResolveEnd } from '@angular/router';
import { RespondeGeneral } from 'src/app/interfaces/ayuda/RespondeGeneral';
import { PromotorResponde } from 'src/app/interfaces/promotor/PromotorResponde';

@Injectable({
  providedIn: 'root'
})
export class PromotorService {
  private apiurl:string = "https://lrvatienda.xyz/api/";

  constructor(public http:HttpClient) { }

  obtenerpromotor(){
    let postData = {
      "api_token":localStorage.getItem('api_token')
    }
    
    return new Promise<PromotorResponde>(resolve =>{
      this.http.post<PromotorResponde>(this.apiurl + "promotor/get/all", postData).subscribe((data:PromotorResponde) => {
        resolve(data);
      }, err =>{
        console.log("erro en la peticion");
          console.log(err);
      });
    });
  }
  agregarpromotor(datospost:FormData){
    return new Promise<RespondeGeneral>(resolve =>{
      this.http.post<RespondeGeneral>(this.apiurl + "promotor/add",datospost).subscribe((data:RespondeGeneral) => {
        console.log(data);
        resolve(data);
      }, err =>{
        console.log("erro en la peticion");
        console.log(err);
      });
      
    });
    
  }
  editarpromotor(datospost:FormData){
    return new Promise<RespondeGeneral>(resolve =>{
      this.http.post<RespondeGeneral>(this.apiurl + "promotor/update",datospost).subscribe((data:RespondeGeneral) => {
        console.log(data);
        resolve(data);
      }, err =>{
        console.log("erro en la peticion");
        console.log(err);
      });
      
    });
    
  }
  deletepromotor(datos:FormData){
    return new Promise<RespondeGeneral>(resolve =>{
      this.http.post<RespondeGeneral>(this.apiurl + "promotor/delete",datos).subscribe((data:RespondeGeneral) => {
        console.log(data);
        resolve(data);
      }, err =>{
        console.log("erro en la peticion");
        console.log(err);
      });
      
    });
  }
}
