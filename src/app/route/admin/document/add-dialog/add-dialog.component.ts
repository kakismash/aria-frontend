import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Document } from 'src/app/model/document.model';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'app-add-dialog',
  templateUrl: './add-dialog.component.html',
  styleUrls: ['./add-dialog.component.scss']
})
export class AddDialogComponent implements OnInit {

  options!:             FormGroup;
  nameControl!:         FormControl;
  pathControl!:         FormControl;
  descriptionControl!:  FormControl;

  document:             Document = new Document();

  title:                string = 'Create New Document';
  srcResult:            any;

  constructor(public dialogRef: MatDialogRef<AddDialogComponent>,
    fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: Document) {

    this.document = new Document();

    Object.assign(this.document, data);

    if (this.document.id === undefined) {
      this.title = 'Create New Document';
    } else {
        this.title = 'Editing: ' + this.document.name;
    }

    this.nameControl           = new FormControl(this.document.name);
    this.pathControl           = new FormControl(this.document.path);
    this.descriptionControl    = new FormControl(this.document.description);

    this.options = fb.group({
      name:           this.nameControl,
      path:           this.pathControl,
      description:    this.descriptionControl
    });

  }

  onFileSelected() {
    const inputNode: any = document.querySelector('#file');

    if (typeof (FileReader) !== 'undefined') {
      const reader = new FileReader();

      reader.onload = (e: any) => {
        this.srcResult = e.target.result;
      };

      reader.readAsArrayBuffer(inputNode.files[0]);
    }
  }

  ngOnInit(): void {
  }

  cancel(): void {
    this.dialogRef.close();
  }

  submit(): void {
    this.dialogRef.close(this.document);
  }

}
