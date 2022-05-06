import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'main-menu-left',
  templateUrl: './main-menu-left.component.html',
  styleUrls: ['./main-menu-left.component.scss'],
})
export class MainMenuLeftComponent implements OnInit {

  constructor(private menu: MenuController) { }

  ngOnInit() {}

  openFirst() {
    this.menu.enable(true, 'first');
    this.menu.open('first');
  }

}
