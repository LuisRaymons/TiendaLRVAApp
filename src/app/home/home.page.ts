import { Component } from '@angular/core';
import { addIcons } from 'ionicons';
import { eye, lockClosed, people } from 'ionicons/icons';
import { AlertController, NavController } from '@ionic/angular';
import { LoginService } from '../Recursos/Servicios/login/login.service';
import { LoginResponse } from '../interfaces/login/LoginResponse';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  emailtxt:any;
  passwordtxt:any;

  constructor(public alertController: AlertController, public navCtrl: NavController, public apilogin:LoginService) {
    addIcons({people,lockClosed,eye});
  }

  async loginfunction(){

    if(this.emailtxt != null && this.passwordtxt != ''){
      this.apilogin.obtenersession(this.emailtxt,this.passwordtxt).then(async (data:LoginResponse)=>{

        const nombre = data.data.name;
        const tipouser = data.data.type;
        const tokenuser = data.data.api_token;
        const iduser = data.data.id;
  
        if(nombre != null && tipouser != null && tokenuser != null){
          localStorage.setItem("api_token",tokenuser);
          localStorage.setItem("iduser",iduser.toString());
          this.navCtrl.navigateForward('/principal');
        } else{
          const alert = await this.alertController.create({
            header: 'Alert',
            subHeader: 'Subtitle',
            message: 'This is an alert message.',
            buttons: ['OK']
          });
      
          await alert.present(); 
        }
      }). catch(async data =>{
        const alert = await this.alertController.create({
          header: 'Usuario no encontrado',
          message: 'El correo y/o la contraseña no son correctos intente con otras credenciales',
          buttons: ['OK']
        });
    
        await alert.present(); 
      });
    } else{
      const alert = await this.alertController.create({
        header: 'Campos Vacios',
        message: 'Asegurate que los campos de correo y contraseña tengan tus datos',
        buttons: ['OK']
      });
  
      await alert.present(); 
    }

  }

}
