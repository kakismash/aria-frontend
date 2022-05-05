import { BuildingService } from 'src/app/service/building.service';
import { SessionService } from './../../../../service/authService/session.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Apartment } from 'src/app/model/apartment.model';
import { ApartmentService } from 'src/app/service/apartment.service';
import { AddDialogComponent } from '../add-dialog/add-dialog.component';
import Swal from 'sweetalert2';
import { Building } from 'src/app/model/building.model';


@Component({
  selector: 'app-table-apartment',
  styleUrls: ['table.component.scss'],
  templateUrl: 'table.component.html',
})
export class TableComponent implements OnInit {

  displayedColumns:                         string[] = ['display', 'description', 'actions'];
  dataSource!:                              MatTableDataSource<Apartment>;

  apartments:                               Array<Apartment> = new Array<Apartment>();
  apartmentsByBuilding:                     Array<Apartment> = new Array<Apartment>();
  currentBuilding:                          Building = new Building();

  @ViewChild(MatPaginator) paginator!:      MatPaginator;
  @ViewChild(MatSort) sort!:                MatSort;

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

  constructor(private apartmentService:    ApartmentService,
              public  dialog:              MatDialog,
              private sessionService:      SessionService,
              private buildingService:     BuildingService) {

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

    this.dataSource           = new MatTableDataSource(this.apartments);

    this.dataSource.paginator = this.paginator;
    this.dataSource.sort      = this.sort;

  }

  private load(): void {
    this.buildingService
        .listApartmentsByBuilding(this.currentBuilding.id)
        .subscribe( rApartments => {

          this.apartments = new Array<Apartment>();
          Object.assign(this.apartments, rApartments);

          this.refreshTable();

        });

  }


  protected delete(apartmentId: number): void {

    this.apartmentService
        .delete(apartmentId)
        .subscribe(() => {

          this.apartments
              .splice(this.apartments
                          .findIndex(a => a.id === apartmentId),
                      1);

          this.Toast.fire({
                        icon: 'success',
                        title: 'Apartment deleted successfully'
                      })

          this.refreshTable();

        });
  }

  protected createOrUpdate(apartment: Apartment): void {

    this.apartmentService
        .createOrUpdate(apartment)
        .subscribe(aA => {

          if (apartment.id === undefined || apartment.id == null) {

            this.apartments.unshift(aA);

          } else {

            Object.assign(this.apartments.find(a => a.id === apartment.id), aA);

          }

          this.Toast.fire({
                            icon: 'success',
                            title: 'Apartment saved successfully'
                          })

          this.refreshTable();

        });
  }

  openDialog(apartment: Apartment): void {

    const dialogRef = this.dialog.open(AddDialogComponent, {data: apartment});

    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        this.createOrUpdate(result);
      }

    });
  }

  openDeleteDialog(apartment: Apartment): void {

    Swal.fire({
                  title: 'Are you sure you want to delete the apartment ' + apartment.display + '?',
                  text: "You won't be able to revert this!",
                  icon: 'warning',
                  showCancelButton: true,
                  confirmButtonColor: '#3085d6',
                  cancelButtonColor: '#d33',
                  confirmButtonText: 'Yes, delete it!'
                }).then((result) => {
                  if (result.isConfirmed) {
                    this.delete(apartment.id);
                  }
              })
  }

}
