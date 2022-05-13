import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  constructor() { }

  getToken() {
    return 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhbGZpYW4xOTkxQGdtYWlsLmNvbSIsImlhdCI6MTY1MjQwMDk1NCwiZXhwIjoxNjUyNDM2OTU0fQ.UUZEO2Yn7-eAtBGPatkfaET1EiJBC9YOghYfOkvo270BWqpWIsqdMuVmwRRnIKWFBRrtrxtL7J_pZ9upqX8TPg';
  }
}
