import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AddEditModalFormComponent } from '../add-edit-modal-form/add-edit-modal-form.component';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {

  constructor(public modalController: ModalController) { }

  ngOnInit() {}

  async openModal() {
    const modal = await this.modalController.create({
      component: AddEditModalFormComponent,
      componentProps: {
        'model_title': "Nomadic model's reveberation"
      }
    });
    // modal.onDidDismiss().then((modelData) => {
    //   if (modelData !== null) {
    //     this.modelData = modelData.data;
    //     console.log('Modal Data : ' + modelData.data);
    //   }
    // });
    return await modal.present();
  }

}
