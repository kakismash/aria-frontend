import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Role } from 'src/app/model/role.model';
import { RoleService } from 'src/app/service/role.service';
import { AddDialogComponent } from '../add-dialog/add-dialog.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-table-role',
  styleUrls: ['table.component.scss'],
  templateUrl: 'table.component.html',
})
export class TableComponent implements OnInit {


  displayedColumns:                       string[] = ['name', 'level', 'actions'];
  dataSource!:                            MatTableDataSource<Role>;

  roles:                                  Array<Role> = new Array<Role>();

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

  constructor(private roleService:        RoleService,
              public  dialog:             MatDialog) {}

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

    this.dataSource             = new MatTableDataSource(this.roles);

    this.dataSource.paginator   = this.paginator;
    this.dataSource.sort        = this.sort;

  }

  private load(): void {
    this.roleService
        .list()
        .subscribe( rRoles => {

          this.roles = new Array<Role>();

          Object.assign(this.roles, rRoles);

          this.refreshTable();

        });
  }

  protected delete(roleId: number): void {

    this.roleService
        .delete(roleId)
        .subscribe(() => {

          this.roles
              .splice(this.roles
                          .findIndex(r => r.id === roleId),
                      1);

          this.Toast.fire({
                        icon: 'success',
                        title: 'Role deleted successfully'
                      })

          this.refreshTable();

        });
  }

  protected createOrUpdate(role: Role): void {

    this.roleService
        .createOrUpdate(role)
        .subscribe(aR => {

          if (role.id === undefined || role.id == null) {

            this.roles.unshift(aR);

          } else {

            Object.assign(this.roles.find(r => r.id === role.id), aR);

          }

          this.Toast.fire({
                            icon: 'success',
                            title: 'Role saved successfully'
                          })

          this.refreshTable();

        });
  }

  openDialog(role: Role): void {

    const dialogRef = this.dialog.open(AddDialogComponent, {data: role});

    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        this.createOrUpdate(result);
      }

    });
  }

  openDeleteDialog(role: Role): void {

      Swal.fire({
                  title: 'Are you sure you want to delete the role ' + role.name + '?',
                  text: "You won't be able to revert this!",
                  icon: 'warning',
                  showCancelButton: true,
                  confirmButtonColor: '#3085d6',
                  cancelButtonColor: '#d33',
                  confirmButtonText: 'Yes, delete it!'
                }).then((result) => {
                  if (result.isConfirmed) {
                    this.delete(role.id);
                  }
                })

  }

}
