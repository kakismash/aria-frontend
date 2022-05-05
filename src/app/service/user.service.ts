import { User } from './../model/user.model';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Building } from '../model/building.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  path:  string = environment.apiURL + 'user';

  constructor(private httpC: HttpClient) { }

  list(): Observable <Array<User>> {
    return this.httpC.get<Array<User>>(this.path);
  }

  get(id: number): Observable<User> {
    return this.httpC.get<User>(this.path + '/' + id);
  }

  createOrUpdate(user: User): Observable<User> {
    return this.httpC.post<User>(this.path, user);
  }

  delete(id: number): Observable<User> {
    return this.httpC.delete<User>(this.path + '/' + id);
  }

  changePassword(id: number, oldPassword: string, newPassword: string): Observable<void> {

    const changePassword = {
      oldPassword: oldPassword,
      newPassword: newPassword
    };

    return this.httpC.put<void>(this.path + '/changePassword', changePassword);
  }

  listBuildingsByUser(userId: number): Observable<Array<Building>> {
    return this.httpC.get<Array<Building>>(this.path + '/' + userId + '/building');
  }

  addBuilding(userId: number, buildingId: number): Observable<User> {
    return this.httpC.patch<User>(this.path + '/' + userId + '/building/' + buildingId, undefined);
  }

  removeBuilding(userId: number, buildingId: number): Observable<User> {
    return this.httpC.delete<User>(this.path + '/' + userId + '/building/' + buildingId);
  }

}
