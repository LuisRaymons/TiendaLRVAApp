import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController, NavController } from '@ionic/angular';
import { RespondeGeneral } from 'src/app/interfaces/ayuda/RespondeGeneral';
import { CatergoriaModel } from 'src/app/interfaces/categoria/CategoriaModel';
import { CategoriaResponde } from 'src/app/interfaces/categoria/CategoriaResponde';
import { CategoriaService } from 'src/app/Recursos/Servicios/categoria/categoria.service';

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.page.html',
  styleUrls: ['./categoria.page.scss'],
})
export class CategoriaPage implements OnInit {
  public categoriaModel: CatergoriaModel[] = [];
  public isModalOpen = false; // modal nuevo cliente
  public isModalOpenEdit = false; // Modal edit cliente
  public apitokenuser?:string = "";

  constructor(public alertController: AlertController,public categoriaapi:CategoriaService, public modalCtrl: ModalController,public navCtrl: NavController) { 
    this.cargarcategoria();
    
    
  }

  ngOnInit() {
  }

  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }
  setOpenEdit(isOpenEdit: boolean, model?:CatergoriaModel) {

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

  cargarcategoria(){
    this.categoriaapi.obtenercategorias().then((data:CategoriaResponde) =>{
      
      var clientebyone = Object.keys(data.data);
      var client = Object.assign(data.data);
      this.categoriaModel = [];

      client.forEach((c:CatergoriaModel) => {
        this.categoriaModel.push(c);
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
      header: 'Eliminar categoria',
      message: '¿Realmente quieres eliminar la categoria ' + nombre  + "?",
      buttons: [
        {
          text:"Ok",
          handler: () =>{
            const formData = new FormData();
            let tokeAPi = localStorage.getItem("api_token");
            formData.append('api_token', tokeAPi == null ? '' : tokeAPi);
            formData.append('id', id.toString());
            
            this.categoriaapi.deletecategoria(formData).then((data:RespondeGeneral) => {
              if(data.code == 200){
                this.categoriaModel = [];
                this.cargarcategoria();
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
