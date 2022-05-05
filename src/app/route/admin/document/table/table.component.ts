import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Document } from 'src/app/model/document.model';
import { DocumentService } from 'src/app/service/document.service';
import { AddDialogComponent } from '../add-dialog/add-dialog.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-table-document',
  styleUrls: ['table.component.scss'],
  templateUrl: 'table.component.html',
})
export class TableComponent implements OnInit {

  displayedColumns:                     string[] = ['name', 'path', 'created', 'updated', 'actions'];
  dataSource!:                          MatTableDataSource<Document>;

  @ViewChild(MatPaginator) paginator!:  MatPaginator;
  @ViewChild(MatSort) sort!:            MatSort;

  documents:                            Array<Document> = new Array<Document>();

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

  constructor(private documentService:  DocumentService,
              public  dialog:           MatDialog) { }

  ngOnInit(): void {
    this.load();
  }

  private refreshTable(): void {

    this.dataSource = new MatTableDataSource(this.documents);

    this.dataSource.paginator = this.paginator;
    this.dataSource.sort      = this.sort;

  }

  private load(): void {
    this.documentService
        .list()
        .subscribe( rDocuments => {

          this.documents = new Array<Document>();

          Object.assign(this.documents, rDocuments);

          this.refreshTable();

        });
  }

  protected delete(documentId: number): void {

    this.documentService
        .delete(documentId)
        .subscribe(() => {

          this.documents
              .splice(this.documents
                          .findIndex(d => d.id === documentId),
                      1);

          this.Toast.fire({
                        icon: 'success',
                        title: 'Document deleted successfully'
                      })

          this.refreshTable();

        });
  }

  protected createOrUpdate(document: Document): void {

    this.documentService
        .createOrUpdate(document)
        .subscribe(aD => {

          if (document.id === undefined || document.id == null) {

            this.documents.unshift(aD);

          } else {

            Object.assign(this.documents.find(d => d.id === document.id), aD);

          }

          this.Toast.fire({
                            icon: 'success',
                            title: 'Document saved successfully'
                          })

          this.refreshTable();

        });
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openDialog(document: Document): void {

    const dialogRef = this.dialog.open(AddDialogComponent, {data: document});

    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        this.createOrUpdate(result);
      }

    });
  }

  openDeleteDialog(document: Document): void {

    Swal.fire({
                title: 'Are you sure you want to delete the document ' + document.name + '?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
              }).then((result) => {
                if (result.isConfirmed) {
                  this.delete(document.id);
                }
              })
  }

}

