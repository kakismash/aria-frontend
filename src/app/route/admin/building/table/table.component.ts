import { Floor } from './../../../../model/floor.model';
import { SessionService } from 'src/app/service/authService/session.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Building } from 'src/app/model/building.model';
import { BuildingService } from 'src/app/service/building.service';
import { AddDialogComponent } from '../add-dialog/add-dialog.component';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';


@Component({
  selector: 'app-table-building',
  styleUrls: ['table.component.scss'],
  templateUrl: 'table.component.html',
})
export class TableComponent implements OnInit {


  displayedColumns:                       string[]        = ['name', 'floors', 'description', 'actions'];
  dataSource!:                            MatTableDataSource<Building>;

  buildings:                              Array<Building> = new Array<Building>();
  currentBuilding:                        Building        = new Building();

  buildingReady:                          boolean         = false;

  building:                               Building        = new Building();

  @ViewChild(MatPaginator) paginator!:    MatPaginator;
  @ViewChild(MatSort) sort!:              MatSort;

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

  constructor(private buildingService:    BuildingService,
              public  dialog:             MatDialog,
              private router:             Router,
              private sessionService:     SessionService) {

    this.currentBuilding = sessionService.loadCurrentBuilding();

  }

  ngOnInit(): void {
    this.load();
  }

  applyFilter(event: Event): void {
    const filterValue      = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  private refreshTable(): void {

    this.dataSource             = new MatTableDataSource(this.buildings);

    this.dataSource.paginator   = this.paginator;
    this.dataSource.sort        = this.sort;

  }

  private load(): void {
    this.buildingService
        .list()
        .subscribe( rBuildings => {

          this.buildings = new Array<Building>();

          Object.assign(this.buildings, rBuildings);

          this.refreshTable();

        });
  }

  protected delete(buildingId: number): void {

    this.buildingService
        .delete(buildingId)
        .subscribe(() => {

          this.buildings
              .splice(this.buildings
                          .findIndex(b => b.id === buildingId),
                      1);

          this.Toast.fire({
                            icon: 'success',
                            title: 'Building deleted successfully'
                          })

          this.refreshTable();

        });
  }

  protected createOrUpdate(building: Building): void {

    this.buildingService
        .createOrUpdate(building)
        .subscribe(aB => {

          if (building.id === undefined || building.id == null) {

            this.buildings.unshift(aB);

          } else {

            Object.assign(this.buildings.find(b => b.id === building.id), aB);

          }

          this.Toast.fire({
                            icon: 'success',
                            title: 'Building saved successfully'
                          })

          this.refreshTable();

        });
  }

  openDialog(building: Building): void {

    const dialogRef = this.dialog.open(AddDialogComponent, {data: building});

    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        this.createOrUpdate(result);
      }

    });
  }

  goToFloors(building: Building): void {

    if (building.id !== this.sessionService.loadCurrentBuilding().id) {
      this.sessionService.setCurrentBuilding(building);
      this.loadBuilding(this.sessionService.loadCurrentBuilding().id);
    }

    this.router.navigate(['/admin/floor']);
  }

  openDeleteDialog(building: Building): void {

    Swal.fire({
                title: 'Are you sure you want to delete the building ' + building.name + '?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
              }).then((result) => {
                if (result.isConfirmed) {
                  this.delete(building.id);
                }
              })
  }

  loadBuilding(buildingId: number): void {
    this.buildingReady = false;
    this.buildingService
        .get(buildingId)
        .subscribe(b => {

          this.sessionService.setCurrentBuilding(b);
          this.building = this.sessionService.loadCurrentBuilding();

          this.buildingReady = true;

          this.Toast.fire({
            icon: 'success',
            title: 'Building Selected: ' + this.building.name
          });

        });


  }





}
