import { Role } from './../model/role.model';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  path: string = environment.apiURL + 'role';

  constructor(private httpC: HttpClient) { }

  list(): Observable <Array<Role>> {
    return this.httpC.get<Array<Role>>(this.path);
  }

  get(id: number): Observable<Role> {
    return this.httpC.get<Role>(this.path + '/' + id);
  }

  createOrUpdate(role: Role): Observable<Role> {

    role.name = role.name.toUpperCase();

    return this.httpC.post<Role>(this.path, role);
  }

  delete(id: number): Observable<Role> {
    return this.httpC.delete<Role>(this.path + '/' + id);
  }

}
