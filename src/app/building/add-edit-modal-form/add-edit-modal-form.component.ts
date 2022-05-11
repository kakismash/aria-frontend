import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { Building } from 'src/app/model/building.model';

@Component({
  selector: 'app-add-edit-modal-form',
  templateUrl: './add-edit-modal-form.component.html',
  styleUrls: ['./add-edit-modal-form.component.scss'],
})
export class AddEditModalFormComponent implements OnInit {

  @Input() building: Building;
  @Input() formType: number;

  buildingForm: FormGroup;

  constructor(private modalController: ModalController,
              private fb:              FormBuilder) { }

  ngOnInit() {
    this.buildingForm = this.fb.group({
      name: [this.building.name, Validators.required],
      description: [this.building.description],
    });

  }

  closeModal() {
    this.modalController.dismiss(null);
  }

  submitForm() {
    const formData = this.buildingForm.value;
    if (this.formType === 0) {
      this.modalController.dismiss(formData);
    } else {
      this.building.name        = formData.name;
      this.building.description = formData.description;
      this.modalController.dismiss(this.building);
    }
    
  }

}
