import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController, NavController } from '@ionic/angular';
import { RespondeGeneral } from 'src/app/interfaces/ayuda/RespondeGeneral';
import { ProductoModel } from 'src/app/interfaces/producto/ProductoModel';
import { ProductoResponde } from 'src/app/interfaces/producto/ProductoResponde';
import { ProductoService } from 'src/app/Recursos/Servicios/producto/producto.service';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.page.html',
  styleUrls: ['./producto.page.scss'],
})
export class ProductoPage implements OnInit {
  public productoModel: ProductoModel[] = [];
  public isModalOpen = false; // modal nuevo cliente
  public isModalOpenEdit = false; // Modal edit cliente
  public apitokenuser?:string = "";

  constructor(public alertController: AlertController,public productoapi:ProductoService, public modalCtrl: ModalController,public navCtrl: NavController) { 
    this.cargarproductos();
  }

  ngOnInit() {
  }

  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }
  setOpenEdit(isOpenEdit: boolean, model?:ProductoModel) {

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

  cargarproductos(){
    this.productoapi.obtenerproductos().then((data:ProductoResponde) =>{
      
      var clientebyone = Object.keys(data.data);
      var client = Object.assign(data.data);
      this.productoModel = [];

      client.forEach((p:ProductoModel) => {
        this.productoModel.push(p);
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
      header: 'Eliminar producto',
      message: '¿Realmente quieres eliminar al producto ' + nombre  + "?",
      buttons: [
        {
          text:"Ok",
          handler: () =>{
            const formData = new FormData();
            let tokeAPi = localStorage.getItem("api_token");
            formData.append('api_token', tokeAPi == null ? '' : tokeAPi);
            formData.append('id', id.toString());
            
            this.productoapi.deleteproducto(formData).then((data:RespondeGeneral) => {
              if(data.code == 200){
                this.productoModel = [];
                this.cargarproductos();
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
