import { Injectable } from '@angular/core';
import { Building } from 'src/app/model/building.model';
import { Role } from 'src/app/model/role.model';
import { User } from 'src/app/model/user.model';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  constructor() { }

  save(user: User): void {

    sessionStorage.clear();

    sessionStorage.setItem('user-aria',
                           JSON.stringify(user));
  }

  remove(): void {
    sessionStorage.clear();
  }

  load(): User {

    const storedSession: string | null = sessionStorage.getItem('user-aria');

    return storedSession !== null
            ? JSON.parse(storedSession) as User
            : new User();
  }

  loadToken(): string {
    return this.load().token;
  }

  loadBuilding(): number {
    return this.load().defaultBuilding;
  }

  loadRole(): Role {
    return this.load().role;
  }

  hasToken(): boolean {
    return this.load() !== undefined &&
            this.load().token !== undefined
  }

  setCurrentBuilding(building: Building): void {

    sessionStorage.removeItem('building-aria');

    sessionStorage.setItem('building-aria',
                           JSON.stringify(building));
  }

  loadCurrentBuilding(): Building {

    const strBuilding: string | null = sessionStorage.getItem('building-aria');
    if (strBuilding !== undefined && strBuilding != null) {
      return JSON.parse(strBuilding) as Building;
    } else {
      return new Building();
    }

  }


}
