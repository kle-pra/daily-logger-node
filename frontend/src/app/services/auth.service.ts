import { BehaviorSubject, of, Subject } from 'rxjs';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt/';

@Injectable()
export class AuthService {
  jwtHelper: JwtHelperService = new JwtHelperService();

  loginSubject = new BehaviorSubject<any>(null);


  constructor() { }

  storeToken(data): Observable<void> {
    console.log(data);
    localStorage.setItem('jwt', data.token);
    return of(null);
  }

  getToken() {
    localStorage.getItem('jwt');
  }

  getLoggedInUser(): string {

    if (this.isLoggedIn()) {
      return this.jwtHelper.decodeToken(localStorage.getItem('jwt')).data.email;
    }
    return null;
  }

  logout() {
    localStorage.removeItem('jwt');
  }

  isLoggedIn(): boolean {
    // check if token is expired here!
    return localStorage.getItem('jwt') !== null && !this.jwtHelper.isTokenExpired(localStorage.getItem('jwt'));
  }

}
