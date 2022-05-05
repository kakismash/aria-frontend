import { Building } from './../../../model/building.model';
import { SessionService } from './../../../service/authService/session.service';
import { Floor } from 'src/app/model/floor.model';
import { TableComponent } from './../floor/table/table.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-floor',
  templateUrl: './floor.component.html',
  styleUrls: ['./floor.component.scss']
})
export class FloorComponent implements OnInit {

  currentBuilding:                    Building = new Building();

  @ViewChild(TableComponent) table!:  TableComponent;

  Toast = Swal.mixin({
                        toast: true,
                        position: 'top-end',
                        showConfirmButton: false,
                        timer: 3000,
                        timerProgressBar: true,
                        didOpen: (toast) => {
                          toast.addEventListener('mouseenter', Swal.stopTimer)
                          toast.addEventListener('mouseleave', Swal.resumeTimer)
                        }
  })

  constructor(private sessionService:      SessionService) {
    this.currentBuilding = sessionService.loadCurrentBuilding();
  }

  ngOnInit(): void {
  }

  openDialog() {
    this.table.openDialog(new Floor());
  }

  openRemoveFloorsDialog() {
    this.table.openRemoveFloorsDialog();
  }

  openResetDialog() {

    Swal.fire({
                title: 'Are you sure you want to reset all the floors in the building ' + this.currentBuilding.name +'?',
                text: 'If you do, you will not be able to retrieve the information you currently have',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, reset it!'
              }).then((result) => {
                if (result.isConfirmed) {
                  this.table.openResetDialog();
                }
              })


  }

}
