import { Component, OnInit, ViewChild } from '@angular/core';
import { TableComponent } from './table/table.component';
import { Building } from 'src/app/model/building.model';


@Component({
  selector: 'app-building',
  templateUrl: './building.component.html',
  styleUrls: ['./building.component.scss']
})
export class BuildingComponent implements OnInit {

  @ViewChild(TableComponent) table!: TableComponent;

  constructor() { }

  ngOnInit(): void {
  }

  openDialog() {
    this.table.openDialog(new Building());
  }

}
