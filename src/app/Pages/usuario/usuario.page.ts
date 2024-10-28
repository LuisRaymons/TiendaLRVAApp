import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController, NavController } from '@ionic/angular';
import { RespondeGeneral } from 'src/app/interfaces/ayuda/RespondeGeneral';
import { UsuarioModel } from 'src/app/interfaces/usuario/UsuarioModel';
import { UsuarioResponde } from 'src/app/interfaces/usuario/UsuarioResponde';
import { UsuarioService } from 'src/app/Recursos/Servicios/usuario/usuario.service';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.page.html',
  styleUrls: ['./usuario.page.scss'],
})
export class UsuarioPage implements OnInit {
  public usuarioModel: UsuarioModel[] = [];
  public isModalOpen = false; // modal nuevo cliente
  public isModalOpenEdit = false; // Modal edit cliente
  public apitokenuser?:string = "";

  constructor(public alertController: AlertController,public usuarioapi:UsuarioService, public modalCtrl: ModalController,public navCtrl: NavController) {
    this.cargarusuarios();
  }

  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }
  setOpenEdit(isOpenEdit: boolean, model?:UsuarioModel) {

    if(isOpenEdit){
      /*
      let cp:any = Number(model?.cp!);
      this.idedit = model?.id!;
      this.nametxtEdit =  model?.nombre!;
      this.lastnametxtEdit = model?.apellidos!;
      this.phonetxtEdit = model?.telefono!;
      this.adresstxtEdit = model?.direccion!;
      this.cptxtEdit = cp; 
      this.imgEditsrc = model?.img!; 
      this.asignarcolonia();
      this.selectitemedit = model?.colonia!;
      */
    }

    this.isModalOpenEdit = isOpenEdit;
  }

  ngOnInit() {
  }

  cargarusuarios(){
    this.usuarioapi.obtenerusuarios().then((data:UsuarioResponde) =>{
      
      var clientebyone = Object.keys(data.data);
      var client = Object.assign(data.data);
      this.usuarioModel = [];

      client.forEach((c:UsuarioModel) => {
        this.usuarioModel.push(c);
      });
      
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

  async deleteclient(id:number,nombre:string){
    const alert = await this.alertController.create({
      header: 'Eliminar usuario',
      message: '¿Realmente quieres eliminar al usuario ' + nombre + "?",
      buttons: [
        {
          text:"Ok",
          handler: () =>{
            const formData = new FormData();
            let tokeAPi = localStorage.getItem("api_token");
            formData.append('api_token', tokeAPi == null ? '' : tokeAPi);
            formData.append('id', id.toString());
            
            this.usuarioapi.deleteusuario(formData).then((data:RespondeGeneral) => {
              if(data.code == 200){
                this.usuarioModel = [];
                this.cargarusuarios();
              }
            }).catch(async (data: any) =>{
              console.log(data);
              const alert = await this.alertController.create({
                header: 'Error al consultar la informacion',
                message: 'Tubimos un error al consultar la informacion de clientes, intente mas tarde o llame al desarrollador',
                buttons: ['OK']
              });
          
              await alert.present(); 
            });
          }
        },
        {
          text:"Cancelar" 
        }
      ]
    });

    await alert.present();
  }

}
