import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController, NavController } from '@ionic/angular';
import { RespondeGeneral } from 'src/app/interfaces/ayuda/RespondeGeneral';
import { PromotorModel } from 'src/app/interfaces/promotor/PromotorModel';
import { PromotorResponde } from 'src/app/interfaces/promotor/PromotorResponde';
import { PromotorService } from 'src/app/Recursos/Servicios/promotor/promotor.service';

@Component({
  selector: 'app-promotor',
  templateUrl: './promotor.page.html',
  styleUrls: ['./promotor.page.scss'],
})
export class PromotorPage implements OnInit {
  public promotorModel: PromotorModel[] = [];
  public isModalOpen = false; // modal nuevo cliente
  public isModalOpenEdit = false; // Modal edit cliente
  public apitokenuser?:string = "";

  constructor(public alertController: AlertController,public promotorapi:PromotorService, public modalCtrl: ModalController,public navCtrl: NavController) { 
    this.cargarpromotor();
  }

  ngOnInit() {
  }

  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }
  setOpenEdit(isOpenEdit: boolean, model?:PromotorModel) {

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

  cargarpromotor(){
    this.promotorapi.obtenerpromotor().then((data:PromotorResponde) =>{
      
      var clientebyone = Object.keys(data.data);
      var client = Object.assign(data.data);
      this.promotorModel = [];

      client.forEach((p:PromotorModel) => {
        this.promotorModel.push(p);
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
      header: 'Eliminar promotor',
      message: '¿Realmente quieres eliminar al promotor ' + nombre + "?",
      buttons: [
        {
          text:"Ok",
          handler: () =>{
            const formData = new FormData();
            let tokeAPi = localStorage.getItem("api_token");
            formData.append('api_token', tokeAPi == null ? '' : tokeAPi);
            formData.append('id', id.toString());
            
            this.promotorapi.deletepromotor(formData).then((data:RespondeGeneral) => {
              if(data.code == 200){
                this.promotorModel = [];
                this.cargarpromotor();
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
