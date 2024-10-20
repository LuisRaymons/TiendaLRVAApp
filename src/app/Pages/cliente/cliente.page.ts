import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators,ReactiveFormsModule } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { count } from 'rxjs';
import { CodigoPostalModel } from 'src/app/interfaces/ayuda/CodigoPostalModel';
import { CodigoPostalResponde } from 'src/app/interfaces/ayuda/CodigoPostalResponde';
import { ClienteModel } from 'src/app/interfaces/cliente/ClienteModel';
import { ClienteResponse } from 'src/app/interfaces/cliente/ClienteResponse';
import { ClienteService } from 'src/app/Recursos/Servicios/cliente/cliente.service';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.page.html',
  styleUrls: ['./cliente.page.scss'],
})
export class ClientePage implements OnInit {
  public clientesModel: ClienteModel[] = [];
  public coloniasSelectoption:CodigoPostalModel[] = [];
  public isModalOpen = false;
  public nametxt:string = "";
  public lastnametxt:string = "";
  public phonetxt:string = "";
  public adresstxt:string = "";
  public cptxt:string = "";
  public coloniasSelect:string = ""; 
  public estadoclientetxt:string="";
  public municipioclientetxt:string="";

  constructor(public alertController: AlertController,public clienteapi:ClienteService) { 
    this.cargarclientes();
  }

  ngOnInit() {
    
  }

  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
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
    //nametxt,lastnametxt,phonetxt,adresstxt,cptxt,coloniasSelect
    if(this.nametxt != ""&& this.lastnametxt != "" && this.phonetxt != "" && this.adresstxt != ""){

    } else{
      const alert = await this.alertController.create({
        header: 'Campos incompletos',
        message: 'Revisan alguno de los campos marcados por (*) deben ser completados',
        buttons: ['Aceptar']
      });

      await alert.present(); 
    }
    
  }

}
