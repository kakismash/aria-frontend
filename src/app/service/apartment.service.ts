import { environment } from './../../environments/environment';
import { Apartment } from './../model/apartment.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApartmentService {

  path:  string = environment.apiURL + 'apartment';

  constructor(private httpC: HttpClient) { }

  list(): Observable <Array<Apartment>> {
    return this.httpC.get<Array<Apartment>>(this.path);
  }

  get(id: number): Observable<Apartment> {
    return this.httpC.get<Apartment>(this.path + '/' + id);
  }

  createOrUpdate(apartment: Apartment): Observable<Apartment> {
    return this.httpC.post<Apartment>(this.path, apartment);
  }

  delete(id: number): Observable<Apartment> {
    return this.httpC.delete<Apartment>(this.path + '/' + id);
  }

  listByBuildingId(id: number): Observable <Array<Apartment>> {
    return this.httpC.get<Array<Apartment>>(this.path + '/building/' + id);
  }

}
