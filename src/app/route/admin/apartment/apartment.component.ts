import { Building } from './../../../model/building.model';
import { SessionService } from './../../../service/authService/session.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { TableComponent } from './table/table.component';
import { Apartment } from 'src/app/model/apartment.model';


@Component({
  selector: 'app-apartment',
  templateUrl: './apartment.component.html',
  styleUrls: ['./apartment.component.scss']
})
export class ApartmentComponent implements OnInit {

  currentBuilding:                   Building = new Building();

  @ViewChild(TableComponent) table!: TableComponent;

  constructor(private sessionService:      SessionService) {
    this.currentBuilding = sessionService.loadCurrentBuilding();
  }

  ngOnInit(): void {
  }

  openDialog(): void {
    this.table.openDialog(new Apartment());
  }

}
