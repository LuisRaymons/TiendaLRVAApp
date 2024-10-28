import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.page.html',
  styleUrls: ['./principal.page.scss'],
})
export class PrincipalPage implements OnInit {
  public apitokenuser?:string = "";

  constructor(public navCtrl: NavController) {
  }

  ngOnInit() {
  }

}
