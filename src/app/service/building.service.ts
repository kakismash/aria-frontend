import { Floor } from './../model/floor.model';
import { Apartment } from './../model/apartment.model';
import { Building } from './../model/building.model';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BuildingService {

  path: string = environment.apiURL + 'building';

  constructor(private httpC: HttpClient) { }

  list(): Observable <Array<Building>> {
    return this.httpC.get<Array<Building>>(this.path);
  }

  get(id: number): Observable<Building> {
    return this.httpC.get<Building>(this.path + '/' + id);
  }

  createOrUpdate(building: Building): Observable<Building> {
    return this.httpC.post<Building>(this.path, building);
  }

  delete(id: number): Observable<Building> {
    return this.httpC.delete<Building>(this.path + '/' + id);
  }

  listApartmentsByBuilding(id: number): Observable <Array<Apartment>> {
    return this.httpC.get<Array<Apartment>>(this.path + '/' + id + '/apartment');
  }

  listFloorsByBuilding(id: number): Observable <Array<Floor>> {
    return this.httpC.get<Array<Floor>>(this.path + '/' + id + '/floor');
  }

  removeFloors(id: number): Observable<Building> {
    return this.httpC.delete<Building>(this.path + '/' + id + '/floor');
  }

  addFloors(id: number, floors: Array<Floor> ): Observable<Building> {
    return this.httpC.post<Building>(this.path + '/' + id + '/floor', floors);
  }

}
