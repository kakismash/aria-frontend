import { ResetDialogComponent } from './../reset-dialog/reset-dialog.component';
import { Building } from './../../../../model/building.model';
import { SessionService } from './../../../../service/authService/session.service';
import { BuildingService } from 'src/app/service/building.service';
import { MatDialog } from '@angular/material/dialog';
import { FloorService } from './../../../../service/floor.service';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { Floor } from './../../../../model/floor.model';
import { MatTableDataSource } from '@angular/material/table';
import { Component, OnInit, ViewChild } from '@angular/core';
import Swal from 'sweetalert2';
import { AddDialogComponent } from '../add-dialog/add-dialog.component';
import { IFloorsForm } from './../../../../interface/ifloors-form';

@Component({
  selector: 'app-table-floor',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit {
  displayedColumns: string[] = ['name', 'type', 'description', 'actions'];
  dataSource!: MatTableDataSource<Floor>;

  floors: Array<Floor> = new Array<Floor>();

  floor: Floor = new Floor();

  currentBuilding: Building = new Building();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer);
      toast.addEventListener('mouseleave', Swal.resumeTimer);
    },
  });

  constructor(
    private floorService: FloorService,
    public dialog: MatDialog,
    private buildingService: BuildingService,
    private sessionService: SessionService
  ) {
    this.currentBuilding = sessionService.loadCurrentBuilding();
  }

  ngOnInit(): void {
    this.load();
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  private refreshTable(): void {
    this.dataSource = new MatTableDataSource(this.floors);

    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  private load(): void {
    this.buildingService
      .listFloorsByBuilding(this.currentBuilding.id)
      .subscribe((rFloors) => {
        this.floors = new Array<Floor>();
        Object.assign(this.floors, rFloors);

        this.refreshTable();
      });
  }

  protected delete(floorId: number): void {
    this.floorService.delete(floorId).subscribe(() => {
      this.floors.splice(
        this.floors.findIndex((f) => f.id === floorId),
        1
      );

      this.Toast.fire({
        icon: 'success',
        title: 'Floor deleted successfully',
      });

      this.refreshTable();
    });
  }

  protected createOrUpdate(floor: Floor): void {
    this.floorService.createOrUpdate(floor).subscribe((aF) => {
      if (floor.id === undefined || floor.id == null) {
        this.floors.unshift(aF);
      } else {
        Object.assign(
          this.floors.find((f) => f.id === floor.id),
          aF
        );
      }

      this.Toast.fire({
        icon: 'success',
        title: 'Floor saved successfully',
      });

      this.refreshTable();
    });
  }

  openDialog(floor: Floor): void {
    const dialogRef = this.dialog.open(AddDialogComponent, { data: floor });

    dialogRef.afterClosed().subscribe((result) => {
      if (result !== undefined) {
        this.createOrUpdate(result);
      }
    });
  }

  openDeleteDialog(floor: Floor): void {
    Swal.fire({
      title: 'Are you sure you want to delete the floor ' + floor.name + '?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        if (floor.id) {
          this.delete(floor.id);
        }
      }
    });
  }

  openRemoveFloorsDialog(): void {
    Swal.fire({
      title:
        'Are you sure you want to remove all floors of building ' +
        this.currentBuilding.name +
        '?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, remove them all!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.removeFloors(this.currentBuilding.id);
      }
    });
  }

  protected removeFloors(buildingId: number): void {
    this.buildingService.removeFloors(buildingId).subscribe(() => {
      this.Toast.fire({
        icon: 'success',
        title: 'All floors were removed successfully',
      });

      this.floors = new Array<Floor>();

      this.refreshTable();
    });
  }

  openResetDialog(): void {
    const dialogRef = this.dialog.open(ResetDialogComponent);

    dialogRef.afterClosed().subscribe((r) => {
      const result: IFloorsForm = r as IFloorsForm;

      if (result !== undefined && result.numberOfFloors > 0) {
        this.floors = new Array<Floor>();

        if(result.prefix === null || result.prefix === undefined) {
          result.prefix = '';
        }

        for (let index = 0; index < result.numberOfFloors; index++) {
          this.floor = new Floor();
          this.floor.type = 2;
          this.floor.description = 'Autogenerated';
          var suffix = 0;

          if (index >= 12 && result.floor13 === false) {
            suffix = index + 2;
            this.floor.name = result.prefix + suffix;
          } else {
            suffix = index +1;
            this.floor.name = result.prefix + ' ' + suffix;
          }
          this.floors.push(this.floor);

        }

        this.addFloors(this.floors);
      }
    });
  }

  protected addFloors(floors: Array<Floor>): void {
      this.buildingService
      .addFloors(this.currentBuilding.id, floors)
      .subscribe((building) => {
        this.Toast.fire({
          icon: 'success',
          title: 'The floors were reseted successfully',
        });

        this.load();
      });
  }
}
