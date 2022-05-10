import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  constructor() { }

  getToken() {
    return 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhbGZpYW4xOTkxQGdtYWlsLmNvbSIsImlhdCI6MTY1MjIyMzc2OSwiZXhwIjoxNjUyMjU5NzY5fQ.TrnKkANnUUgiMygiyOHvPEHH5ARyMWb1AuaVTTQYWHqnA0lt2O8ezBoFOyUxHOUwSm6vGgvP_wShgDy6cOa8UA'
  }
}
