import { Component, OnInit } from '@angular/core';
import { MenuController, NavController } from '@ionic/angular';
import { addIcons } from 'ionicons';
import { exitOutline,peopleOutline } from 'ionicons/icons';

@Component({
  selector: 'app-menu-principal',
  templateUrl: './menu-principal.component.html',
  styleUrls: ['./menu-principal.component.scss'],
})
export class MenuPrincipalComponent  implements OnInit {
  indiceSeleccionado: number = 0;

  constructor(private menuCtrl: MenuController, public navCtrl: NavController) { 
    addIcons({exitOutline, peopleOutline});
  }

  ngOnInit() {}

  paginas = [
    {
      titulo:'Home',
      url:'/principal',
      icono:'home-outline'
    },
    {
      titulo:'Categoria',
      url:'/categoria',
      icono:'copy-outline'
    },
    {
      titulo:'Cliente',
      url:'/cliente',
      icono:'man-outline'
    },
    {
      titulo:'Usuario',
      url:'/usuario',
      icono:'people-outline'
    },
    {
      titulo:'Producto',
      url:'/producto',
      icono:'bag-add-outline'
    },
    {
      titulo:'Promotor',
      url:'/promotor',
      icono:'walk-outline'
    },
    {
      titulo:'Perfil',
      url:'/perfil',
      icono:'people-circle-outline'
    }
  ];

  async cerraSession(){
    localStorage.removeItem("api_token");
    this.navCtrl.navigateForward('/');
  }

  cambiarindice(i:number){
    this.indiceSeleccionado = i;
  }

}
