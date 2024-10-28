import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { UsuarioModel } from 'src/app/interfaces/usuario/UsuarioModel';
import { UsuarioResponde } from 'src/app/interfaces/usuario/UsuarioResponde';
import { UsuarioService } from 'src/app/Recursos/Servicios/usuario/usuario.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {
  public nameuser:string = "";
  public imguser:string = "";
  public correouser:string = "";

  constructor(public alertController: AlertController,public usuarioapi:UsuarioService) { 
    this.consultarusuarioprofile();
  }

  ngOnInit() {
  }

  consultarusuarioprofile(){
    
    const iduser = localStorage.getItem("iduser") == undefined ? 0 : localStorage.getItem("iduser")!;

    if(iduser != 0)

    this.usuarioapi.obtenerusuarioprofile(parseInt(iduser)).then((data:UsuarioResponde) =>{
      
      var usuario = Object.assign(data.data);
      console.log("------------datos del login-----------------");
      console.log(usuario[0]);
      console.log(usuario[0].id);
      this.nameuser = usuario[0].name;
      this.imguser = usuario[0].img;
      this.correouser = usuario[0].email;

      
    }).catch(async data =>{
      console.log(data);
      const alert = await this.alertController.create({
        header: 'Error al consultar la informacion',
        message: 'Tubimos un error al consultar la informacion de clientes, intente mas tarde o llame al desarrollador',
        buttons: ['OK']
      });
  
      await alert.present(); 
    });
  }

}
