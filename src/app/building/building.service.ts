import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Building } from '../model/building.model';

@Injectable({
  providedIn: 'root'
})
export class BuildingService {

  path: string = environment.apiURL + 'building';

  constructor(private httpC: HttpClient) { }

  list(): Observable <Array<Building>> {
    return this.httpC.get<Array<Building>>(this.path);
  }
}
