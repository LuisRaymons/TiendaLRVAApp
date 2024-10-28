import { Component, OnInit, } from '@angular/core';
import { FormControl, FormGroup, Validators,ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AlertController, ModalController, NavController } from '@ionic/angular';
import { CodigoPostalModel } from 'src/app/interfaces/ayuda/CodigoPostalModel';
import { CodigoPostalResponde } from 'src/app/interfaces/ayuda/CodigoPostalResponde';
import { ClienteModel } from 'src/app/interfaces/cliente/ClienteModel';
import { ClienteResponse } from 'src/app/interfaces/cliente/ClienteResponse';
import { ClienteService } from 'src/app/Recursos/Servicios/cliente/cliente.service';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import '@ionic/pwa-elements';
import { defineCustomElements } from '@ionic/pwa-elements/loader';
import { Plugins } from '@capacitor/core';
import { RespondeGeneral } from 'src/app/interfaces/ayuda/RespondeGeneral';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.page.html',
  styleUrls: ['./cliente.page.scss'],
})
export class ClientePage implements OnInit {
  public clientesModel: ClienteModel[] = [];
  public coloniasSelectoption:CodigoPostalModel[] = [];
  public isModalOpen = false; // modal nuevo cliente
  public isModalOpenEdit = false; // Modal edit cliente
  public apitokenuser?:string = "";
  public nametxt:string = "";
  public lastnametxt:string = "";
  public phonetxt:string = "";
  public adresstxt:string = "";
  public imgtxt:string = "";
  public cptxt:string = "";
  public coloniasSelect:string = ""; 
  public estadoclientetxt:string="";
  public municipioclientetxt:string="";
  public nametxtEdit:string = "";
  public lastnametxtEdit:string = "";
  public phonetxtEdit:string = "";
  public adresstxtEdit:string = "";
  public imgtxtEdit:string = "";
  public cptxtEdit:string = "";
  public coloniasSelectEdit:string = ""; 
  public estadoclientetxtEdit:string="";
  public municipioclientetxtEdit:string="";
  public selectitemedit:string = "";
  public imgEditsrc:string = "";
  public searchTerm: string = '';
  public searching: any = false;
  public urlimgadd:string = "";
  public file: any;
  public idedit = 0;
  

  constructor(public alertController: AlertController,public clienteapi:ClienteService, public modalCtrl: ModalController,public navCtrl: NavController) { 
    this.cargarclientes();
  }

  ngOnInit() {
  }

