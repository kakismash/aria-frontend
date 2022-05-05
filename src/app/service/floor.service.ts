import { Floor } from './../model/floor.model';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FloorService {

  path: string = environment.apiURL + 'floor';

  constructor(private httpC: HttpClient) { }

  list(): Observable <Array<Floor>> {
    return this.httpC.get<Array<Floor>>(this.path);
  }

  get(id: number): Observable<Floor> {
    return this.httpC.get<Floor>(this.path + '/' + id);
  }

  createOrUpdate(floor: Floor): Observable<Floor> {
    return this.httpC.post<Floor>(this.path, floor);
  }

  delete(id: number): Observable<Floor> {
    return this.httpC.delete<Floor>(this.path + '/' + id);
  }

}
