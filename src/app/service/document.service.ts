import { environment } from './../../environments/environment';
import { Document } from './../model/document.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {

  path:  string = environment.apiURL + 'document';

  constructor(private httpC: HttpClient) { }

  list(): Observable <Array<Document>> {
    return this.httpC.get<Array<Document>>(this.path);
  }

  get(id: number): Observable<Document> {
    return this.httpC.get<Document>(this.path + '/' + id);
  }

  createOrUpdate(document: Document): Observable<Document> {
    return this.httpC.post<Document>(this.path, document);
  }

  delete(id: number): Observable<Document> {
    return this.httpC.delete<Document>(this.path + '/' + id);
  }

}