  onSearchInput(){
    this.searching = true;
  }

  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }
  setOpenEdit(isOpenEdit: boolean, model?:ClienteModel) {

    if(isOpenEdit){
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
    }

    this.isModalOpenEdit = isOpenEdit;
  }

  asignarcolonia(){
    this.coloniasSelectoption = [];
    this.estadoclientetxt = "";
    this.municipioclientetxt= "";

    this.clienteapi.obtenercolonia(this.cptxtEdit).then((data:CodigoPostalResponde) =>{
      var CP = Object.assign(data.data);

      CP.forEach((cp:CodigoPostalModel) => {
        this.coloniasSelectoption.push(cp);
        this.estadoclientetxtEdit = cp.estado;
        this.municipioclientetxtEdit= cp.municipio;
      });

    }).catch(async data =>{
      console.log(data);
      const alert = await this.alertController.create({
        header: 'Error al consultar la informacion',
        message: 'Tubimos un error al consultar la informacion del codigo postal, intente mas tarde o llame al desarrollador',
        buttons: ['OK']
      });

      await alert.present(); 
    });
  }

  buscarcolonia(){
    //Vaciar arreglo de colonias
    this.coloniasSelectoption = [];
    this.estadoclientetxt = "";
    this.municipioclientetxt= "";

    this.clienteapi.obtenercolonia(this.cptxt).then((data:CodigoPostalResponde) =>{
      var CP = Object.assign(data.data);

      CP.forEach((cp:CodigoPostalModel) => {
        this.coloniasSelectoption.push(cp);
        this.estadoclientetxt = cp.estado;
        this.municipioclientetxt= cp.municipio;
      });

    }).catch(async data =>{
      console.log(data);
      const alert = await this.alertController.create({
        header: 'Error al consultar la informacion',
        message: 'Tubimos un error al consultar la informacion del codigo postal, intente mas tarde o llame al desarrollador',
        buttons: ['OK']
      });

      await alert.present(); 
    });
    

  }

  cargarclientes(){
    this.clienteapi.obtenerclientes().then((data:ClienteResponse) =>{
      
      var clientebyone = Object.keys(data.data);
      var client = Object.assign(data.data);
      this.clientesModel = [];

      client.forEach((c:ClienteModel) => {
        this.clientesModel.push(c);
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

  async addcliente(){

    if(this.nametxt != ""&& this.lastnametxt != "" && this.phonetxt != "" && this.adresstxt != ""){
      const formData = new FormData();
      let tokeAPi = localStorage.getItem("api_token");
      formData.append('img', this.urlimgadd);
      formData.append('api_token', tokeAPi == null ? '' : tokeAPi);
      formData.append('name', this.nametxt);
      formData.append('lastname', this.lastnametxt);
      formData.append('phone', this.phonetxt);
      formData.append('address', this.adresstxt);
      formData.append('cp', this.cptxt);
      formData.append('colonia', this.coloniasSelect);
      formData.append('municipio', this.municipioclientetxt);
      formData.append('estado', this.estadoclientetxt);
      
      this.clienteapi.agregarcliente(formData).then( async data =>{

        if(data.code == 200){
          this.nametxt = "";
          this.lastnametxt = "";
          this.phonetxt = "";
          this.adresstxt = "";
          this.cptxt = "";
          this.municipioclientetxt = "";
          this.estadoclientetxt = "";
          this.coloniasSelect = "";
          this.coloniasSelectoption = [];

          this.isModalOpen = false;
          this.cargarclientes();
        }

        const alert = await this.alertController.create({
          header: 'Respuesta para el cliente nuevo',
          message: data.msm,
          buttons: ['Aceptar']
        });
        await alert.present(); 
      });

    } else{
      const alert = await this.alertController.create({
        header: 'Campos incompletos',
        message: 'Revisan alguno de los campos marcados por (*) deben ser completados',
        buttons: ['Aceptar']
      });

      await alert.present(); 
    }
    
  }

  async updatecliente(){

    if(this.nametxtEdit != ""&& this.lastnametxtEdit != "" && this.phonetxtEdit != "" && this.adresstxtEdit != ""){
      const formData = new FormData();
      let tokeAPi = localStorage.getItem("api_token");
      formData.append('id',this.idedit.toString());
      formData.append('img', this.urlimgadd == "" ? '' : this.urlimgadd);
      formData.append('api_token', tokeAPi == null ? '' : tokeAPi);
      formData.append('name', this.nametxtEdit);
      formData.append('lastname', this.lastnametxtEdit);
      formData.append('phone', this.phonetxtEdit);
      formData.append('address', this.adresstxtEdit);
      formData.append('cp', this.cptxtEdit);
      formData.append('colonia', this.coloniasSelectEdit == "" ? this.selectitemedit : this.coloniasSelectEdit);
      formData.append('municipio', this.municipioclientetxtEdit);
      formData.append('estado', this.estadoclientetxtEdit);
      
      this.clienteapi.editarcliente(formData).then( async data =>{

        if(data.code == 200){
          this.isModalOpenEdit = false;
          this.cargarclientes();
        }

        const alert = await this.alertController.create({
          header: 'Respuesta para el cliente modificado',
          message: data.msm,
          buttons: ['Aceptar']
        });
        await alert.present(); 
      });

    } else{
      const alert = await this.alertController.create({
        header: 'Campos incompletos',
        message: 'Revisan alguno de los campos marcados por (*) deben ser completados',
        buttons: ['Aceptar']
      });

      await alert.present(); 
    }
    
  }

  async deleteclient(id:number,nombre:string,apellidos:string){
    const alert = await this.alertController.create({
      header: 'Eliminar cliente',
      message: '¿Realmente quieres eliminar al cliente ' + nombre + " " + apellidos + "?",
      buttons: [
        {
          text:"Ok",
          handler: () =>{
            const formData = new FormData();
            let tokeAPi = localStorage.getItem("api_token");
            formData.append('api_token', tokeAPi == null ? '' : tokeAPi);
            formData.append('id', id.toString());
            
            this.clienteapi.deleteclient(formData).then((data:RespondeGeneral) => {
              if(data.code == 200){
                this.clientesModel = [];
                this.cargarclientes();
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

  async buscarcliente(algo: any){
    const query = algo.target.value.toLowerCase();
    this.clientesModel =  this.clientesModel.filter((d) => d.nombre.toLowerCase().indexOf(query) > -1);
  }

  tomarfoto = async () => {
    const ph = await Plugins['Camera']['getPhoto']({
      quality: 100,
      allowEditing: true,
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Camera
    });

    this.urlimgadd = ph.dataUrl;
  };

  seleccionarfoto = async () => {
    const ph = await Plugins['Camera']['getPhoto']({
      quality: 100,
      allowEditing: true,
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Photos
    });

    this.urlimgadd = ph.dataUrl;// + ph.format;
  }
  

}
