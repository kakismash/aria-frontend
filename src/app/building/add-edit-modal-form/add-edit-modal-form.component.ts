import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-add-edit-modal-form',
  templateUrl: './add-edit-modal-form.component.html',
  styleUrls: ['./add-edit-modal-form.component.scss'],
})
export class AddEditModalFormComponent implements OnInit {

  buildingForm: FormGroup;

  constructor(private modalController: ModalController,
              private fb:              FormBuilder) { }

  ngOnInit() {
    this.buildingForm = this.fb.group({
      name: ['', Validators.required],
      description: [''],
    });
  }

  closeModal() {
    this.modalController.dismiss(null);
  }

  submitForm() {
    console.log(this.buildingForm.value)
    this.modalController.dismiss(this.buildingForm.value);
  }

}
