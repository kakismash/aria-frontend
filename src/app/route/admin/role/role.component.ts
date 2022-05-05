import { Component, OnInit, ViewChild } from '@angular/core';
import { TableComponent } from './table/table.component';
import { Role } from 'src/app/model/role.model';

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.scss']
})
export class RoleComponent implements OnInit {

  @ViewChild(TableComponent) table!: TableComponent;

  constructor() { }

  ngOnInit(): void {
  }

  openDialog() {
    this.table.openDialog(new Role());
  }


}
