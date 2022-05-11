import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Building } from 'src/app/model/building.model';
import { AddEditModalFormComponent } from '../add-edit-modal-form/add-edit-modal-form.component';
import { BuildingService } from '../building.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {

  buildings: Array<Building> = new Array<Building>();

  constructor(public modalController:  ModalController,
              private buildingService: BuildingService) { }

  ngOnInit() {
    this.list();
  }

  list() {
    this.buildingService.list()
      .subscribe(buildings => {
        this.buildings = buildings;
      })
  }

  async openModal() {
    const modal = await this.modalController.create({
      component: AddEditModalFormComponent,
      componentProps: {
        'model_title': "Nomadic model's reveberation"
      }
    });

    modal.onDidDismiss()
      .then(response => {
        const {data} = response;

        if (data) {
          this.buildingService.createOrUpdate(data)
            .subscribe(buildingResponse => {
              if (buildingResponse) {
                this.list();
              }
            })
        }
    });

    return await modal.present();
    
  }

  delete(id: number) {
    this.buildingService.delete(id)
      .subscribe(response => {
        this.list();
      })
  }


}
