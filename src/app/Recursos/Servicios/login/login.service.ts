import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginResponse } from 'src/app/interfaces/login/LoginResponse';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private apiurl:string = "https://lrvatienda.xyz/api/";

  constructor(public http:HttpClient) { }

  obtenersession(correo:string,password:string){

    let postData = {
      "email":correo,
      "password":password
    }
    
    return new Promise<LoginResponse>(resolve =>{
      this.http.post<LoginResponse>(this.apiurl + "login", postData).subscribe((data:LoginResponse) => {
        resolve(data);
      }, err =>{
        console.log("erro en la peticion");
          console.log(err);
      });
    });
  }
}
